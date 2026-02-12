
import Image from "next/image";
import { notFound } from "next/navigation";
import { mealService } from "@/services/meal.service";
import { ChefHat, Tag, Coffee, PieChart, Calendar } from "lucide-react";
import Rating from "@/components/meals/MealReview";


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
    const reviews = meal.reviews || [];
    const totalReviews = reviews.length;

    const averageRating =
        totalReviews > 0
            ? Math.round(
                reviews.reduce((sum: number, r: { rating: number }) => {
                    return sum + r.rating;
                }, 0) / totalReviews
            )
            : 0;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="flex flex-col px-4 md:px-0 md:flex-row gap-6 md:items-start">

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


                    <div className="flex-1  md:text-left space-y-3">
                        <h1 className="text-3xl md:text-4xl font-bold">{meal.name}</h1>

                        {totalReviews > 0 ? (
                            <div className="flex  gap-2 mt-2">
                                <Rating value={averageRating} />
                                <span className="text-sm text-gray-600">
                                    ({totalReviews} reviews)
                                </span>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 mt-2">
                                No reviews yet
                            </p>
                        )}

                        <div className="flex flex-row gap-4 text-gray-700">
                            {meal.category?.name && (
                                <p className="flex items-center gap-1 text-sm">
                                    {/* <Tag className="w-4 h-4 text-gray-500" /> */}
                                    <span className="font-semibold">Category:</span> {meal.category.name}
                                </p>
                            )}
                            {meal.dietary && (
                                <p className="flex items-center gap-1 text-sm">
                                    {/* <ChefHat className="w-4 h-4 text-gray-500" /> */}
                                    <span className="font-semibold">Dietary:</span> {meal.dietary}
                                </p>
                            )}
                            {meal.cuisine && (
                                <p className="flex items-center gap-1 text-sm">
                                    {/* <PieChart className="w-4 h-4 text-gray-500" /> */}
                                    <span className="font-semibold">Cuisine:</span> {meal.cuisine}
                                </p>
                            )}
                        </div>

                        <p className="flex items-center gap-2 font-semibold text-md md:text-xl">
                            Price: {meal.price} TK
                        </p>

                        {meal.description && (
                            <div className="text-gray-700">
                                <p>
                                    <span className="font-semibold">Description:</span> {meal.description}
                                </p>
                            </div>
                        )}


                    </div>


                </div>


                {meal.provider && (
                    <div className="justify-end text-end items-end p-6 md:p-0 space-y-3  h-fit">
                        <h2 className="text-xl font-semibold mb-4">Provider Information</h2>

                        <p className="text-gray-600">
                            Company: <span className="font-semibold">{meal.provider.restaurantName}</span>
                        </p>

                        <p className="text-gray-600">
                            Address: <span className="font-semibold">{meal.provider.address}</span>
                        </p>

                        <p className="text-gray-600 flex text-end justify-end items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Joined:
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

            </div>

        </div>
    );
};

export default MealDetailsPage;
