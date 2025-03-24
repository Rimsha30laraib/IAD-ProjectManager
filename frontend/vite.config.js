import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_URL': JSON.stringify('https://iad-project-manager-fde9.vercel.app/'),
  }
})

