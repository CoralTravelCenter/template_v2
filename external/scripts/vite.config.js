import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/hotel-search.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/onlyhotel/turtsiya-hotels/?qp=gEIDPqjHDS6F9wLPRxSMEguv1H7LZyYGtroqvW1KltkMPxE2glq6douCLUmS2dA1Qi9x5bz1Y9R0bOkvp9nRVSp57ZN5UFff8Ef67lGGfN99aDSmCX4XdHGJIcpQxC1t3YQkN9F3dxAId333yYWEN85xnksqXta4hP1R7eqIMvx0AzcYNN%2BNZepX3huzJN%2B9KQR%2Fyv0c4M%2BOV91pWZfGtnNUJ%2BMpLsXCicZKx2mc6FYvCtaRm7wXlTyoDp0wYtZq62Hj46qAhjSMJtYeX5%2FZSTaz%2F1blEzmv9z1q3M8u22CQf%2ByycwsnrGnnpibuD%2Bsc&p=2&w=0&s=0'],
      },
    }),
  ],
});
