import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/miniPage.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          // 'https://www.coral.ru/hotels/turkey/*',
          // 'https://www.coral.ru/booking/add-passenger*'
            'https://www.sunmar.ru/preview/2c18a19f-1e77-4bad-9452-6c283d4c9543/ru-RU/'
        ],
      },
    }),
  ],
});
