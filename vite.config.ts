import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
export default defineConfig({
  resolve: {
    alias: {
      "igniteui-theming": path.resolve("node_modules/igniteui-theming"),
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "./projects/finance-grid/public/*",
          dest: "",
        },
      ],
    }),
  ],
});
