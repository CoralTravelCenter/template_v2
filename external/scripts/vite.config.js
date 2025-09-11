import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/userData.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/booking/add-passenger/?bti=5395452b-9364-4196-82f2-978bde2a7d76&p=1'],
      },
    }),
  ],
});
