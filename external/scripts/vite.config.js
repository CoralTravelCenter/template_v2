import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/paymentTabs.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/payment/?bti=a4ffc8a0-a9fe-4b01-923c-6a2098d311b8&ern=44FHsquTqUZzfa5fBmOkz6n5POkyvfezyFX9YepqF4Nrbj%2FHmfg%2FrM7xTUxdbyF3MY9A%2Be03GoJEBSxxCIN0j3e4lxdA1n7pf%2FkPKi%2BftYkOx3VQtFiumgFuAmoi9yAHe4jF4bgyyPqjah5Esq4CW%2Bhdn9cCztP0bkg3xbsNNnqS1QKTOy1QPjKNu3jRjEY4vrhG%2BQbRf7bL%2B5jqbUAADBBdwORuxvtf3%2BzEoFgFqftXER1spjM89j06ye%2Fjn0R%2BQftt6MDBwo%2BenlfeTG%2BhpzgOcdCbGzs1AknvV5GhLp471eaEyjNxTm4SBtSmz1g24w74C6%2FJXy%2Br1AylgNV9Um%2BIpRSleWgLsHSjy8pzJHLzTOP2HotWqGsE9k859ZbLPERogkFeiK7Rpu3Xqq8V3ZPi6PjlhHBzxTE%3D%C6%89IxLQ8y7GfeHgVLsh&p=1'],
      },
    }),
  ],
});
