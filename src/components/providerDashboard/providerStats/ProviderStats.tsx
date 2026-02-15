"use client";

import { useEffect, useState } from "react";
import { providerService } from "@/services/provider.service";

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
    providerService.getProviderStats().then((res) => {
      if (res.error) setError(res.error.message);
      else setStats(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;
  if (!stats) return <p className="p-10 text-center">No stats found. Please create your provider profile first.</p>;

  return (
    <div className="max-w-7xl p-4 md:p-8 space-y-8">
    
      <div className="flex flex-col md:flex-row  justify-between gap-6 bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl shadow">
        <div className="flex items-center gap-4">
          {stats.logo ? (
            <img
              src={stats.logo}
              alt={stats.restaurantName}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-2xl shadow">
              {stats.restaurantName?.charAt(0) || "P"}
            </div>
          )}

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {stats.restaurantName}
            </h1>
            <p className="text-sm text-gray-600">
              Provider: {stats.providerName}
            </p>
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">
             {stats.totalRevenue} TK
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Meals" value={stats.totalMeals} color="from-indigo-50 to-indigo-100" />
        <StatCard title="Categories Used" value={stats.totalCategoriesUsed} color="from-violet-50 to-violet-100" />
        <StatCard title="Total Orders" value={stats.totalOrders} color="from-sky-50 to-sky-100" />
        <StatCard title="Revenue" value={`TK ${stats.totalRevenue}`} color="from-emerald-50 to-emerald-100" />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Orders by Status</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <StatCard title="Placed" value={stats.placedOrders} />
          <StatCard title="Preparing" value={stats.preparingOrders} />
          <StatCard title="Ready" value={stats.readyOrders} />
          <StatCard title="Delivered" value={stats.deliveredOrders} />
          <StatCard title="Cancelled" value={stats.cancelledOrders} />
        </div>
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  color = "from-gray-50 to-gray-100",
}: {
  title: string;
  value: number | string;
  color?: string;
}) => (
  <div
    className={`bg-gradient-to-br ${color} rounded-2xl shadow-sm hover:shadow-md transition p-5`}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);
