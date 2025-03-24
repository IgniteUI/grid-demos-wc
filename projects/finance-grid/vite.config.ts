import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "igniteui-theming": path.resolve("node_modules/igniteui-theming"),
    },
  },
});
