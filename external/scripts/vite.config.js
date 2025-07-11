import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/banner.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/turkey/blue-waters-club-side/?qp=3mXCNsoTYgYvGGFvTswFgyGzfgcLAyIUvuxH%2BA9uwc%2F3xEDXZBSmGytxaBZ5WSxe%2BPnhZNtUmTDiTAsBmHZps55021Vq0mzdNjCpOhoEJL1JJYq3S77qTkD8EVzGKWxxZPMxV0GklEILpeEOvjmBIaWCz3Co5xV5dtG4jlqVtUJk7k%2B7BkrVdRIsneqaP17%2BFil9%2BAK1WqLyLqcM9b%2Bbg6RQruuoHpIKCKvol29QZ78orHV09MHbejFb7%2FqBSh8eQgdnGOnhgpI24Lr%2F7sLqGaIO22Zyk8Soksxnc0IVbyin3O%2BDv94QijJE%2BdgNLEvF&p=1&w=0&s=0&ws=17&offerId=0%C9%941%C9%94%C9%94%C9%94%C9%94%C9%946%C9%946%C9%941%C9%94465%C9%9448662%C9%94%C9%941%C9%940%C9%94124%C9%94%C9%942759625%C9%942%C9%942671%C9%940%C9%941%C9%940%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%942%C9%942791471%C9%94%C9%9420250730%C9%9420250730%C9%94%C9%94%C9%94%C9%94%C9%94%C9%940%C9%942%C9%940%C9%94%C9%94%C9%94%C6%870__-0__%C6%870__-0__%C6%87%C9%94CLUB+STANDARD+ROOM%C9%94%C9%94%C9%94%C6%87'],
      },
    }),
  ],
});
