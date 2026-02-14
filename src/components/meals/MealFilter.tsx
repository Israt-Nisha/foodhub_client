"use client";

import { useEffect, useState } from "react";
import { mealService } from "@/services/meal.service";
import MealsGrid from "./MealsGrid";
import { MealData } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MealFilterPageProps {
    initialMeals: MealData[];
}

const MealFilterPage = ({ initialMeals }: MealFilterPageProps) => {
    const [meals, setMeals] = useState<MealData[]>(initialMeals);
    const [cuisine, setCuisine] = useState("");
    const [dietary, setDietary] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getPageNumbers = () => {
        const pages: number[] = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return pages;
    };


    const fetchMeals = async () => {
        setLoading(true);

        const res = await mealService.getAllMeals({
            cuisine: cuisine || undefined,
            dietary: dietary || undefined,
            sortBy: "price",
            sortOrder,
            page,
            limit: 8,
        });

        if (!res.error) {
            setMeals(res.data.data || []);
            setTotalPages(res.pagination?.totalPages || 1);
        }

        setLoading(false);
    };

    useEffect(() => {
        setPage(1);
    }, [cuisine, dietary, sortOrder]);

    useEffect(() => {
        fetchMeals();
    }, [page, cuisine, dietary, sortOrder]);

    return (
        <div className="container mx-auto px-4 pb-10 space-y-8">
            {/* FILTERS */}
            <div className="flex flex-col md:flex-row gap-4">
                <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="border rounded-md px-3 py-2"
                >
                    <option value="">All Cuisines</option>
                    <option value="BENGALI">Bengali</option>
                    <option value="INDIAN">Indian</option>
                    <option value="CHINESE">Chinese</option>
                    <option value="ITALIAN">Italian</option>
                    <option value="THAI">Thai</option>
                </select>

                <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="border rounded-md px-3 py-2"
                >
                    <option value="">All Dietary</option>
                    <option value="VEG">Veg</option>
                    <option value="NON_VEG">Non Veg</option>
                    <option value="VEGAN">Vegan</option>
                    <option value="HALAL">Halal</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) =>
                        setSortOrder(e.target.value === "asc" ? "asc" : "desc")
                    }
                    className="border rounded-md px-3 py-2"
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            {loading ? (
                <p className="text-center py-10 text-gray-500">Loading meals...</p>
            ) : (
                <>
                    <MealsGrid meals={meals} />

                   
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">
                           
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                           
                            {getPageNumbers().map((p) => (
                                <Button
                                    key={p}
                                    variant={p === page ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </Button>
                            ))}

                          
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                </>
            )}
        </div>
    );
};

export default MealFilterPage;
