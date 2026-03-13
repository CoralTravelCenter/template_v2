import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/rbSummer.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/turkey/xanadu-resort-belek/?qp=3mXCNsoTYgYvGGFvTswFg6ve8F7awMgkMlo3DzfVRI%2bvAEGx4BKP%2fvxGt9fRR1qkrRf276MYCy5Za2RXTiRAyeouI6zSPXpSiOVzoGMC31Oc320mbyj9oejTDay2C6QDqpfQL5HxWC4AEvS9zav9ANsuCby%2fR5mbODmv6tjjHXRHfNCGhVJu8u5UkZsmb%2b58TRvT7qkr5Ju0q1LL98t%2bH%2bYJ8xOhn35GExpJAVn2V4qDg6vFYu29nR3QIxq2S2hAKWOPUfMNkDKdFPpdQbwSSZgFdD2PYZIC1uHDBPMbhofXh9ovAZ3ASTN3hcPseHv01UWiOPLmxVxH3iLbxuLYqJK56FkMIKeiX8yhT%2b7GwrWk00LjaqrnM8zufIjCHsY%2f4KprMhZWdNbIJdYeekICv0uLUp50BtgZeJYvioj8nCA%3d&p=1&w=0&s=0&ws=17&ws=17'],
      },
    }),
  ],
});
