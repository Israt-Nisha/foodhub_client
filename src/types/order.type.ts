type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

interface Meal {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  cuisine: string;
  dietary: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  meal: Meal;
}

interface Provider {
  id: string;
  restaurantName: string;
  address: string;
  phone: string;
  logo: string;
}

interface Order {
  id: string;
  customerId: string;
  providerId: string;
  address: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  provider: Provider;
}
