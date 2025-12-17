import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  rserver: {
    fs: {
      // Allow Vite to serve files from one level up (the shared folder)
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      // This forces Vite to use the SAME React instance for everyone
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    }
  }
})
