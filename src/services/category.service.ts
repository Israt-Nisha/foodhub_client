

const BACKEND_URL = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BACKEND_URL;

export interface CategoryData {
  id?: string;
  name: string;
  slug: string;
  imageUrl?: string;
}

export type CategoryWithCount = CategoryData & {
  _count?: {
    meals: number;
  };
};



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


  createCategory: async (payload: CategoryData): Promise<{ data: CategoryData | null; error: any }> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Failed to created Category" },
        };
      }

      return { data: data.data, error: null };

    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateCategory: async (id: string, payload: CategoryData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Failed to Update Category" },
        };
      }

      return { data: data.data, error: null };

    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }

  },

  deleteCategory: async (id: string) => {

    try {
      const res = await fetch(`${BACKEND_URL}/api/categories/${id}`, {
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