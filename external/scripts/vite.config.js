import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/hotelView.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://b2cpilotui.coral.ru/hotels/turkey/prenses-sealine-beach-hotel-belek/?qp=3mXCNsoTYgYvGGFvTswFg1R1cevyxwHKNe0d0YuunfLfJYpgH94Sfrp6fvTkkNnWPQOrGubFBs14LvPpwrblrM82hpoGkr4BCZ6L0InMhYM2%2fBPRV68GdDZAEPQfgNoXIUnZhG%2beO7Jvy2qWc8nrtEgoVQFiGpGpEbR841FKORyAqjeL3UApw2uCEzF71FmEH8FPPNWuGfimNSdPMmkVsdQD5E0zaVvYA8yNBhb%2bhVwVkFGIETJLhmn2gJL2DSZNBpTtrjPpG6jXaytpv4eUIPqBju0eN4KUTX3OBoxUu%2bYRPbWLwtPA4RFsjmhN8mg%2fdjt7%2bBSywIySNsLYC1C7dA%3d%3d&p=1&w=0&s=0&ws=15'],
      },
    }),
  ],
});
