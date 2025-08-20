import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  resolve: {
    alias: {
      "igniteui-theming": new URL("./node_modules/igniteui-theming", import.meta.url).pathname,
    },
  }
});