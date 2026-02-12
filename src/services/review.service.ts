import { env } from "@/env";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export interface ReviewData {
  id?: string;
  mealId: string;
  rating: number;
  comment?: string;
}


export const reviewService = {
  getAllReviews: async () => {
    const res = await fetch(`${BACKEND_URL}/api/reviews`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },



  getReviewById: async (id: string) => {
    const res = await fetch(`${BACKEND_URL}/api/reviews/${id}`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },



  createReview: async (payload: ReviewData) => {
    const res = await fetch(`${BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return res.json();
  },


  updateReview: async (id: string, payload: Partial<ReviewData>) => {
    const res = await fetch(`${BACKEND_URL}/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return res.json();
  },

  
  deleteReview: async (id: string) => {
    const res = await fetch(`${BACKEND_URL}/api/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },
};