import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/banner.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/vietnam/golden-lotus-hotel-nha-trang/?qp=lWOJw1XDa14WeujkN6zDTqWW08P5GlfL6tl3LpMpSdKbOusW6tT%2FxeLazHvNiuMTq7CxTv21KaxtcY5mvl8uNsdPFhCGEZxgRp98K5G6jgHGkb0aNo6ZwCWvC%2FT1TghbkQcug2Jp9Jog5fG6jifx1tbPJdX8NqXI6hFBS0KwLRepBOW7bFgu7GThXe2aLIGMz8cF%2FtrxAUp7W3mWYczwadv%2Bj1NmLmZqbMKMf03z47EmZf5Z606qLUuKVT%2FPboA3uTxpsBQ9apNFDJf8eitqzjVogNDbmO0pz6FhKI8T0TAaTQPtbt7Q4NlfX%2FXo8NJvsVIkEDYyWuo5iYRDzLASLXBd1Rnp%2Br8AADhnossgR8I%3D&p=1&w=0&s=5&hlqp=lWOJw1XDa14WeujkN6zDTqWW08P5GlfL6tl3LpMpSdKbOusW6tT%2FxeLazHvNiuMTq7CxTv21KaxtcY5mvl8uNsdPFhCGEZxgRp98K5G6jgHGkb0aNo6ZwCWvC%2FT1TghbGzdYj17QMseAd0IlqGqXt3VgGx4QaMajstAGUP+82ADa8dZHhb0Z4rlAEyTBd8A8OWKJ3RUTgtzUWdsOhsTzZvyHW0xNagm3eFUBMh5+1razdElagv%2FSn7Fb95iWE0DgZhx2FNOoIkttEEDxIqLhW2npS43TuZh1oTxPqse43l7Jo3GR57UfbvcrS2zGSHMlKJoAxPMmRerc7sA+TplbdA%3D%3D&ws=10&offerId=0%C9%941%C9%94%C9%94%C9%94%C9%94%C9%946%C9%947%C9%9441%C9%9417147%C9%9448164%C9%94%C9%94422%C9%940%C9%94124%C9%94%C9%940%C9%94197%C9%942671%C9%940%C9%941%C9%940%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%942%C9%940%C9%94%C9%9420251029%C9%9420251030%C9%94%C9%94%C9%94%C9%94%C9%94%C9%940%C9%942%C9%940%C9%94%C9%94%C9%94%C9%94%C6%870__-0__%C6%870__-0__%C6%87%C9%94STANDARD+ROOM%C9%94%C9%94%C9%94%C6%87%C6%87'],
      },
    }),
  ],
});
