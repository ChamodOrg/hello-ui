import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local dev: env-config.js points HELLO_API_URL at /api, and this proxy
// forwards /api/* to the hello-api service so the browser stays same-origin.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
