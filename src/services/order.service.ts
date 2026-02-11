import { env } from "@/env";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export interface OrderItemData {
  mealId: string;
  quantity: number;
}

export interface OrderData {
  id?: string;
  customerId?: string;
  providerId: string;
  address: string;
  totalAmount: number;
  status?: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  items: OrderItemData[];
}

export const orderService = {
  createOrder: async (payload: OrderData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message || data.error };
    } catch (err: any) {
      return { data: null, error: err.message || "Something went wrong" };
    }
  },

  getAllOrders: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message || data.error };
    } catch (err: any) {
      return { data: null, error: err.message || "Something went wrong" };
    }
  },

  getOrderById: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message || data.error };
    } catch (err: any) {
      return { data: null, error: err.message || "Something went wrong" };
    }
  },

  updateOrderStatus: async (id: string, status: OrderData["status"]) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message || data.error };
    } catch (err: any) {
      return { data: null, error: err.message || "Something went wrong" };
    }
  },

  deleteOrder: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: true, error: null }
        : { data: null, error: data.message || data.error };
    } catch (err: any) {
      return { data: null, error: err.message || "Something went wrong" };
    }
  },
};