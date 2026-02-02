import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

export const mealService = {
  getAllMeals: async () => {
    const res = await fetch(`${BACKEND_URL}/api/meals`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },
  
  getMealById: async (id: string) => {
    const res = await fetch(`${BACKEND_URL}/api/meals/${id}`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },

}