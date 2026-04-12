"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { adminService } from "@/services/adminUser.service";
import { UserData } from "@/types";
import { User, Shield, Users, Activity } from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const adminSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().optional(),
    department: z.string().optional(),
});

type FormValues = z.infer<typeof adminSchema>;

interface Props {
    userId: string;
}

export default function AdminProfile({ userId }: Props) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(adminSchema),
    });

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await adminService.getUserById(userId);
            if (res.error) throw new Error(res.error.message);
            if (res.data) {
                setUser(res.data);
                reset({
                    name: res.data.name,
                    phone: (res.data as any).phone || "",
                    department: (res.data as any).department || ""
                });
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

    if (loading) {
        return (
            <div className="container px-4 py-8 max-w-2xl mx-auto">
                <Skeleton className="h-10 w-full mb-8 rounded-md" />
                <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
                    <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                    <Skeleton className="h-8 w-3/4 mx-auto rounded-md" />
                    <Skeleton className="h-4 w-1/2 mx-auto rounded-md" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        );
    }

    return (
        <div className="container px-4 py-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-black mb-8 text-foreground tracking-tight text-center sm:text-left">
                <Shield className="inline mr-2" />
                Admin Profile: <span className="text-primary">{user?.name}</span>
            </h1>

            {!editing ? (
                <div className="bg-card border border-border rounded-3xl shadow-xl p-8 space-y-6 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg ring-1 ring-border/50 mx-auto md:mx-0">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="flex items-center justify-center h-full text-muted-foreground/40 bg-muted/30">
                                    <Shield size={48} />
                                </span>
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl text-foreground font-black tracking-tight">{user?.name}</h2>
                            <p className="text-lg text-primary font-bold">Administrator</p>
                            <p className="text-sm text-muted-foreground font-medium">{user?.email}</p>
                           
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Role</span>
                                <span className="font-bold text-foreground">{user?.role}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Status</span>
                                <span className="font-bold text-green-600 dark:text-green-400">{user?.status}</span>
                            </div>
                        </div>
                        
                    </div>

                    <Button
                        className="mt-4 w-full"
                        onClick={() => setEditing(true)}
                    >
                        Edit Profile
                    </Button>

                    {/* Admin System Analytics */}
                    <div className="w-full pt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary/80">System Activity</h3>
                            <div className="h-[250px] w-full bg-primary/5 rounded-3xl border border-primary/10 p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { time: '00:00', activity: 20 },
                                        { time: '04:00', activity: 15 },
                                        { time: '08:00', activity: 45 },
                                        { time: '12:00', activity: 80 },
                                        { time: '16:00', activity: 65 },
                                        { time: '20:00', activity: 35 },
                                    ]}>
                                        <defs>
                                            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.2)" />
                                        <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                                        />
                                        <Area type="monotone" dataKey="activity" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActivity)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary/80">User Management</h3>
                            <div className="h-[200px] w-full bg-card/40 rounded-3xl border border-border p-4 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Active Users', value: 75, fill: '#10b981' },
                                                { name: 'Suspended', value: 15, fill: '#f59e0b' },
                                                { name: 'New Users', value: 10, fill: '#3b82f6' },
                                            ]}
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#3b82f6" />
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '10px' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <form
                    className="bg-card border border-border rounded-3xl shadow-2xl p-8 space-y-6 backdrop-blur-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg ring-1 ring-border/50">
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
                                <span className="flex items-center justify-center h-full text-muted-foreground/30 bg-muted/20">
                                    <Shield size={48} />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <Input {...register("name")} disabled={saving} />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        
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