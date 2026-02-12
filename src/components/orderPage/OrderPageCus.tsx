"use client";

import { useEffect, useState } from "react";
import { OrderData, orderService } from "@/services/order.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ReviewData, reviewService } from "@/services/review.service";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";




export default function CustomerOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [cancelingId, setCancelingId] = useState<string | null>(null);

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
    const [reviewData, setReviewData] = useState<{ rating: number; comment: string }>({ rating: 0, comment: "" });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewsMap, setReviewsMap] = useState<Record<string, number>>({});


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

    const cancelOrder = async (orderId: string) => {
        setCancelingId(orderId);
        try {
            const res = await orderService.updateOrderStatus(orderId, "CANCELLED");
            if (!res.error) {
                toast.success("Order cancelled");
                fetchOrders();
            }

        } catch (err: any) {
            toast.error(err.message || "Failed to cancel order");
        } finally {
            setCancelingId(null);
        }
    };


    const openReviewModal = (mealId: string) => {
        setSelectedMealId(mealId);
        setReviewData({ rating: 0, comment: "" });
        setReviewModalOpen(true);
    };


    const submitReview = async () => {
        if (!selectedMealId) return;

        setSubmittingReview(true);
        try {
            const payload: ReviewData = {
                mealId: selectedMealId,
                rating: reviewData.rating,
                comment: reviewData.comment || undefined,
            };
            const res = await reviewService.createReview(payload);
            if (!res.error) {
                toast.success("Review submitted!");
                setReviewsMap((prev) => ({ ...prev, [selectedMealId]: reviewData.rating }));
                setReviewModalOpen(false);
                fetchOrders();
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to submit review");
        } finally {
            setSubmittingReview(false);
        }
    };



    if (loading) return <p className="text-center py-10">Loading orders...</p>;

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 && (
                <p className="text-center text-gray-500">No orders found</p>
            )}

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >

                        <div>
                            <p className="font-semibold">Order ID</p>
                            <p className="text-sm text-gray-500">{order.id}</p>

                            <p className="mt-2 text-sm">
                                <span className="font-medium">Status:</span>{" "}
                                <span className="capitalize">{order.status}</span>
                            </p>

                            <p className="text-sm">
                                <span className="font-medium">Total:</span>{" "}
                                {order.totalAmount} TK
                            </p>

                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>

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

                            {order.status === "PLACED" && (
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    disabled={cancelingId === order.id}
                                    onClick={() => cancelOrder(order.id)}
                                >
                                    {cancelingId === order.id ? "Cancelling..." : "Cancel"}
                                </Button>
                            )}


                            {order.status === "DELIVERED" &&
                                order.items.map((item) => {
                                    const isReviewed = !!reviewsMap[item.meal.id];

                                    return (
                                        <Button
                                            key={item.id}
                                            size="sm"
                                            disabled={isReviewed}
                                            onClick={() => openReviewModal(item.meal.id)}
                                        >
                                            {isReviewed ? "Reviewed" : "+ Add Review"}
                                        </Button>
                                    );
                                })}


                        </div>

                    </div>
                ))}
            </div>

            <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Leave a Review</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="font-medium">Rating</label>
                            <select
                                className="w-full border rounded p-2 mt-1"
                                value={reviewData.rating}
                                onChange={(e) => setReviewData({ ...reviewData, rating: +e.target.value })}
                            >
                                <option value={0}>Select Rating</option>
                                {[1, 2, 3, 4, 5].map((r) => (
                                    <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="font-medium">Comment</label>
                            <textarea
                                className="w-full border rounded p-2 mt-1"
                                rows={3}
                                value={reviewData.comment}
                                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                placeholder="Optional comment..."
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setReviewModalOpen(false)}
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={submitReview}
                            disabled={submittingReview || reviewData.rating === 0}
                        >
                            {submittingReview ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
