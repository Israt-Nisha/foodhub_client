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
import { User } from "lucide-react";
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import { cn } from "@/lib/utils";

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
            console.log("profile:", res.data)
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
        <div className="container px-4 py-8 max-w-md mx-auto">
            <h1 className="text-3xl font-black mb-8 text-foreground tracking-tight text-center sm:text-left">
                Welcome, <span className="text-primary">{user?.name}</span>!
            </h1>

            {!editing ? (
                <div className="bg-card border border-border rounded-3xl items-center shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg ring-1 ring-border/50">
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="flex items-center justify-center h-full text-muted-foreground/40 bg-muted/30">
                                <User size={48} />
                            </span>
                        )}
                    </div>

                    <div className="text-center space-y-1">
                        <p className="text-2xl text-foreground font-black tracking-tight">{user?.name}</p>
                        <p className="text-sm text-muted-foreground font-medium">{user?.email}</p>
                    </div>

                    <div className="w-full space-y-3 pt-4 border-t border-border/50">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Role</span>
                            <span className="font-bold text-foreground">{user?.role}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Status</span>
                            <span className="font-bold text-green-600 dark:text-green-400">{user?.status}</span>
                        </div>
                    </div>

                    <Button
                        className="mt-4 w-full"
                        onClick={() => setEditing(true)}
                    >
                        Edit Profile
                    </Button>

                    {/* Customer Activity Analytics */}
                    <div className="w-full pt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary/80">Account Vitality</h3>
                            <div className="h-[250px] w-full bg-primary/5 rounded-3xl border border-primary/10 p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                        { subject: 'Orders', A: 120, fullMark: 150 },
                                        { subject: 'Loyalty', A: 98, fullMark: 150 },
                                        { subject: 'Variety', A: 86, fullMark: 150 },
                                        { subject: 'Reviews', A: 99, fullMark: 150 },
                                        { subject: 'Savings', A: 85, fullMark: 150 },
                                    ]}>
                                        <PolarGrid stroke="hsl(var(--primary)/0.2)" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                                        <Radar name="Activity" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary/80">Order Success</h3>
                            <div className="h-[200px] w-full bg-card/40 rounded-3xl border border-border p-4 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Completed', value: 85, fill: '#10b981' },
                                                { name: 'Cancelled', value: 15, fill: '#ef4444' },
                                            ]}
                                            innerRadius={60}
                                            outerRadius={75}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#ef4444" />
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '10px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-2xl font-black text-foreground">85%</span>
                                    <span className="text-[8px] uppercase font-bold text-muted-foreground">Rate</span>
                                </div>
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
                                    <User size={48} />
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