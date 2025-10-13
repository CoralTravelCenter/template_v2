import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/searchMetric.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/packagetours/moskva-to-oae-tours/?qp=lWOJw1XDa14WeujkN6zDTkehmgiQSNDksd66CWANGwr7bEgl0BQdq%2FNCNPFP3kaXZXlhiCMj3PVTQtAIupscBcLYwrVWWwx6jhKYaMOlR8ACbqhU8BdVJ3VuEDMIpQlHGMy6I%2F2KXzPB8wa4cXhy%2F4pdD%2Bh%2FGheLFxFhfxj8YcsHm6k1TJDz1%2BR5Hq2b%2FbWElyyS5%2BooyH%2BhsiEicUn1EjzD41isTxay1Ov8HG8gEiRfqW0V4lb5e9AReajhsnc9satZksMtM8H0CIdTMy2y3Wm6mpFp5kx4UpmAzkzSpShCjPjXicklg2R%2BiM7VzmJa4A7905X3t3T1Y8uZLhSYY0Cj7O1eHaFAyUvJ5GcUJw%2FI6BaM5FG7lXM90H%2F63iMN&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
