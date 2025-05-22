import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './',  // Changed to relative path for more flexible deployment
  plugins: [vue()],
})
