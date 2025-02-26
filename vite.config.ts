import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tanstack/react-query'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  },
  server: {
    port: 5173
  }
});