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
  { path: "/invetory", component: "app-erp-hgrid" },
  { path: "/finance", component: "app-finance-grid" },
  { path: "/hr-portal", component: "app-hr-portal" },
  { path: "/sales", component: "app-sales-grid" },
  { path: "/fleet", component: "app-fleet-management" },
  { path: "(.*)", redirect: "/home/inventory" }, // Fallback
];
