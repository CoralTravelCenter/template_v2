import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/michelin.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/thailand/the-slate-phuket/?qp=3mXCNsoTYgYvGGFvTswFg%2fPkipSZBMxvkqa0ns8xI6EwIi%2bh9CF4Ula7%2fQCWZ%2bTlG2nChk%2fombxCaN%2fG7aul%2bXw63wYJtxfDprwFjBXi6yfBdusd0Pdy%2fjvzLOeIX5orATlsgi2TU7VsqzChQv5CAr5VS5yU9z4HeVroC3hONls83adGZlBocALZUopqK2662Q3bjwRKEO226zDr6AdiSiqSDtNc6k6GBp%2ffJ6xF11XH%2f1mgH0fBXY2AMwiMP%2b1nYbiefs7M5MOx%2b4hHcQXr6G%2b5xQRmLvqyBPwJcnftoXkYVaPCi%2f%2fHRuIIYzvAu5PB%2bPdg7rbKFtisOPzKRykSQAJh%2fGgDV6JC8mn2iQF5kSRJAz%2fqhpin%2bqjAcIlkkSu7&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
