// Category type
export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
};

// Provider type
export type Provider = {
  id: string;
  restaurantName: string;
};

// Enums
export type CuisineType = "BENGALI" | "INDIAN" | "CHINESE" | "ITALIAN" | "THAI";
export type DietaryType = "VEG" | "NON_VEG" | "VEGAN" | "HALAL";

// Meal data returned from backend
export type MealData = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  isAvailable: boolean;

  cuisine: CuisineType;
  dietary: DietaryType;

  userId: string;
  providerId: string;
  categoryId: string;

  category?: Category;
  provider?: Provider;
};

// Payload used to create a meal
export type MealCreateInput = {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  userId: string;
  providerId?: string; // optional if backend assigns
  imageUrl?: string;
  isAvailable?: boolean;
  cuisine?: CuisineType;
  dietary?: DietaryType;
};

// Payload used to update a meal
export type MealUpdateInput = Partial<MealCreateInput>;
