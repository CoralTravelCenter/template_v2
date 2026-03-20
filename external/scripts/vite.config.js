import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/seal.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/turkey/bodrum-holiday-resort-spa-bodrum/?qp=gEIDPqjHDS6F9wLPRxSMEntVYjt95UQJsa0yuQCniDgy5WfOKgjK2AFifbOOnP0ze9b1hWlvSjKABn%2bWbvt8tCfISW47uW8bK4Uin9aEfr6xDoP%2fuNe5%2b9xQnhIoD0MBFfIlmoQcuuzY9Q2C4mrd6SzuuvjKMT%2fATTTigwUeJfSfselXd4UP40PP5plR7gdTc1YoQ8pnFo3QIbftasPeUjbTT4VEqw7UZcfyDiNBXBy7cA0E2xBMg%2bHZXhVxAUj8uOShRREtCF4Q92HSimkzkU1omXqf8qYJml%2ftFLiZLJ3OQ1TzDxLkCXHAYVTNNoMA2rI1IvhbtYacaHQMLfiqTql07RdOhIUCmwk%2bgmH1Zx%2fnKEUmzQLvp%2b2HlXc0hzJPiYHdjMMqq4%2bnn0PMeE6ZwrhmVeJnlJwm212Kk%2fzel3k%3d&p=1&item_variant_switch=tour'],
      },
    }),
  ],
});
