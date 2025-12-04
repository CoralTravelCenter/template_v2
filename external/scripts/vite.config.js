import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/taiBannerSearch.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/packagetours/moskva-to-2-tours/?qp=gEIDPqjHDS6F9wLPRxSMEvkA6e0U4twxVX4zWITB1lDfnMtCqoyqlefuLKJimdi9UTUw4VBuCoIK8XkNoAGcZRyKiVy8fAhu7l0a1hVoq%2f7DPS1qPqovhc5TGOZKeM79JVid0YVV3vROG4w7JsGsRFvpGLL52o7Dk3AidLKsloztzmq4iGYDPIA8tzx0kyCRS5vzOd2OSvuXaY6%2by7q65Vd%2bVvLJMayp3cR7RpMFeN%2bJ11bHAfo3CdoopTx4QmVqtTHP%2bZOGkx7uuqEJY9Gp%2baM%2fGwW2e6%2f8xs6wFGl1mYmKhyv4D5W12hCtolg3jRbbF44vdg7SRgs8p8PWyktL7S9W8S2TfdHGLhTciG%2bpviQ%3d&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
