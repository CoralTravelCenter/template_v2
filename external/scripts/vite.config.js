import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/hotelCard.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=lWOJw1XDa14WeujkN6zDTjrSS4InjySD2qbQrZHMvM7DCEAK7uaQMQ%2FH3LSgTl4fhYUWdUY9F0xSiQPd0LbsRtP4Smni2ia6fRGnFA8X0%2FLLY%2BPz%2F7J2pJC%2BBxWjpgBLJDGJ5UN%2BYo5488bSyoluFFGEtblHVzjxBqsrNzTKpneyyX4%2BJnT%2Bl2oW%2FQuDl1l%2FCErp24%2FLUadbPdtogS48Lgr%2BfQg8ypErYlx6Faot1NzdI9vENN6AOPgI9kbq%2BeIr0vsXUy0oBed7PMToXMAWXepCedEHaXJGCSp%2Fa%2BUiG0bRwm68yljWJ2Mh7hvfTBDB&p=1&w=0&s=0'],
      },
    }),
  ],
});
