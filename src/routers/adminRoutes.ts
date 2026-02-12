import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Manage-Users",
        url: "/dashboard-admin/users",
      },
      {
        title: "Manage-Categories",
        url: "/dashboard-admin/categories",
      },
      {
        title: "Orders",
        url: "/dashboard-admin/orders",
      },
    ],
  },
];