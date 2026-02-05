import { categoryService, CategoryData } from "@/services/category.service";
import { Utensils } from "lucide-react";

// Gradient color palette
const colors = [
  "bg-red-200 text-red-700",
  "bg-blue-200 text-blue-700",
  "bg-green-200 text-green-700",
  "bg-yellow-200 text-yellow-700",
  "bg-purple-200 text-purple-700",
];

const CategorySection = async () => {
  const { data: categories, error } =
    await categoryService.getAllCategories();

  if (error || !categories || categories.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No categories found.
      </p>
    );
  }

  const visibleCategories = (categories as CategoryData[]).slice(0, 6);

   return (
    <>
      <h2 className="text-4xl font-bold text-center py-12">
        Popular Categories
      </h2>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
          {visibleCategories.map((cat, idx) => {
            const color = colors[idx % colors.length];

            return (
              <div
                key={cat.id}
                className="flex justify-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={`flex flex-col items-center rounded-xl justify-center 
                  px-8 sm:px-10 lg:px-12
                  py-10 sm:py-12 lg:py-14
                  ${color} shadow-lg`}
                >
                  <Utensils className="h-8 w-8 md:h-14 md:w-14" />
                  <h3 className="text-xl font-semibold mt-6 text-gray-800 text-center">
                    {cat.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategorySection;
