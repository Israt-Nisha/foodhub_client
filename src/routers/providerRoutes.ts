import { Route } from "@/types";

export const providerRoutes: Route[] = [
  {
    title: "Provider Dashboard",
    items: [
      {
        title: "ProviderProfile",
        url: "/profile",
      },
      {
        title: "Manage Meals",
        url: "/dashboard-provider/meals",
      },
    ],
  },
];