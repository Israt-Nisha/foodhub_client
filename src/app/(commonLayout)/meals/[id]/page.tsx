
import Image from "next/image";
import { notFound } from "next/navigation";
import { mealService } from "@/services/meal.service";
import { ChefHat, MapPin, Phone, Tag, DollarSign, Coffee, PieChart, Calendar } from "lucide-react";

const MealDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const res = await mealService.getMealById(id);

    if (!res.data) {
        return notFound();
    }

    const meal = res.data;

    return (
        <div className="container mx-auto px-4 py-10 space-y-10">
            {/* MEAL HEADER */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* MEAL IMAGE */}
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-lg overflow-hidden border shadow-md">
                    {meal.imageUrl ? (
                        <Image
                            src={meal.imageUrl}
                            alt={meal.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <Coffee className="w-12 h-12 md:w-16 md:h-16" />
                        </div>
                    )}
                </div>

                {/* MEAL INFO */}
                <div className="flex-1 text-center md:text-left space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold">{meal.name}</h1>

                    {/* Category & Cuisine */}
                    <div className="flex flex-col gap-2 text-gray-700">
                        {meal.category?.name && (
                            <p className="flex items-center gap-1 text-sm">
                                <Tag className="w-4 h-4 text-gray-500" />
                                <span className="font-semibold">Category:</span> {meal.category.name}
                            </p>
                        )}
                        {meal.dietary && (
                            <p className="flex items-center gap-1 text-sm">
                                <ChefHat className="w-4 h-4 text-gray-500" />
                                <span className="font-semibold">Dietary:</span> {meal.dietary}
                            </p>
                        )}
                        {meal.cuisine && (
                            <p className="flex items-center gap-1 text-sm">
                                <PieChart className="w-4 h-4 text-gray-500" />
                                <span className="font-semibold">Cuisine:</span> {meal.cuisine}
                            </p>
                        )}
                    </div>



                    {meal.description && (
                        <div className="prose max-w-none text-gray-700">
                            <p>
                                <span className="font-semibold">Description:</span> {meal.description}
                            </p>
                        </div>
                    )}

                  
                    <p className="flex items-center gap-2 text-gray-700 font-semibold text-lg md:text-xl">
                        Price: {meal.price} TK
                    </p>
                </div>
            </div>

            {/* PROVIDER INFO */}
            {meal.provider && (
                <div className=" p-6 rounded-lg shadow-md space-y-2">
                    <h2 className="text-2xl font-semibold mb-2">Provider Information</h2>
                    <p className="text-gray-600">
                        Company: <span className="font-semibold">{meal.provider.restaurantName}</span>
                    </p>
                    <p className="text-gray-600">
                        Address: <span className="font-semibold">{meal.provider.address}</span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Joined:{" "}
                        <span className="font-semibold">
                            {meal.provider.createdAt
                                ? new Date(meal.provider.createdAt).toLocaleDateString()
                                : "N/A"}
                        </span>
                    </p>
                    <p className="text-gray-600">
                        Delivery: <span className="font-semibold">Cash on delivery available</span>
                    </p>
                </div>
            )}

            {/* DESCRIPTION */}

        </div>
    );
};

export default MealDetailsPage;
