// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     hmr: { overlay: true },
//   },
//   plugins: [react()],
//   // server: {
//   //   proxy: {
//   //     '/api': {
//   //       target: 'http://localhost:8000',
//   //       changeOrigin: true,
//   //     },
//   //   },
//   // },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  server: {
    hmr: { overlay: false },
  },
});
