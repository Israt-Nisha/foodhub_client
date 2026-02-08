"use client";

import { MealData } from "@/types";
import Image from "next/image";


type MealsGridProps = {
  meals: MealData[];
};

const MealsGrid = ({ meals }: MealsGridProps) => {
  if (!meals.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        Meals not found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="border rounded-lg p-4 hover:shadow-md transition"
        >
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
          <h3 className="text-lg font-semibold">
            {meal.name}
          </h3>

          <p className="text-sm text-gray-500">
            {meal.category?.name}
          </p>

          <p className="mt-2 font-bold text-primary">
            ৳ {meal.price}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {meal.provider?.restaurantName}
          </p>

          {/* Future: Add to cart button */}
        </div>
      ))}
    </div>
  );
};

export default MealsGrid;
