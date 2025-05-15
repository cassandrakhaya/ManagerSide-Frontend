import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '^/api/': {
          target: 'https://localhost:7117',
          secure: false,
          changeOrigin: true
        }
      },
      port: 50623
    }
  };
});
 