import { env } from "@/env";
import { CuisineType, DietaryType, MealCreateInput, MealData, MealUpdateInput } from "@/types";

export interface GetMealsParams {
  search?: string;
  cuisine?: string;
  dietary?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  providerId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const mealService = {
  getAllMeals: async (params?: GetMealsParams) => {
    try {
      const url = new URL(`${BACKEND_URL}/api/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(url.toString(), {
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

      return { data: data, pagination: data.pagination, error: null };

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


  createMeal: async (payload: MealCreateInput): Promise<{ data: MealData | null; error: any }> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/meals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Failed to fetched Meals" },
        };
      }

      return { data: data, error: null };

    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateMeal: async (id: string, payload: MealUpdateInput) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/meals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Failed to fetched Meals" },
        };
      }

      return { data: data, error: null };

    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }

  },

  deleteMeal: async (id: string) => {

    try {
      const res = await fetch(`${BACKEND_URL}/api/meals/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      return data.success
        ? { data: true, error: null }
        : { data: null, error: { message: data.message } };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

}