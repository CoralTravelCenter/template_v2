import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/checkoutExpand.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.sunmar.ru/booking/add-passenger/?bti=8b2d2b44-0280-4e72-ba8d-c822447c0ab3&p=1'],
      },
    }),
  ],
});
