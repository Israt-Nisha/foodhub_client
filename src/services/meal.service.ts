
import {  MealCreateInput, MealData, MealUpdateInput } from "@/types";

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

const BACKEND_URL = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BACKEND_URL;

export const mealService = {
  getAllMeals: async (params?: GetMealsParams) => {
    try {
        const isBrowser = typeof window !== "undefined";

      const baseUrl = isBrowser
        ? window.location.origin         
        : process.env.NEXT_PUBLIC_BACKEND_URL 

      const url = new URL("/api/meals", baseUrl);

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


      const json = await res.json();
     if (!res.ok || json.error) {
        return {
          data: [],
          pagination: { total: 0, page: 1, limit: params?.limit || 10, totalPages: 1 },
          error: { message: "Failed to fetch meals" },
        };
      }

      return {
        data: json.data?.data ?? [],                
        pagination: json.data?.pagination ?? null,  
        error: null,
      };

    } catch (error) {
      return {
        data: [],
        pagination: { total: 0, page: 1, limit: params?.limit || 10, totalPages: 1 },
        error: { message: "Something went wrong" },
      };
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