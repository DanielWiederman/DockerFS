import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    }
  },
  define: {
    'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL)
  }

})
