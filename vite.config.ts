import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
export default defineConfig(() => {
  return {
    base: "/webcomponents-grid-examples/",
    resolve: {
      alias: {
        "igniteui-theming": new URL("./node_modules/igniteui-theming", import.meta.url).pathname,
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "./web.config",
            dest: "",
          },
          {
            src: "./projects/finance-grid/public/*",
            dest: "",
          },
          {
            src: "./projects/hr-portal/public/*",
            dest: "",
          },
          {
            src: "node_modules/igniteui-webcomponents-grids/grids/themes/light/bootstrap.css",
            dest: "themes",
          },
          {
            src: "node_modules/igniteui-webcomponents-grids/grids/themes/light/fluent.css",
            dest: "themes",
          },
        ],
      }),
    ],
  };
});
