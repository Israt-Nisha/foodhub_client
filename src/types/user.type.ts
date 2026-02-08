export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
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


