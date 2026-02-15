import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/metricRB.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.sunmar.ru/packagetours/moskva-to-turtsiya-tours/?qp=lWOJw1XDa14WeujkN6zDTjWHDywo1nMLmTaMUiTQ049TvtDpgpGCD8FWiaUP5JcQy4oRJS0gtqycUYMKqx6UfLfjF7Z%2f86jqngarwIngi9r%2bK8qQd6iwtLGlWRHpLUm3IkOB5ufoR7HXwZWFKh89XpwOLVa%2fRJv%2bt8Gu3s%2bdprfXWTAfwAZNb6rddSTT01rz3J93gXlIy%2fygF%2frtfdRVtCXol3tWitQVO5SqKLKrhgzSLMVVQBk0k6baQ0OtimUweraZfVwZd1k7aJSyDMRUJY6fhT1bx27L0LXNmj1UJmiMwm3jWUNGto5e2Px7Re1ULR0r%2bQTvZ%2bGa59B1ZYu5TMVfTM38CyzfvrBma5%2fhhxV4wjgp4ER8wB667Cp8G%2b5SZLjlO8PtdtN8dZX4MQym8Q%3d%3d&p=1&w=0&s=0&ws=10'],
      },
    }),
  ],
});
