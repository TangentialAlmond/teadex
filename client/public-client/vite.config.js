import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
      // Go up TWO levels to find the root node_modules
      'react': path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, '../../node_modules/react/jsx-runtime'),
    }
  },
  build: {
    // This helps Vite find the common chunks in a workspace
    commonjsOptions: {
      include: [/node_modules/],
    }
  }
})
