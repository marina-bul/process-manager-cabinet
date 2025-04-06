import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    },
    postcss: {
      plugins: [autoprefixer]
    }
  }
})
