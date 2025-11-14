
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const rootEnvDir = path.resolve(__dirname, "..", "..");

export default defineConfig({
  envDir: rootEnvDir,
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
      allowedHosts: ['soksmax.ru'],
    },
    preview: {
      allowedHosts: ['soksmax.ru'],
    },
  });
