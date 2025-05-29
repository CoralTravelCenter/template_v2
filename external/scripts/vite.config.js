import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/thankPoint.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/thank-you/?bti=9a473cc8-4471-4a93-b21d-2db0f621c160&ern=rwVhxS%2FljZpr7yovB0Hd1NSNukqHqQOTNhvIkZKlZwXVDlwhkJXIM9qCLt%2FM2RHE7%2Fg%2BIwJUppL3jLtluVX76lzlN9zVDg6eZnnxh3AaPsKs1hp4KSua%2FTwaDOgXsYpo%2BkVsJye9x1xTMxmbkEbccvEzrCEmeHDgTr6DpuAGVjq%2Bti8yLieF6O1UFJwOrqq3i8T12swCuSrJys6o%2BXD4YlcQSJP72V%2B%2Fw3CaYi5pcHGNstmq38%2BccGtyDmH9NO6bKHRYEqWueLj8UEFd9KIoYtrR0Dvma8bC5xD8jEAXZqH7aNskJtLEvwSWv7jRYb266sv5IiLeRGcPYD6JLcV9jT1GBQ%2B7Pcl3mTpGMhHYuH6sGeBv9dCxodrlED5p6OIh8xXm&p=1'],
      },
    }),
  ],
});
