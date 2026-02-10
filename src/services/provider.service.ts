import { env } from "@/env";
import { ProviderProfileData } from "@/types";


const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const providerService = {
  getAllProviders: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers`, {
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

  
  getProviderById: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/${id}`, {
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


  createProviderProfile: async (payload: ProviderProfileData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: { message: data.message } };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },


  updateProviderProfile: async (
    id: string,
    payload: Partial<ProviderProfileData>,
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: { message: data.message } };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },


  deleteProviderProfile: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/${id}`, {
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
};