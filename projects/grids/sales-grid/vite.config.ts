import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  resolve: {
    alias: {
      "igniteui-theming": new URL("./node_modules/igniteui-theming", import.meta.url).pathname,
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/igniteui-webcomponents-grids/grids/themes/light/indigo.css",
          dest: "themes",
        },
      ],
    }),
  ],
});
