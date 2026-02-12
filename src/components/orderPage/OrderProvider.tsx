"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export default function ProviderOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

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

    const updateStatus = async (orderId: string, status: OrderStatus) => {
        setUpdatingId(orderId);
        try {
            await orderService.updateOrderStatus(orderId, status);
            toast.success(`Order marked as ${status}`);
            fetchOrders();
        } catch (err: any) {
            toast.error(err.message || "Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) return <p className="text-center py-10">Loading orders...</p>;

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">Incoming Orders</h1>

            {orders.length === 0 && (
                <p className="text-center text-gray-500">No orders found</p>
            )}

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                        {/* Order Info */}
                        <div>
                            <p className="font-semibold">Order ID</p>
                            <p className="text-sm text-gray-500">{order.id}</p>
                            <p className="mt-2 text-sm">
                                <span className="font-medium">Customer ID:</span>{" "}
                                {order.customerId}
                            </p>
                            <p className="mt-2 text-sm">
                                <span className="font-medium">Total:</span>{" "}
                                {order.totalAmount} TK
                            </p>

                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Status + Actions */}
                        <div className="flex items-center gap-3">
                            <span
                                className={`
                  px-4 py-1 text-sm font-semibold rounded-full
                  ${order.status === "PLACED"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : order.status === "PREPARING"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "READY"
                                                ? "bg-purple-100 text-purple-700"
                                                : order.status === "DELIVERED"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                    }
                `}
                            >
                                {order.status}
                            </span>

                            {/* Status Controls */}
                            {order.status === "PLACED" && (
                                <Button
                                    size="sm"
                                    onClick={() => updateStatus(order.id, "PREPARING")}
                                    disabled={updatingId === order.id}
                                >
                                    Accept
                                </Button>
                            )}

                            {order.status === "PREPARING" && (
                                <Button
                                    size="sm"
                                    onClick={() => updateStatus(order.id, "READY")}
                                    disabled={updatingId === order.id}
                                >
                                    Ready
                                </Button>
                            )}

                            {order.status === "READY" && (
                                <Button
                                    size="sm"
                                    onClick={() => updateStatus(order.id, "DELIVERED")}
                                    disabled={updatingId === order.id}
                                >
                                    Delivered
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
