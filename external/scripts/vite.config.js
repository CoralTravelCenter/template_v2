import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/minSearch.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=lWOJw1XDa14WeujkN6zDTjjxUfHyKkHLlgOKGT2N54CmaESjXAj6iE8u0UJ45N0Sh6JWHFGulOMIf4mosoiya44I4X86H7iaR8NzxBYcKa7LfzQX8vjsHb1%2BayFUmPgjhXNYHiJpHJ7M%2F69pQ8qnjxczBVmv4kSs%2FwbME6ADHljqdXsuM453TkGhdulKwEveL09w2cXUoviApvkcXVy6uQuNSno%2BqijMQKfeMGtlj%2FQ3qMzNPRiWpk9WZqfrQDLnSeMGS7tf2a5NX8%2FeCKuAv1E6emWBhECR6NQ2avpyWF%2FxwGUnXuyTuA6cBW7YAnXb7AZCpans7siiV%2BWvIxqa1A%3D%3D&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
