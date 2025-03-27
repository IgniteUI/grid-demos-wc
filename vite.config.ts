import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/webcomponents-grid-examples" : "/",
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
        ],
      }),
    ],
  };
});
