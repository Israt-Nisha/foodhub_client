"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserData, UserStatus } from "@/types";
import { adminService } from "@/services/adminUser.service";


const ManageUsers = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [status, setStatus] = useState<UserStatus>("ACTIVE");
    const [role, setRole] = useState<string>("CUSTOMER");

    const fetchUsers = async () => {
        setLoading(true);

        const res = await adminService.getAllUsers();
        console.log("API response:", res);

        if (!res?.error) {
            const usersArray = Array.isArray(res.data?.data) ? res.data.data : [];
            setUsers(usersArray);
        } else {
            toast.error(res.error.message);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        try {
            const res = await adminService.deleteUser(userId);

            if (res.error) {
                throw new Error(res.error.message);
            }

            toast.success("User deleted successfully");
            fetchUsers();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete user");
        }
    };

    return (
        <>
         
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="border rounded-xl p-4 space-y-2"
                        >
                            <h3 className="font-bold">{user.name}</h3>

                            <p className="text-sm text-gray-600">{user.email}</p>

                            <p className="text-md font-bold">Role: {user.role}</p>

                            {editingUserId === user.id ? (
                                <div className="space-y-2">
                                    <div>
                                        <label className="text-sm font-semibold">Status:</label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value as UserStatus)}
                                            className="border rounded px-3 py-2 text-sm w-full bg-background text-foreground dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="ACTIVE" className="bg-background dark:bg-slate-900">ACTIVE</option>
                                            <option value="SUSPENDED" className="bg-background dark:bg-slate-900">SUSPENDED</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Role:</label>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="border rounded px-3 py-2 text-sm w-full bg-background text-foreground dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="CUSTOMER" className="bg-background dark:bg-slate-900">CUSTOMER</option>
                                            <option value="PROVIDER" className="bg-background dark:bg-slate-900">PROVIDER</option>
                                            <option value="ADMIN" className="bg-background dark:bg-slate-900">ADMIN</option>
                                            <option value="MANAGER" className="bg-background dark:bg-slate-900">MANAGER</option>
                                            <option value="VENDOR" className="bg-background dark:bg-slate-900">VENDOR</option>
                                        </select>
                                    </div>
                                </div>

                            ) : (
                                <div className="space-y-1">
                                    <p className="text-sm">
                                        Status:
                                        <span className="ml-1 font-semibold">
                                            {user.status}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        Role:
                                        <span className="ml-1 font-semibold">
                                            {user.role}
                                        </span>
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <div className="flex gap-2">
                                    {editingUserId === user.id ? (
                                        <>
                                            <Button
                                                size="sm"
                                                disabled={saving}
                                                onClick={async () => {
                                                    if (!user.id) return;

                                                    setSaving(true);
                                                    const res = await adminService.updateUser(user.id, {
                                                        status,
                                                        role,
                                                    });
                                                    setSaving(false);

                                                    if (res.error) {
                                                        toast.error(res.error.message);
                                                        return;
                                                    }

                                                    toast.success("User updated successfully");
                                                    setEditingUserId(null);
                                                    fetchUsers();
                                                }}
                                            >
                                                {saving ? "Saving..." : "Save"}
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setEditingUserId(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setEditingUserId(user.id);
                                                    setStatus(user.status);
                                                    setRole(user.role || "CUSTOMER");
                                                }}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ManageUsers;
