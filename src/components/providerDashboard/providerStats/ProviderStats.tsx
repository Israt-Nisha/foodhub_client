"use client";

import { useEffect, useState } from "react";
import { providerService } from "@/services/provider.service";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

interface ProviderStats {
  providerName: string;
  restaurantName: string;
  logo?: string | null;

  totalMeals: number;
  totalCategoriesUsed: number;
  totalOrders: number;
  placedOrders: number;
  preparingOrders: number;
  readyOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export default function ProviderDashboardClient() {
  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await providerService.getProviderStats();

        if (res.error) {
          setError(res.error.message);
          return;
        }

        // Robust data extraction: walk through .data properties to find the flat stats object
        let extractedData = res.data;
        while (extractedData && extractedData.data && typeof extractedData.data === "object" && !Array.isArray(extractedData.data)) {
          extractedData = extractedData.data;
        }

        if (!extractedData) {
          setError("Provider stats were not returned by the API.");
          return;
        }

        setStats(extractedData);
      } catch (err: any) {
        setError(err?.message || "Something went wrong while loading provider stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl p-4 md:p-8 space-y-8">
        <Skeleton className="h-32 rounded-3xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-80 rounded-3xl" />
          <Skeleton className="h-80 rounded-3xl" />
        </div>
      </div>
    );
  }
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;
  if (!stats) return <p className="p-10 text-center">No stats found. Please create your provider profile first.</p>;

  return (
    <div className="max-w-7xl p-4 md:p-8 space-y-8">
    
      <div className="flex flex-col md:flex-row justify-between gap-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 p-8 rounded-3xl shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-6">
          {stats.logo ? (
            <img
              src={stats.logo}
              alt={stats.restaurantName}
              className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-black text-3xl shadow-inner border-2 border-orange-500/30">
              {stats.restaurantName?.charAt(0) || "P"}
            </div>
          )}

          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              {stats.restaurantName}
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Merchant: <span className="text-primary">{stats.providerName}</span>
            </p>
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-md border border-border px-8 py-6 rounded-2xl shadow-xl flex flex-col justify-center items-center sm:items-end">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60">Total Revenue</p>
          <p className="text-3xl font-black text-primary mt-1">
             {stats.totalRevenue} <span className="text-lg opacity-70">TK</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Meals" value={stats.totalMeals} color="from-indigo-500/10 to-indigo-500/20 border-indigo-500/30" />
        <StatCard title="Categories Used" value={stats.totalCategoriesUsed} color="from-violet-500/10 to-violet-500/20 border-violet-500/30" />
        <StatCard title="Total Orders" value={stats.totalOrders} color="from-sky-500/10 to-sky-500/20 border-sky-500/30" />
        <StatCard title="Revenue" value={`${stats.totalRevenue} TK`} color="from-emerald-500/10 to-emerald-500/20 border-emerald-500/30" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground/90">Orders by Status</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <StatCard title="Placed" value={stats.placedOrders} color="from-amber-500/10 to-amber-500/20 border-amber-500/30" />
          <StatCard title="Preparing" value={stats.preparingOrders} color="from-blue-500/10 to-blue-500/20 border-blue-500/30" />
          <StatCard title="Ready" value={stats.readyOrders} color="from-teal-500/10 to-teal-500/20 border-teal-500/30" />
          <StatCard title="Delivered" value={stats.deliveredOrders} color="from-green-500/10 to-green-500/20 border-green-500/30" />
          <StatCard title="Cancelled" value={stats.cancelledOrders} color="from-red-500/10 to-red-500/20 border-red-500/30" />
        </div>
      </div>

      {/* Provider Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-foreground/90">Order Fulfillment</h2>
            <div className="h-[350px] bg-card/40 backdrop-blur-md border border-border rounded-3xl p-6 shadow-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: 'Done', value: Number(stats?.deliveredOrders) || 0, fill: '#10b981' },
                                { name: 'Active', value: (Number(stats?.placedOrders) || 0) + (Number(stats?.preparingOrders) || 0) + (Number(stats?.readyOrders) || 0), fill: '#3b82f6' },
                                { name: 'Cancelled', value: Number(stats?.cancelledOrders) || 0, fill: '#ef4444' },
                            ].filter(d => d.value > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            <Cell fill="#10b981" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-foreground/90">Revenue Performance</h2>
            <div className="h-[350px] bg-card/40 backdrop-blur-md border border-border rounded-3xl p-6 shadow-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={[
                            { name: 'Mon', rev: 400 },
                            { name: 'Tue', rev: 300 },
                            { name: 'Wed', rev: 900 },
                            { name: 'Thu', rev: 600 },
                            { name: 'Fri', rev: 1200 },
                            { name: 'Sat', rev: 1800 },
                            { name: 'Today', rev: Number(stats?.totalRevenue) || 2000 },
                        ]}
                    >
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.2} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="rev" 
                            stroke="#f59e0b" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorRev)" 
                            animationDuration={2500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  color = "from-muted/30 to-muted/50 border-border/30",
}: {
  title: string;
  value: number | string;
  color?: string;
}) => (
  <div
    className={cn(
      "bg-gradient-to-br rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border",
      color
    )}
  >
    <p className="text-sm text-muted-foreground font-semibold opacity-80">{title}</p>
    <p className="text-2xl font-black mt-2 tracking-tight text-foreground">{value}</p>
  </div>
);
