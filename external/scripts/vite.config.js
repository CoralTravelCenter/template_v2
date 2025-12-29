import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/payment.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/payment/?bti=c29e9109-1330-440b-8f64-7cb4108cfd57&ern=pnuxHLLLbADm7%2F5sdNAg24iW%2FBNInAO6AIV6xk9t7qZz0YI9aixyAtEPz%2B6fG%2FBJmUFBrAxPuYw%2BJjdn%2BZUt6yDp8GHO8Rv5pMMN1%2BexlNO4xhJeF1C80OeA62o4jVkpCaTC5HxzRDNh%2FizMhQCKzkDIQwvB1AT05FvUjgnG17Rr8xgCX2KqKLikuak%2F7EQGKTJMS7keAVHeuIEb6xy4%2FVSQzoWaQ%2FINhHyFt2q4n3T3pSS1Ghhj%2F3xpYfjKwUdOr3Fra%2FJyX8iStM%2BkE60IgktJ%2BzNG97wTMVe%2FLtFwZ4kt9IIIurS%2FgejhoKOt3GP4PBOJgl1uV%2FIQEyaOVjQQiyq79I2W13VbYm0lPK%2BLE6U2Wcl11BsH9ucK9sPsd1Ekpbpe%2FlUoMwP4b%2BptYwvc1Qk%2FIpQFWJQ8rJg%3D%C6%896UxA3OSB1vgtN3s5&p=1'],
      },
    }),
  ],
});
