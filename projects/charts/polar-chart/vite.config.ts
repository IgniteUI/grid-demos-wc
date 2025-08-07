import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "igniteui-theming": new URL("./node_modules/igniteui-theming", import.meta.url).pathname,
    },
  }
});