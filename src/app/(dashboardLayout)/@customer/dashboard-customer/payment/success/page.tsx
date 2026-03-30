"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { orderService, OrderData } from "@/services/order.service";
import { mealService } from "@/services/meal.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, RefreshCw } from "lucide-react";

interface MealDetails {
  id: string;
  name: string;
  price: number;
  image?: string;
}

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [mealDetails, setMealDetails] = useState<Record<string, MealDetails>>({});
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const maxPolls = 10;

  const fetchOrder = async () => {
    if (!paymentId) {
      toast.error("Payment ID missing");
      setLoading(false);
      return;
    }

    try {
      const res = await orderService.getOrderByPayment(paymentId);

      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }

      if (res.data?.order) {
        setOrder(res.data.order);
        // Fetch meal details for all items
        await fetchMealDetails(res.data.order.items);
        setLoading(false);
      } else {
        // Order not ready yet, show the pending state and continue polling
        setLoading(false);
        setPolling(true);
        setPollCount(prev => prev + 1);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch order");
      setLoading(false);
    }
  };

  const fetchMealDetails = async (items: OrderData['items']) => {
    const details: Record<string, MealDetails> = {};
    for (const item of items) {
      try {
        const res = await mealService.getMealById(item.mealId);
        if (res.data) {
          details[item.mealId] = {
            id: res.data.id,
            name: res.data.name,
            price: res.data.price,
            image: res.data.image
          };
        }
      } catch (err) {
        console.error(`Failed to fetch meal ${item.mealId}:`, err);
      }
    }
    setMealDetails(details);
  };

  useEffect(() => {
    if (!paymentId) {
      setLoading(false);
      return;
    }

    fetchOrder();
  }, [paymentId]);

  // Polling effect
  useEffect(() => {
    if (!order && pollCount < maxPolls && !loading) {
      setPolling(true);
      const timer = setTimeout(() => {
        fetchOrder();
      }, 2000); // Poll every 2 seconds

      return () => clearTimeout(timer);
    } else {
      setPolling(false);
    }
  }, [order, pollCount, loading]);

  const handleRetry = () => {
    setPollCount(0);
    setLoading(true);
    fetchOrder();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "PLACED": return "bg-blue-100 text-blue-800";
      case "PREPARING": return "bg-yellow-100 text-yellow-800";
      case "READY": return "bg-green-100 text-green-800";
      case "DELIVERED": return "bg-emerald-100 text-emerald-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="text-gray-500">Processing your payment...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6 px-4">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            Payment Successful
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            Your payment was processed successfully, but we're still preparing your order details.
          </p>
        </div>

        {polling ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4 animate-pulse" />
            <span>Waiting for order confirmation... ({pollCount}/{maxPolls})</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-500 text-center">
              Taking longer than expected. Please try refreshing or contact support if the issue persists.
            </p>
            <Button onClick={handleRetry} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        <Button
          variant="outline"
          onClick={() => router.push("/dashboard-customer")}
          className="mt-4"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Your order has been placed and payment confirmed.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Order Details
            <Badge className={getStatusColor(order.status)}>
              {order.status || "PLACED"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium text-lg">{order.totalAmount} TK</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="font-medium">{order.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => {
              const meal = mealDetails[item.mealId];
              return (
                <div
                  key={item.mealId}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {meal?.image && (
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">
                        {meal?.name || `Meal ${item.mealId}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {meal ? (meal.price * item.quantity) : "N/A"} TK
                    </p>
                    {meal && (
                      <p className="text-sm text-gray-500">
                        {meal.price} TK each
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => router.push("/dashboard-customer/orders")}
          className="flex items-center gap-2"
        >
          View My Orders
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard-customer")}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;