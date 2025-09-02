import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    watch: {
      usePolling: true
    },
    allowedHosts: ['inithub.site', 'www.inithub.site', 'init-hub-frontend', 'localhost']
  },
})
