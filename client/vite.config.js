import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend server URL
        changeOrigin: true,
        secure: false,
        // Optional: rewrite paths if necessary
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});