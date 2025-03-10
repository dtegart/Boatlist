import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { redwood } from "redwoodsdk/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [redwood(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
