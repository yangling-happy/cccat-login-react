import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // 自动打开浏览器
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true, // 生成 sourcemap 便于调试
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // 分离第三方库
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
    },
  },
  // 环境变量前缀
  envPrefix: "VITE_",
});
