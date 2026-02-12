import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/dashboard-customer",
      },
      
      {
        title: "My Order",
        url: "/dashboard-customer/orders",
      },
    ],
  },
];