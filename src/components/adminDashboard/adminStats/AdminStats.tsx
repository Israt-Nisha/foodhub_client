"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/adminUser.service";

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

  if (loading) return <div className="p-10 text-center text-gray-700">Loading stats...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!stats) return <div className="p-10 text-center text-gray-500">No stats available</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 sm:text-left">Admin Dashboard</h1>

    
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
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
    teal: "bg-teal-50 text-teal-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className={`p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${colorClasses[color]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl sm:text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};


const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">{title}</h2>
    {children}
  </div>
);
