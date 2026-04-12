"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { User } from "@/types";

interface AddToCartButtonProps {
  mealId: string;
  mealName: string;
}

export const AddToCartButton = ({ mealId, mealName }: AddToCartButtonProps) => {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userInfo = session?.user as User | undefined;

  const handleAddToCart = async () => {
    if (!userInfo) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (userInfo.role !== "CUSTOMER") {
      toast.error("Only customers can add to cart");
      return;
    }

    try {
      setLoading(true);
      await cartService.addToCart({ mealId, quantity: 1 });
      toast.success(`${mealName} added to cart`);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleAddToCart}
      disabled={loading}
      className="w-full gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      {loading ? "Adding to Cart..." : "Add to Cart"}
    </Button>
  );
};
