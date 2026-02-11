"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cartService, CartItemPayload } from "@/services/cart.service";
import { X } from "lucide-react";
import { orderService } from "@/services/order.service";

export interface CartItem {
  id: string;
  mealId: string;
  quantity: number;
  mealName: string;
  mealPrice: number;
  mealImage?: string | null;
  providerId?: string;
}


const CartClientPagee = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  // Fetch cart items
  const fetchCart = async () => {
    const res = await cartService.getCartItems();
    if (!res.error) {
      setCartItems(res.data || []);
    } else {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  const handleQuantityChange = async (id: string, quantity: number) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const res = await cartService.updateCartItem(id, { quantity });
    if (!res.error && res.data) {
      toast.success("Quantity updated successfully");
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.error(res.error?.message || "Failed to update quantity");
    }
  };


  const handleRemove = async (id: string) => {
    const res = await cartService.deleteCartItem(id);
    if (!res.error) {
      toast.success("Item removed");
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.error("Failed to remove item");
    }
  };


  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!cartItems[0]?.providerId) {
      toast.error("Provider information missing");
      return;
    }

    const payload = {
      providerId: cartItems[0].providerId,
      address,
      totalAmount: totalPrice,
      items: cartItems.map((item) => ({
        mealId: item.mealId,
        quantity: item.quantity,
      })),
    };

    try {
      setPlacingOrder(true);

      const res = await orderService.createOrder(payload);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Order placed successfully! Cash on delivery.");

      setAddress("");
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      toast.error("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };


  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.mealPrice * item.quantity,
    0
  );

  if (!cartItems.length) {
    return (
      <p className="text-center py-10 text-gray-500">
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">

      <div className="space-y-6 md:col-span-2">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {item.mealImage ? (
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative">
                <Image
                  src={item.mealImage}
                  alt={item.mealName}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Meal Info & Controls */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
              <div>
                <h3 className="font-semibold text-lg">{item.mealName}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.mealPrice} TK</p>
              </div>

              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </Button>

                <span className="px-3 py-1 border rounded">{item.quantity}</span>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(item.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="border rounded-lg p-6 h-fit space-y-6 md:w-full w-full">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {/* Items */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.mealId} className="flex justify-between text-sm">
              <span>
                {item.mealName} x {item.quantity}
              </span>
              <span>{item.mealPrice * item.quantity} TK</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total Items</span>
          <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Price</span>
          <span>{totalPrice} TK</span>
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="w-full border rounded-md p-2"
            rows={3}
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <input
            type="text"
            value="Cash on Delivery"
            readOnly
            className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <Button
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={placingOrder}
        >
          {placingOrder ? "Placing..." : "Place Order (COD)"}
        </Button>
      </div>
    </div>
  );
};

export default CartClientPagee;
