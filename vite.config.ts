import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000, // You can change this to any port you prefer
    open: true, // Automatically open the app in the browser
  },
});
