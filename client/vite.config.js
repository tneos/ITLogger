import {defineConfig, loadEnv} from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config();

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
