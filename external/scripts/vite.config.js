import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/userData.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/booking/add-passenger/?bti=ebad5730-74b5-46a4-8491-4ce8a6a9569a&p=1'],
      },
    }),
  ],
});
