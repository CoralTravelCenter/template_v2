import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/banner.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/vietnam/alma-resort-cam-ranh-cam-ranh/?qp=lWOJw1XDa14WeujkN6zDTqfj06UQZv3Ig1kbBr4%2FhumxmueNYU0KWmpePnrnsz1IpwzP2gUhrACm6YS5gNeGTI6G%2BnCDVqnp6TEfU2ozAqOTBBWg7WOSLISh8IzUGvAotPdOiqG6GZoAK22h1x4Mk7Tnopm2%2FBNZldnvXp6wG0VqsHsmyC7Yr7b%2BAtinsSiMBuPepXnvhLcC8xLGDH4KAAXYDILyQkOmToxqkfRlsVZ63JhPBAbrMXOLNOv6DhMEOTAdu2aTfFQ81dqNIiQNdZulqX7LocPiXQU3ijOdwA6tUk2PwL46Ltm3N12xPSGQfjTkTtOUWW95KzEp%2BRTLSuJZ%2BpQA9gfd6%2BWsKSOs1Q0%3D&p=1&w=0&s=5&hlqp=lWOJw1XDa14WeujkN6zDTqfj06UQZv3Ig1kbBr4%2FhumxmueNYU0KWmpePnrnsz1IpwzP2gUhrACm6YS5gNeGTI6G+nCDVqnp6TEfU2ozAqOTBBWg7WOSLISh8IzUGvAobBVLmfx2I0qd41is+FxhYNSFxx4wHleLAy%2FwKFKo%2FHiFxUh6mCkwGAfR8h5fT%2FhKsevcaFuE9frawJeRTcR2tY3nZQtqZrwriwPhc5Vrw5bnC4IIklBviCDpZGnvGX7sDBqWHhNAIQLRq7jDVlat9PuUyZfNR7r0lGroFlZJUQnl288CILM+TvlCdajbS2mGkxos7jekYIF%2FajlAaT4cIw%3D%3D&ws=10&offerId=0%C9%941%C9%94%C9%94%C9%94%C9%94%C9%946%C9%947%C9%9441%C9%9431475%C9%941901687%C9%94%C9%9418%C9%940%C9%94124%C9%94%C9%940%C9%94197%C9%942671%C9%940%C9%941%C9%940%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%942%C9%940%C9%94%C9%9420250913%C9%9420250914%C9%94%C9%94%C9%94%C9%94%C9%94%C9%940%C9%942%C9%940%C9%94%C9%94%C9%94%C6%870__-0__%C6%870__-0__%C6%87%C9%942-BEDROOM+SUITE+WITH+TERRACE+PANORAMIC+OCEAN+VIEW%C9%94%C9%94%C9%94%C6%87%C6%87'],
      },
    }),
  ],
});
