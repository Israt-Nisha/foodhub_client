"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { MealData } from "@/types";
import MealForm from "./MealForm";
import { mealService } from "@/services/meal.service";

interface Props {
    userId: string;
}

const MealsManage = ({ userId }: Props) => {
    const [meals, setMeals] = useState<MealData[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [selectedMeal, setSelectedMeal] = useState<MealData | null>(null);
    const [openForm, setOpenForm] = useState(false);

    const fetchMeals = async () => {
        setLoading(true);

        const res = await mealService.getAllMeals();
        console.log("getMeals:", res)

        if (!res?.error) {
            const mealsArray = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.data)
                    ? res.data.data
                    : [];

            setMeals(mealsArray.filter((m: MealData) => m.userId === userId));
        } else {
            toast.error("Failed to load meals");
        }

        setLoading(false);
    };


    useEffect(() => {
        fetchMeals();
    }, []);

    const handleDelete = async (mealId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this meal?"
        );

        if (!confirmed) return;

        try {
            const res = await mealService.deleteMeal(mealId);

            if (res.error) {
                throw new Error(res.error.message);
            }

            toast.success("Meal deleted successfully");

            fetchMeals();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete meal");
        }
    };


    return (
        <>
            {/* Add meal */}
            <div className="mb-6">
                <Button
                    onClick={() => {
                        setSelectedMeal(null);
                        setOpenForm(true);
                    }}
                >
                    + Add Meal
                </Button>
            </div>
            {openForm && <MealForm
                userId={userId}
                meal={selectedMeal ?? undefined}
                onSaved={() => {
                    setOpenForm(false);
                    fetchMeals();
                }}
                onCancel={() => setOpenForm(false)}
            />}

            {/* Meal list */}
            {loading ? (
                <p>Loading meals...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {meals.map((meal) => (
                        <div
                            key={meal.id}
                            className="border rounded-xl p-4 space-y-2"
                        >
                            <h3 className="font-bold">{meal.name}</h3>
                            <p className="text-sm text-gray-600">{meal.description}</p>
                            <p className="font-semibold">৳ {meal.price}</p>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setSelectedMeal(meal);
                                        setOpenForm(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(meal.id)}
                                >
                                    Delete
                                </Button>
                            </div>

                        </div>
                    ))}
                </div>
            )}

        </>
    );
};

export default MealsManage;
