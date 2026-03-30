"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft } from "lucide-react";

const PaymentCancelPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId");
  const reason = searchParams.get("reason") || "Payment was cancelled";

  useEffect(() => {
    if (paymentId) {
      toast.error("Payment was cancelled");
    }
  }, [paymentId]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <div className="text-center mb-8">
        <XCircle className="mx-auto h-16 w-16 text-red-600 mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600">
          Your payment was not completed.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentId && (
            <div>
              <p className="text-sm text-gray-500">Payment ID</p>
              <p className="font-medium">{paymentId}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Reason</p>
            <p className="font-medium">{reason}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Don't worry! Your card was not charged. You can try again or choose a different payment method.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Need help?</strong> If you continue to experience issues, please contact our support team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Cart
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard-customer")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentCancelPage;