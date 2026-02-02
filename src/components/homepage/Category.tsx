import { Button } from "@/components/ui/button";
import { CategoryData, categoryService } from "@/services/category.service";
import { mealService } from "@/services/meal.service";
import { MealData } from "@/types";
import Link from "next/link";
import { Utensils, Coffee, Flame, IceCream, PizzaIcon } from "lucide-react";


// Gradient color palette
const colors = [
  "bg-red-200 text-red-700",
  "bg-blue-200 text-blue-700",
  "bg-green-200 text-green-700",
  "bg-yellow-200 text-yellow-700",
  "bg-purple-200 text-purple-700",
];

interface CategoryWithCount extends CategoryData {
  mealCount: number;
}

const CategorySection = async () => {
  
  const { data: categories, error: catError } = await categoryService.getAllCategories();
  if (catError || !categories || categories.length === 0) {
    return <p className="text-center text-gray-500">No categories found.</p>;
  }


  const { data: meals, error: mealError } = await mealService.getAllMeals();
  if (mealError || !meals) {
    return <p className="text-center text-gray-500">No meals found.</p>;
  }

  
  const categoryMealCount: Record<string, number> = {};
  (meals as MealData[]).forEach((meal: MealData) => {
    if (meal.categoryId) {
      categoryMealCount[meal.categoryId] =
        (categoryMealCount[meal.categoryId] || 0) + 1;
    }
  });

 
  const sortedCategories: CategoryWithCount[] = (categories as CategoryData[])
    .map((cat: CategoryData) => ({
      ...cat,
      mealCount: categoryMealCount[cat.id!] || 0,
    }))
    .sort((a, b) => b.mealCount - a.mealCount)
    .slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      

      <div className="flex flex-wrap gap-6 md:gap-10 space-y-2 justify-center items-center text-center">
        {sortedCategories.map((cat: CategoryWithCount, idx: number) => {
          const Icon =  Utensils;
          const color = colors[idx % colors.length];

          return (
            <div
              key={cat.id}
              className="flex flex-col items-center hover:-translate-y-1 transition-transform duration-300"
            >
              
              <div
                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${color} shadow-lg`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className={`text-lg font-semibold hover:text-${color} text-center text-gray-800`}>
                {cat.name}
              </h3>

              <p className="text-sm text-gray-500 text-center">
                {cat.mealCount} meal{cat.mealCount !== 1 ? "s" : ""}
              </p>
            </div>
          );
        })}
      </div>
     
    </div>
  );
};

export default CategorySection;