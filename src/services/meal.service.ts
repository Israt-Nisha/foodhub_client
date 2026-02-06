import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

export const mealService = {
  getAllMeals: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/meals`, {
        cache: "no-store",
        credentials: "include",
      });


      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Failed to fetched Meals" },
        };
      }

      return { data: data.data, error: null };

    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }


  },

  getMealById: async (id: string) => {
    try {
       const res = await fetch(`${BACKEND_URL}/api/meals/${id}`, {
      cache: "no-store",
      credentials: "include",
    });
    
     const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Failed to fetched Meals" },
        };
      }

      return { data: data.data, error: null };

    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
   
    
  },

}