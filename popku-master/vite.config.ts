import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './index.html',  // Make sure this points to your index.html
    },
  },
});
