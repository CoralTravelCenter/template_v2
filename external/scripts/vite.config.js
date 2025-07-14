import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/banner.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/turkey/marvida-family-eco-ex-otium-family-eco-club-side/?qp=3mXCNsoTYgYvGGFvTswFgzqUHZUC25mMMx6ULGp%2FGK%2BNNVLdZxHh5whU6hOsfDlXE5NawFLLknJeN5AZ3%2BYgJGY%2BiWOlsuqC3brhWfF1aZOkm34%2FKqwbbINGk3KrSxUZKdKhTXoy%2FzoCy4L6ZHxaRNMJ6F4OxRUXXcKYMEgh3mlfxmSvOh6Obc446FnjOj2FVfsBwAqRHS2lcjeVyfomrP1xbC4SYo%2Bxw8z%2F1e3WkBqtbtDarOF6LsY1SuXULw%2FKPFQyVa9jN0MiDEdGtxpzHULK74%2BRgdPhWvz2O5WZ%2BIYJMaX%2ByPIGmF4dZWgL2Ho0&p=1&w=0&s=0&ws=17&offerId=0%C9%941%C9%94%C9%94%C9%94%C9%94%C9%946%C9%946%C9%941%C9%94453%C9%9448242%C9%94%C9%941%C9%940%C9%94124%C9%94%C9%942685826%C9%942%C9%942671%C9%940%C9%941%C9%940%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%942%C9%942686049%C9%94%C9%9420250729%C9%9420250729%C9%94%C9%94%C9%94%C9%94%C9%94%C9%940%C9%942%C9%940%C9%94%C9%94%C9%94%C6%870__-0__%C6%870__-0__%C6%87%C9%94HOTEL+STANDARD+ROOM%C9%94%C9%94%C9%94%C6%87'],
      },
    }),
  ],
});
