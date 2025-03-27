/// <reference types="vite/client" />
declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production";
      }
    }
  }
}
