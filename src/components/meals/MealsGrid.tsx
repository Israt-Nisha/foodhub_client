"use client";

import { MealData, User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cartService } from "@/services/cart.service";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MealsGridProps = {
  meals: MealData[];
};

const MealsGrid = ({ meals }: MealsGridProps) => {
  const { data: session } = authClient.useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (session) setUserInfo(session.user as User);
    else setUserInfo(null);
  }, [session]);

  const handleAddToCart = async (mealId: string) => {
    if (!userInfo) {
      toast.error("Please login first");
      return;
    }

    if (userInfo.role !== "CUSTOMER") {
      toast.error("Only customers can add to cart");
      return;
    }

    try {
      setLoadingId(mealId);
      await cartService.addToCart({ mealId, quantity: 1 });
      toast.success("Added to cart");
      setTimeout(() => {
        window.dispatchEvent(new Event("cartUpdated"));
      }, 0);
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoadingId(null);
    }
  };

  if (!meals || meals.length === 0) {
    return <p className="text-center text-gray-500 py-10">Meals not found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="border rounded-lg p-4 hover:shadow-md transition flex flex-col"
        >
          <Link href={`/meals/${meal.id}`} className="block flex-1">
            {meal.imageUrl && (
              <div className="relative w-full h-40 mb-3">
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}

            <h3 className="text-lg font-semibold">{meal.name}</h3>
            <p className="text-sm text-gray-500">{meal.category?.name}</p>
            <p className="mt-2 font-bold text-primary">
              Price: {meal.price} TK
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {meal.provider?.restaurantName}
            </p>
          </Link>

          <Button
            className="mt-3"
            disabled={loadingId === meal.id}
            onClick={() => {
              if (!userInfo) {
                toast.error("Please login as a customer to add items to the cart");
                router.push("/login");
                return;
              }

              if (userInfo.role !== "CUSTOMER") {
                toast.error("Only customers can add meals to the cart");
                return;
              }

              handleAddToCart(meal.id);
            }}
          >
            {loadingId === meal.id
              ? "Adding..."
              : !userInfo
                ? "Login to add"
                : userInfo.role !== "CUSTOMER"
                  ? "Customers only"
                  : "Add to Cart"}
          </Button>

        </div>
      ))}
    </div>
  );
};

export default MealsGrid;
