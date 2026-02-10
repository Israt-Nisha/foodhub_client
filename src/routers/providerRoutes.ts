import { Route } from "@/types";

export const providerRoutes: Route[] = [
  {
    title: "Provider Dashboard",
    items: [
      {
        title: "Provider Profile",
        url: "/dashboard-provider/profile",
      },
      {
        title: "Manage Meals",
        url: "/dashboard-provider/meals",
      },
    ],
  },
];