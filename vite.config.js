import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // CRA outputs to 'build' by default, Vite to 'dist'. Keep 'build' for compatibility.
  },
});