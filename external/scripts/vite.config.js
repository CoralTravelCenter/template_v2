import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/userData.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/booking/add-passenger/?bti=44965e0b-e34b-41a4-9e26-10a0a01875b4&p=1'],
      },
    }),
  ],
});
