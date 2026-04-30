import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescriptCheckerPlugin from "vite-plugin-checker";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react(), typescriptCheckerPlugin({ typescript: true })],
  server: {
    host: true,
  },
  build: {
    outDir: "./build",
  },
  resolve: {
    alias: [{ find: "@", replacement: fileURLToPath(new URL("./src/components", import.meta.url)) }],
  },
});
