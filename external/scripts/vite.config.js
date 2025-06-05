import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/survey.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/turkey/begonville-beach-hotel-marmaris/?qp=3mXCNsoTYgYvGGFvTswFg7WttRIuaez1MPj%2bn7IFwfxcbYwX1pX8SY2iTZ9CKvFqLLyJxvPQq0k4kVH4LRY1Aruo0pBYfQeBMmiEbov9M3GHRxdCOVFu2JpxynhvNWOxWuErJZM3xaum1vo10RoKDt%2fM9cjtRuz2W16qpXTlPFrNY6CUYVZlwYHPHj4W9HmT3sbzBwXjyMg9KUWZ2XLlZXSzZxC7zB48vzPoDjnCKAo9jTIWPc1CVKeNQgGIbt9quyl5sGCI%2f0AWgtQxIZECKjO5bQZ0LIWV0wQBMHr8Y09I%2fdJrPU5AlRryyh99z7IK&p=1&w=0&s=0'],
      },
    }),
  ],
});
