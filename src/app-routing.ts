import { Route } from "@vaadin/router";

export const routes: Route[] = [
  { path: "", redirect: "home" },
  {
    path: "home",
    component: "home-view",
    children: [
      { path: "", redirect: "grids/inventory" },
      {
        path: "grids",
        children: [
          { path: "inventory", component: "erp-hgrid-view" },
          { path: "finance", component: "finance-view" },
          { path: "hr-portal", component: "hr-portal-view" },
          { path: "sales", component: "sales-view" },
          { path: "fleet", component: "fleet-management-view" },
        ]
      },
      {
        path: "charts",
        children: [
          { path: "column-chart", component: "column-chart-view" },
          { path: "bar-chart", component: "bar-chart-view" },
          { path: "line-chart", component: "line-chart-view" },
          { path: "pie-chart", component: "pie-chart-view" },
          { path: "step-chart", component: "step-chart-view" },
          { path: "polar-chart", component: "polar-chart-view" },
        ]
      }
    ],
  },
  {
    path: "grids",
    children: [
      { path: "inventory", component: "app-erp-hgrid" },
      { path: "finance", component: "app-finance-grid" },
      { path: "hr-portal", component: "app-hr-portal" },
      { path: "sales", component: "app-sales-grid" },
      { path: "fleet", component: "app-fleet-management" },
    ]
  },
  {
    path: "charts",
    children: [
      { path: "column-chart", component: "app-column-chart" },
      { path: "bar-chart", component: "app-bar-chart" },
      { path: "line-chart", component: "app-line-chart" },
      { path: "pie-chart", component: "app-pie-chart" },
      { path: "step-chart", component: "app-step-chart" },
      { path: "polar-chart", component: "app-polar-chart" },
    ]
  },

  // Fallback route
  { path: "(.*)", redirect: "home" }
];
