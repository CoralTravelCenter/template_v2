import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/script.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://b2cpilotui.coral.ru/hotels/thailand/happy-bou-jomtien-pattaya/?qp=lWOJw1XDa14WeujkN6zDTijZVgKxFDqLl3VDx5J01pCJ1mU3DikBJpMUL%2bOxXTUCGq3iFtKO%2byuQw5gYebLVUpp%2fEedNgoDK0X2%2bizWF7jeKrmqUkXQuhcbnDHckYhsj3xVKVv9nSpF3yeHx0w4b2qsZJWtDtLFzHTwgvMv%2fPgXA5JFsW%2fD4tjZvYxDg5KfCxvC2pijKzieKegYiHQYZXoowdHVbM8SLBpS0GQgD%2b27t9uFPuSB4TtXEeY0yKH9VWS%2fVJi4cCXYLW%2faCl43Ioc%2f%2bwoaJdIEYSyxMdugfSgpm2OqVSUAtps18uTdzkQzjHa5M9iho3mtfH6fHVMuelOMZRXxx6iZ5UXNuRloZ%2ff0%3d&p=1&w=0&s=5&hlqp=lWOJw1XDa14WeujkN6zDTijZVgKxFDqLl3VDx5J01pCJ1mU3DikBJpMUL+OxXTUCGq3iFtKO+yuQw5gYebLVUpp/EedNgoDK0X2+izWF7jeKrmqUkXQuhcbnDHckYhsjSFAz9c5i2EHQeEkRFROOPWM7NCJpn4id/YbX3LSEJIjGj38MMpUY3x3IiY1ZmVmToCI3CDt/6VzdFwDZSMISZikWiCaImn2J/2NqoUsxMPlI1+/DcEAA5BwK145kZn/qJWeArSddUuGMWMYtrJhc2siDmz1oXLi/B+yv64by3ksRah0z638PRlMMDSIULeGUDctYIv0Dp8zarYhgao+GA==&ws=10'],
      },
    }),
  ],
});
