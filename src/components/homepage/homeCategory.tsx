
import { CategoryData, categoryService } from "@/services/category.service";
import { Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const CategorySections = async () => {
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
        <section className="container mx-auto px-4 py-16">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold">Explore Categories</h2>
                <p className="text-muted-foreground mt-2">
                    Browse meals by category and find your favorites
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {visibleCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/meals?category=${category.slug}`}
                        className="group flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                    >

                        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg sm:text-xl">
                            <Utensils />
                        </div>


                        <span className="text-sm sm:text-base font-medium text-center group-hover:text-primary transition">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySections;
