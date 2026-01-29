import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/eliteFull.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/turkey/lara-barut-collection-antalya/?qp=gEIDPqjHDS6F9wLPRxSMErJOYVRdEOsc9AEFwXuH9oy15fAV48nrc0qvKqzn72q17kCEOXX13vEalIGJtVKQLwR53w3RGtsi2AEruW8n8swz%2f3na99buuFBRcwc6QFJEswc5JAB1Jn0AUWMZS8SM5Iq9J20S5%2fydWYlgOOa1iSDtoL6AY7P06Z8njEryFnWqwvqoyKJvkPkJkU%2bqAdq%2bdqFOT753I4w5HKDaqo4WSCLJBFZF6ag9xFDfilhTN%2fy8GwgWGxjB%2bal9xGkJtCNvheqNq46bWcHoLK3%2fWhPRCuhBr5WhUGORjgXkEdLO23m%2f3w1N17g08OlnLkH%2bQyGfIpEdj5YFAKzDV12ZBwMVYg8%3d&p=1&item_variant_switch=tour'],
      },
    }),
  ],
});
