import { env } from "@/env";


export interface CategoryData {
  id?: string;
  name: string;
  slug: string;
}

const BACKEND_URL = env.BACKEND_URL;

export const categoryService = {
getAllCategories: async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories`, {
      cache: "no-store",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        data: null,
        error: data.message || "Failed to fetch categories",
      };
    }

    return {
      data: data.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong while fetching categories",
    };
  }
},

    getCategoryById: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories/${id}`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },



}