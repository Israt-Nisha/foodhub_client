"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/adminUser.service";
import AIInsights from "./AIInsights";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  totalCustomers: number;
  totalProviders: number;
  activeUsers: number;
  suspendedUsers: number;
  totalMeals: number;
  totalCategories: number;
  totalProviderProfiles: number;
  totalOrders: number;
  placedOrders: number;
  preparingOrders: number;
  readyOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export default function AdminDashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getStats();
        if (res.error) {
          setError(res.error.message);
        } else {
          setStats(res.data);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <Skeleton className="h-9 w-48 rounded-md" />
        
        {/* Users Overview Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Content Overview Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Orders Overview Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Revenue Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-24 rounded-xl" />
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-[350px] rounded-3xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-48 rounded-md" />
            <Skeleton className="h-[350px] rounded-3xl" />
          </div>
        </div>

        {/* AI Insights Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }
  
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!stats) return <div className="p-10 text-center text-gray-500">No stats available</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground sm:text-left tracking-tight">Admin Dashboard</h1>

    
      <Section title="Users Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} color="blue" />
          <StatCard title="Admins" value={stats.totalAdmins} color="purple" />
          <StatCard title="Customers" value={stats.totalCustomers} color="green" />
          <StatCard title="Providers" value={stats.totalProviders} color="yellow" />
          <StatCard title="Active Users" value={stats.activeUsers} color="teal" />
          <StatCard title="Suspended Users" value={stats.suspendedUsers} color="red" />
        </div>
      </Section>

      <Section title="Content Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard title="Total Meals" value={stats.totalMeals} color="blue" />
          <StatCard title="Categories" value={stats.totalCategories} color="purple" />
          <StatCard title="Provider Profiles" value={stats.totalProviderProfiles} color="green" />
        </div>
      </Section>

    
      <Section title="Orders Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <StatCard title="Total Orders" value={stats.totalOrders} color="blue" />
          <StatCard title="Placed" value={stats.placedOrders} color="yellow" />
          <StatCard title="Preparing" value={stats.preparingOrders} color="purple" />
          <StatCard title="Ready" value={stats.readyOrders} color="teal" />
          <StatCard title="Delivered" value={stats.deliveredOrders} color="green" />
          <StatCard title="Cancelled" value={stats.cancelledOrders} color="red" />
        </div>
      </Section>

      
      <Section title="Revenue">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Total Revenue" value={`${stats.totalRevenue} TK`} color="orange" />
        </div>
      </Section>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="User Base Distribution">
          <div className="h-[350px] w-full bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Admins', value: Number(stats?.totalAdmins) || 0 },
                    { name: 'Customers', value: Number(stats?.totalCustomers) || 0 },
                    { name: 'Providers', value: Number(stats?.totalProviders) || 0 },
                  ].filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Order Fulfillment Health">
          <div className="h-[350px] w-full bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Placed', count: Number(stats?.placedOrders) || 0, fill: '#f59e0b' },
                  { name: 'Preparing', count: Number(stats?.preparingOrders) || 0, fill: '#8b5cf6' },
                  { name: 'Ready', count: Number(stats?.readyOrders) || 0, fill: '#0ea5e9' },
                  { name: 'Delivered', count: Number(stats?.deliveredOrders) || 0, fill: '#10b981' },
                  { name: 'Cancelled', count: Number(stats?.cancelledOrders) || 0, fill: '#ef4444' },
                ]}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                />
                <YAxis 
                  hide
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--primary)/0.05)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={2000}
                >
                  {
                    [
                      { name: 'Placed', fill: '#f59e0b' },
                      { name: 'Preparing', fill: '#8b5cf6' },
                      { name: 'Ready', fill: '#0ea5e9' },
                      { name: 'Delivered', fill: '#10b981' },
                      { name: 'Cancelled', fill: '#ef4444' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <AIInsights stats={stats} />
    </div>
  );
}


const StatCard = ({
  title,
  value,
  color = "blue",
}: {
  title: string;
  value: number | string;
  color?: string;
}) => {
  const colorClasses: { [key: string]: string } = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    yellow: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    teal: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  };

  return (
    <div className={cn(
      "p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border",
      colorClasses[color] || colorClasses.blue
    )}>
      <p className="text-sm font-semibold opacity-80">{title}</p>
      <p className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">{value}</p>
    </div>
  );
};


const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 tracking-tight text-center sm:text-left">{title}</h2>
    {children}
  </div>
);
