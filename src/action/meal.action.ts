"use server";


import { mealService } from "@/services/meal.service";
import { MealCreateInput, MealUpdateInput } from "@/types";
import { updateTag } from "next/cache";



export const getAllMeals = async () => {
  return await mealService.getAllMeals();
};

export const createMeal = async (data: MealCreateInput) => {
  const res = await mealService.createMeal(data)
 updateTag("mealPosts");
  return res;
};


export const updateMeal = async (id: string, data: MealUpdateInput) => {
    const res = await mealService.updateMeal(id, data);
    return res;
}