import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/8_marchMetric.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.sunmar.ru/packagetours/moskva-to-turtsiya-tours/?qp=gEIDPqjHDS6F9wLPRxSMEsk9SPjT08oD295gmfVK7B5bDpD8I7QGaccwRailcz5NDKvzdE5L7j6wqEOrQkD8fGtjJB3ejsOVIUskv%2bl2%2b%2f40sZ2sF9TCcUNb23fyrhzgH64UhVkhs2hZZ%2fmmBACuPfIRGirSvrCDoAuW7wG%2fbyVI5NxTdiXC4dLXV2o7j2fdtV3Z7zw4TD7x72%2b5jPhH%2bQEPxGfvNkX7D1ZtRkymwW89DGqULxlZJqVmqDSV6LkUBgbijnZ1aLxoDHgmthV%2fwCfY7vGnlBkgnEwYER%2b%2f12lfOs1oOGa0e3QUA8ITw8vB0ij6%2f%2f3lMlIGZn0OoJC%2b4MFqbWXvhnqhfd2Q2BwXG3A%3d&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
