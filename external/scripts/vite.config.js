import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/taiBannerSearchV2.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/packagetours/moskva-to-tailand-tours/?qp=gEIDPqjHDS6F9wLPRxSMEnaoA9euBmpAvWksabFtPh0bfbYuEa6mSi0THbHMCevhYw0HxRHXtsmdDdmObIiA%2fR3IaNsWTRLp0KSKxg8vzvBKhY72QXy6n8xIjbjdiQDh9YWFYM4LasGHNITN1vzOImD2lIWrWWythVrvrZEFivcHDB3htYH7zHlbQ0vtE5Pun0pxuSQjRLZLvBaIlayWpOLM5s%2fWpgxe%2fcQka9iMDq2CKXGLUFyambGGhe4MyqrwoDeLXR8nfypm8RuXv73X%2fI5utlFCNJHiGI7knjqlIkaOi9OZeVSbO%2fI1pGxjVAz155taRDTC8LsiszS0hnDdVw%3d%3d&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
