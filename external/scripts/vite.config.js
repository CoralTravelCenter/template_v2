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
            'https://www.sunmar.ru/preview/9db04aca-cd69-47cb-9610-f45d7e4ec4f3/ru-RU/'
        ],
      },
    }),
  ],
});
