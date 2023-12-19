import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";


export default defineConfig({
  plugins: [vue()], 
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: ['chrome61', 'es2020', 'safari11'],
    cssTarget: ['chrome61', 'safari11', 'firefox90'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/style.scss";`
      }
    },
  },
})
