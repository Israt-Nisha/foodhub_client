import { env } from "@/env";
import { UserData, UserStatus } from "@/types";


const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const adminService = {
  
  getStats: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      
      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err?.message || "Something went wrong" },
      };
    }
  },


  getAllUsers: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : {
            data: null,
            error: { message: data.message || "Failed to fetch users" },
          };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err?.message || "Something went wrong" },
      };
    }
  },

  getUserById: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data as UserData, error: null }
        : {
            data: null,
            error: { message: data.message || "Failed to fetch user" },
          };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err?.message || "Something went wrong" },
      };
    }
  },

  updateUserStatus: async (id: string, status:UserStatus) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status}),
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : {
            data: null,
            error: { message: data.message || "Failed to update user" },
          };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err?.message || "Something went wrong" },
      };
    }
  },

   updateUser: async (id: string, payload: Partial<UserData>) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data as UserData, error: null }
        : {
            data: null,
            error: { message: data.message || "Failed to update user" },
          };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err?.message || "Something went wrong" },
      };
    }
  },

  deleteUser: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: true, error: null }
        : {
            data: null,
            error: { message: data.message || "Failed to delete user" },
          };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err?.message || "Something went wrong" },
      };
    }
  },
};