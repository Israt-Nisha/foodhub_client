"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { UserData, UserStatus } from "@/types";
import { adminService } from "@/services/adminUser.service";


const ManageUsers = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [status, setStatus] = useState<UserStatus>("ACTIVE");

    /* ---------------- Fetch users ---------------- */
    const fetchUsers = async () => {
        setLoading(true);

        const res = await adminService.getAllUsers();
        console.log("API response:", res);

        if (!res?.error) {
            // Use the inner `data` array
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

    /* ---------------- Delete user ---------------- */
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
            {/* User list */}
            {loading ? (
                <p>Loading users...</p>
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
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as UserStatus)}
                                    className="border rounded px-2 py-1 text-sm"
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="SUSPENDED">SUSPENDED</option>
                                </select>

                            ) : (
                                <p className="text-sm">
                                    Status:
                                    <span className="ml-1 font-semibold">
                                        {user.status}
                                    </span>
                                </p>
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
                                                    const res = await adminService.updateUserStatus(user.id, status);
                                                    setSaving(false);

                                                    if (res.error) {
                                                        toast.error(res.error.message);
                                                        return;
                                                    }

                                                    toast.success("User status updated");
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
