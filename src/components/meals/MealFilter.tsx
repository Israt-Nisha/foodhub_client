"use client";

import { useEffect, useState } from "react";

import { mealService } from "@/services/meal.service";

import { CategoryData, categoryService } from "@/services/category.service";
import MealsGrid from "./MealsGrid";
import { MealData } from "@/types";

interface MealFilterPageProps {
  initialMeals: MealData[];
}

const MealFilterPage = ({ initialMeals }: MealFilterPageProps) => {
    const [meals, setMeals] = useState<any[]>([]);
    const [cuisine, setCuisine] = useState("");
    const [dietary, setDietary] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(false);


    const fetchMeals = async () => {
        setLoading(true);
        const res = await mealService.getAllMeals({
        cuisine: cuisine || undefined,
            dietary: dietary || undefined,
            sortBy: "price",
            sortOrder,
            page: 1,
            limit: 50,
        });
        if (!res?.error) setMeals(res.data.data || []);
        setLoading(false);
    };



    useEffect(() => {
        fetchMeals();
    }, [ cuisine, dietary, sortOrder]);

    return (
        <div className="container mx-auto px-4 pb-10 space-y-12">
            {/* FILTERS */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              
                {/* Cuisine */}
                <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="border rounded-md px-3 py-2 w-full md:w-1/4"
                >
                    <option value="">All Cuisines</option>
                    <option value="BENGALI">Bengali</option>
                    <option value="INDIAN">Indian</option>
                    <option value="CHINESE">Chinese</option>
                    <option value="ITALIAN">Italian</option>
                    <option value="THAI">Thai</option>
                </select>

                {/* Dietary */}
                <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="border rounded-md px-3 py-2 w-full md:w-1/4"
                >
                    <option value="">All Dietary</option>
                    <option value="VEG">Veg</option>
                    <option value="NON_VEG">Non Veg</option>
                    <option value="VEGAN">Vegan</option>
                    <option value="HALAL">Halal</option>
                </select>

            
                {/* Price Sort */}
                <select
                    value={sortOrder}
                    onChange={(e) =>
                        setSortOrder(e.target.value === "asc" ? "asc" : "desc")
                    }
                    className="border rounded-md px-3 py-2 w-full md:w-1/4"
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            {loading ? (
                <p className="text-center py-10 text-gray-500">Loading meals...</p>
            ) : (
                <MealsGrid meals={meals} />
            )}
        </div>


    );
};

export default MealFilterPage;
