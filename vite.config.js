// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');  
  return defineConfig({
    plugins: [react()],
    define: {
      // Make sure it's a string
      'process.env.API_URL': JSON.stringify(env.VITE_API_URL),
    },
  });
};
