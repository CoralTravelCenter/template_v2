import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=lWOJw1XDa14WeujkN6zDTp30fQ%2Fdipb2EYnQqq%2FoKB%2FMgn%2Ftl4sU5bcTJ8iNQKiajHCmsuFzFa3LIS%2Fn5ueIGQjz0J747jOfcGrTtc%2BSQxAK01HjDEDMvNfFF1ILpcWMfTLbRAT48zBQeb980aqjy4CAkQqMIXMHUJwqncCTUl%2BsFFWLWBRDYjz2m8HdLeXdVsghV2k5u8jr1SN0S02eib0LZp%2Fse%2FqdNbk1lHM8Vwv9CzVYc0S67MliaH6HQx3%2BVdKAWd%2FYPCtQi%2Bf0cczipLt9oERP7luLdxPt%2FG59plku5DOmiyp3RIqLD1%2B79KTL&p=1&w=0&s=0'],
      },
    }),
  ],
});
