import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://b2cpilotui.coral.ru/packagetours/moskva-to-2-tours/?qp=lWOJw1XDa14WeujkN6zDTlY2nykIx6jIr3Jy7J5yZ657Hbdr0UQcmG1Ivx%2FMK3a5Ncy0C4cQkQjUBIruApAIA8Qm0cpIpuWqXi0z9K1DOGl9wEkRsuBWdAVeNiLnklKe3Oqupq9nrkDrjHzEUIKz3iUKzIJX%2F2lL7pbG5OPl%2BKFoKKcj7umLg2kjiuZjiaT8MlZ38okEgXlprLYpQJz4nUwpQ3Xpz9oYVGbVHoRDxeFh7onyVbvoNPJBPOjbE%2BD43DE3Br1jmlD8Ob4W0BCJmIRnD1XmJxVLU5qATx3%2BLGU1zFVYBPbBYc3lyyPTuE%2FLKS2No41AgzBgoQEOLsil%2Bw%3D%3D&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
