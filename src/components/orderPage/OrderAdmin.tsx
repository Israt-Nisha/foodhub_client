"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { toast } from "sonner";
import { Button } from "../ui/button";


export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await orderService.getAllOrders();
            if (res.error) throw new Error(res.error);
            setOrders(res.data || []);
        } catch (err: any) {
            toast.error(err.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (orderId: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        setDeletingId(orderId);
        try {
            const res = await orderService.deleteOrder(orderId);
            toast.success("Order deleted successfully");
            fetchOrders();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete order");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <p className="text-center py-10">Loading orders...</p>;

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">All Orders (Admin)</h1>

            {orders.length === 0 && (
                <p className="text-center text-gray-500">No orders found</p>
            )}

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-6 flex flex-col md:flex-row md:justify-between gap-4"
                    >
                        {/* LEFT SIDE: Order Info */}
                        <div>
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="font-mono text-sm">{order.id}</p>

                            <p className="mt-2 text-sm">
                                <span className="font-medium">Customer ID:</span>{" "}
                                {order.customerId}
                            </p>

                            <p className="text-sm">
                                <span className="font-medium">Address:</span> {order.address}
                            </p>

                            <p className="text-sm">
                                <span className="font-medium">Total:</span> {order.totalAmount}{" "}
                                TK
                            </p>

                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* RIGHT SIDE: Status & Provider */}
                        <div className="flex flex-col md:items-end gap-2">
                            <span
                                className={`
                  h-fit px-4 py-1 text-sm font-semibold rounded-full
                  ${order.status === "PLACED"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : order.status === "PREPARING"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "READY"
                                                ? "bg-purple-100 text-purple-700"
                                                : order.status === "DELIVERED"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"}
                `}
                            >
                                {order.status}
                            </span>

                           


                            <Button
                                size="sm"
                                variant="destructive"
                                disabled={deletingId === order.id}
                                onClick={() => handleDelete(order.id)}
                                className="mt-2"
                            >
                                {deletingId === order.id ? "Deleting..." : "Delete Order"}
                            </Button>
                             <p className="text-sm font-medium mt-2">
                                Provider: {order.provider.restaurantName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
