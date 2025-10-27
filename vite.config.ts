import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
 const geminiKey = 'AIzaSyA89K_4mBW9csvMrUAqqkyewPSxCmGF018'; // 🔹 nếu bạn dùng biến môi trường thực tế, dùng env.GEMINI_API_KEY

  return {
    base: '/Estimated-Car-Price/', // 🔹 Quan trọng cho GitHub Pages
    plugins: [react()],
    build: {
      outDir: 'dist', // 🔹 đảm bảo build ra đúng thư mục deploy
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
      'process.env.API_KEY': JSON.stringify(geminiKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 🔹 đổi '.' thành 'src' nếu bạn import theo dạng '@/components/...'
      },
    },
  };
});
