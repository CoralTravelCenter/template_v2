import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/labelEntry.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/?utm_source=telegram&utm_medium=messenger&utm_campaign=black_friday&utm_term=flesh_10000'],
      },
    }),
  ],
});
