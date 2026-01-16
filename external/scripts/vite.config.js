import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/quizMetric.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/?pm-test-form=501fd08af2c7152c81710f6b15b7b5458bcf1924fd342c701e3294c8704a787c&qz_wizard=945adf96-1e26-42be-af95-0ee1d6df755e&qz_wizard_version=71481740-8cb8-48ad-b5e4-35ba34a69245&qz_ab=showWidget%3Aon%2Cready%3Aon'],
      },
    }),
  ],
});
