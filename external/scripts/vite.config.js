import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/script.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://b2cpilotui.coral.ru/hotels/turkey/atalla-hotel-antalya/?qp=gEIDPqjHDS6F9wLPRxSMEl7wcT3Gn%2f0OOXi9ZUAQ82jGPGjgyZDYx1biyyQERuho3Fz1xpmaFQhlVGOEW5obE9TpvrcEaPxaVCRMZpCIiq8G2HdJM3aajpssgmrjWtzbFfoWBw67i02Ihj8Wa4ajQCxQuDQkEgsekx8RacJEy6uF9Gyly4K61WjfL8TFkn0%2b0EfWN4KY6zW0%2fosyJVXn5PnApeufD1LJY6l1jq%2bjQ2ysrUBmioVR8vHGpzVVMUuNDXFqPiRIVua0%2fOP6s5XEnXL%2fKm653u3Tqha49Isbd7qceL3gILhiJ99%2fya%2f%2byJhc&p=2&w=0&s=0&ws=15'],
      },
    }),
  ],
});
