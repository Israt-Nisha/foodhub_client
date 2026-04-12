export type UserStatus = "ACTIVE" | "SUSPENDED";
export enum UserRole {
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  VENDOR = "VENDOR",
}

export interface UserStatusRole {
  status: UserStatus;
  role: UserRole;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN" | "MANAGER" | "VENDOR";
  status: UserStatus;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role?: string;
  status: UserStatus;
  image?: string;
}


export interface ProviderProfileData {
  id?: string;
  userId: string;
  restaurantName: string;
  address: string;
  phone: string;
  logo?: string;
}

