
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/blousecraft/',  // Replace 'blousecraft' with your actual GitHub repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
