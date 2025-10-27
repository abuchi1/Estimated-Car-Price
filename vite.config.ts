import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // load all env vars (including VITE_ prefixed ones)
  const env = loadEnv(mode, process.cwd(), '');

  // Prefer VITE_GEMINI_API_KEY (recommended pattern). Fallback to plain GEMINI_API_KEY if present.
  const geminiKey = 'AIzaSyA89K_4mBW9csvMrUAqqkyewPSxCmGF018';

  return {
    // required when deploying to GitHub Pages for a project site
    base: '/Estimated-Car-Price/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    // Expose the key to any code expecting process.env.GEMINI_API_KEY (optional).
    // Recommended approach: use import.meta.env.VITE_GEMINI_API_KEY in your app code instead.
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
      'process.env.API_KEY': JSON.stringify(geminiKey),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
