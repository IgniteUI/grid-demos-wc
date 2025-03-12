import { Route } from "@vaadin/router";

export const routes: Route[] = [
  { path: "/", redirect: "/home/inventory" },
  {
    path: "/home",
    component: "home-view",
    children: [
      { path: "inventory", component: "erp-hgrid-view" },
      { path: "finance", component: "finance-view" },
      { path: "hr-portal", component: "hr-portal-view" },
      { path: "sales", component: "sales-view" },
      { path: "fleet", component: "fleet-management-view" },
    ],
  },
  { path: "(.*)", redirect: "/home/inventory" }, // Fallback
];
