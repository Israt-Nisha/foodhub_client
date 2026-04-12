"use client";

import { useEffect, useState } from "react";
import { mealService } from "@/services/meal.service";
import MealsGrid from "./MealsGrid";
import { MealData } from "@/types";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface MealFilterPageProps {
    initialMeals: MealData[];
}

const MealFilterPage = ({ initialMeals }: MealFilterPageProps) => {
    const [meals, setMeals] = useState<MealData[]>(initialMeals);
    const [cuisine, setCuisine] = useState("");
    const [dietary, setDietary] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
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
            search: debouncedSearchTerm || undefined,
            cuisine: (cuisine && cuisine !== "all") ? cuisine : undefined,
            dietary: (dietary && dietary !== "all") ? dietary : undefined,
            sortBy: "price",
            sortOrder,
            page,
            limit: 8,
        });

        console.log("CLIENT MEALS RES:", res);

        if (!res.error) {
            setMeals(res.data);
            setTotalPages(res.pagination?.totalPages ?? 1);
        }
        setLoading(false);
    };

    useEffect(() => {
        setPage(1);
    }, [debouncedSearchTerm, cuisine, dietary, sortOrder]);

    useEffect(() => {
        fetchMeals();
    }, [page, debouncedSearchTerm, cuisine, dietary, sortOrder]);

    return (
        <div className="container mx-auto px-4 pb-10 space-y-8">
            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4">
                    <Select value={cuisine} onValueChange={(v) => setCuisine(v)}>
                        <SelectTrigger className="w-[180px] border  rounded-md  focus:ring-orange-500 transition-all">
                            <SelectValue placeholder="All Cuisines" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Cuisines</SelectItem>
                            <SelectItem value="BENGALI">Bengali</SelectItem>
                            <SelectItem value="INDIAN">Indian</SelectItem>
                            <SelectItem value="CHINESE">Chinese</SelectItem>
                            <SelectItem value="ITALIAN">Italian</SelectItem>
                            <SelectItem value="THAI">Thai</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={dietary} onValueChange={(v) => setDietary(v)}>
                        <SelectTrigger className="w-[180px] border  rounded-md  focus:ring-orange-500 transition-all">
                            <SelectValue placeholder="All Dietary" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Dietary</SelectItem>
                            <SelectItem value="VEG">Veg</SelectItem>
                            <SelectItem value="NON_VEG">Non Veg</SelectItem>
                            <SelectItem value="VEGAN">Vegan</SelectItem>
                            <SelectItem value="HALAL">Halal</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
                        <SelectTrigger className="w-[180px] border  rounded-md  focus:ring-orange-500 transition-all">
                            <SelectValue placeholder="Price Sorting" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">Price: Low to High</SelectItem>
                            <SelectItem value="desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="relative w-full md:w-72 lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search for delicious meals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-11 bg-background border-border focus:border-orange-500 focus:ring-orange-500 rounded-xl transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading || !meals.length ? (
                <>
                    <MealsGrid meals={meals} isLoading={loading} />
                </>
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
                                    className={p === page ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500" : "hover:text-orange-500 hover:border-orange-500"}
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
