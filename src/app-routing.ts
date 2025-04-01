import { Route } from "@vaadin/router";

const basePath = import.meta.env.MODE === "production" ? "/webcomponents-grid-examples" : "";

export const routes: Route[] = [
  { path: `${basePath}/`, redirect: `${basePath}/home/finance` },
  {
    path: `${basePath}/home`,
    component: "home-view",
    children: [
      { path: "inventory", component: "erp-hgrid-view" },
      { path: "finance", component: "finance-view" },
      { path: "hr-portal", component: "hr-portal-view" },
      { path: "sales", component: "sales-view" },
      { path: "fleet", component: "fleet-management-view" },
    ],
  },
  { path: `${basePath}/inventory`, component: "app-erp-hgrid" },
  { path: `${basePath}/finance`, component: "app-finance-grid" },
  { path: `${basePath}/hr-portal`, component: "app-hr-portal" },
  { path: `${basePath}/sales`, component: "app-sales-grid" },
  { path: `${basePath}/fleet`, component: "app-fleet-management" },

  // Fallback route
  { path: `${basePath}/(.*)`, redirect: `${basePath}/home/inventory` },
];
