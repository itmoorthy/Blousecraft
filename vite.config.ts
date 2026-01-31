
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Blousecraft/',  // Replace 'Blousecraft' with your actual GitHub repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
