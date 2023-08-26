import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [
        "/Users/Henrique.Oka/node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff",
        "/Users/Henrique.Oka/node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2",
        "..",
      ],
    },
  },
});
