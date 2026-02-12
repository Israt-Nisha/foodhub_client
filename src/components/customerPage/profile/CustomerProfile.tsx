"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/adminUser.service";
import { UserData } from "@/types";

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof userSchema>;

interface Props {
    userId: string;
}



export default function CustomerProfilePage({ userId }: Props) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { register, handleSubmit, reset } = useForm<FormValues>({
        resolver: zodResolver(userSchema),
    });

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await adminService.getUserById(userId);
            if (res.error) throw new Error(res.error.message);
            if (res.data) {
                setUser(res.data);
                reset({ name: res.data.name });
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId]);

    const onSubmit = async (data: FormValues) => {
        setSaving(true);
        try {
            let image = user?.image || null;

            if (imageFile) {
                const fd = new FormData();
                fd.append("image", imageFile);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    { method: "POST", body: fd }
                );

                const imgData = await res.json();
                if (!imgData.success) throw new Error("Image upload failed");
                image = imgData.data.url;
            }

            const payload: Partial<UserData> = {
                name: data.name,
                image: image || undefined,
            };
            const res = await adminService.updateUser(userId, payload);
            if (res.error) throw new Error(res.error.message);

            toast.success("Profile updated successfully");
            setUser(res.data);
            setEditing(false);
        } catch (err: any) {
            toast.error(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
            setImageFile(null);
        }
    };

    if (loading) return <p className="text-center py-10">Loading profile...</p>;

    return (
        <div className="container px-4 py-6 max-w-md">
            <h1 className="text-2xl font-bold mb-6">
                Welcome {user?.name}!
            </h1>

            {!editing ? (
                <div className="bg-white border rounded-lg items-center shadow-md p-6 flex flex-col gap-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="flex items-center justify-center h-full text-gray-400">
                                No Image
                            </span>
                        )}
                    </div>

                    <p className="text-xl font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-600">Email: {user?.email}</p>
                    <p className="text-sm text-gray-600">Role: {user?.role}</p>
                    <p className="text-sm text-gray-600">Status: {user?.status}</p>

                    <Button
                        className="mt-4 w-full"
                        onClick={() => setEditing(true)}
                    >
                        Edit Profile
                    </Button>
                </div>
            ) : (
                <form
                    className="bg-white border rounded-lg shadow-md p-6 space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                            {imageFile ? (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : user?.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="flex items-center justify-center h-full text-gray-400">
                                    No Image
                                </span>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            disabled={saving}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <Input {...register("name")} disabled={saving} />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditing(false)}
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}