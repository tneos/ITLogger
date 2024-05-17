import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/logs": "http://localhost:5000",
      "/techs": "http://localhost:5000",
    },
  },
  plugins: [react()],
  resolve: {
    mainFields: [],
  },
});