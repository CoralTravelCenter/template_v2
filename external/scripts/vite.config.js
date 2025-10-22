import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/seoBannerSunmar.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.sunmar.ru/russia-krasnayapolyna-rozahutor/letnie-aktivnosti-na-kurorte-roza-hutor/'],
      },
    }),
  ],
});
