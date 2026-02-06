export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
};

export type Provider = {
  id: string;
  restaurantName: string;
};

export type MealData = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  isAvailable?: boolean;

  categoryId: string;
  providerId: string;

  cuisine?: string;
  dietary?: string;

  category?: Category;
  provider?: Provider;
};
