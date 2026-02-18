import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/eliteFull.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/turkey/rixos-premium-gocek-fethiye/?qp=gEIDPqjHDS6F9wLPRxSMEg19UfveL4%2barKzvYx0z1sfXaHKbf6U0qABh2YgiofsLTQkCNKY87txGjKQiButPPs9oxDCi%2b%2b21cBTuPHRV8rAoyKO66nh1cx5sXvILyH33Ui2uV2oe7LCiQJiHwZ7KnQYPT%2f8p6U0ck5qm2TwVaVysOYd4WrPd5VBuYJOBGWMiDoR%2bI4PKn4b0xqDeLWWIBmBKB3YbcuYrsCgvHUu7Mlp2ugF%2fE%2f27iiXERvwvPWGjBmBeZPwiXPB4pkQnZ5sl8lK70xYwdkUv65t%2bZqx10Pv470uSu6vGYT6YAEQPvp%2bU9JgDT8MLKQOhc6PXYWmAbs4GrFoz7QO1ANbDjKA5dCrELAjMKm4VdtxBpJWBIbn%2fN95qz0WgoEpV2vH%2b17ZghFiCTeVXfo1V3GBupefFYOc%3d&p=1&w=0&s=5&hlu=packagetours/moskva-to-turtsiya-tours/&hlqp=gEIDPqjHDS6F9wLPRxSMEg19UfveL4+arKzvYx0z1sfXaHKbf6U0qABh2YgiofsLTQkCNKY87txGjKQiButPPs9oxDCi++21cBTuPHRV8rAoyKO66nh1cx5sXvILyH33mk/IQ0VOf2bsPR8kdvJE7nYyDyIVxYORrgtE3xpJORcUZqEOThR0k+t398m4d51q1acBmuyz/TpIKElgWRNzDMg6e+Yi5w76eb8Aud7n2rwuvbkPLv+8eBa9PPUzJ10LT0N6o6RgwPjgAtvuuZgLYoZWAMd4e/VeQwhuJufEcofZdkO1m2EjqVeOTRdffEWawjAjy8E9m+dyn4/U2pq6iHRHI64LvAzHHl63PXleeGkMvTKSBA0IvuushK2XeMdY4DTRExIUQn4Yx1FHDV2oQw==&ws=10'],
      },
    }),
  ],
});
