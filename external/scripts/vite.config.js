import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/checkoutExpand.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.sunmar.ru/booking/add-passenger/?bti=888065ff-7959-47fa-a335-c1699221f0fe&p=1&step=0'],
      },
    }),
  ],
});
