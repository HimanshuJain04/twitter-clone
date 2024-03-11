import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/v1/": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
