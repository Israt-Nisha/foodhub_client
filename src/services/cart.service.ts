import { env } from "@/env";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export interface CartItemPayload {
    mealId: string;
    quantity?: number;
}

export interface UpdateCartItemPayload {
    quantity: number;
}

export const cartService = {
    addToCart: async (payload: CartItemPayload) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/carts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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


    getCartItems: async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/carts`, {
                cache: "no-store",
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


    getCartItemById: async (id: string) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/carts/${id}`, {
                cache: "no-store",
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


    updateCartItem: async (id: string, payload: UpdateCartItemPayload) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/carts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
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


    deleteCartItem: async (id: string) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/carts/${id}`, {
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