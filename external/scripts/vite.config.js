import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/preloader.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/russia/gostinitsa-elkus-s-petersburg/?qp=gEIDPqjHDS6F9wLPRxSMEopGDjm0KWDLzZYJzuyxag4mCtXTYP0iFYZyJdI8qDyBCrcSA%2BrQfkn1sJG8VbrRylk%2FJrjKSocG7wvP2ljPHH5p8ag%2BFpYHs9jfphuq%2F6YW7wxm7ISw9BPIvDSoc4qA3tniaSlab6qxhyL0NwAQgTKYRa2TMjAD4fagRsi9f%2BN4SCnWr6tkOyWkjqhZEFCmILb4V1mFYCPaBbxBYh0zctUhSxCJWendZtKCx1Uy7x7uFmwslqU99Uoef5POpoDJK1Ax7oVC7jggnZSd1O1NmMJwPraltTUjZIrugjf5Gv2SEmlm4hbmB0xQUSxmCRMxGV4M12VX6K1bKVqdT981D94%3D&p=1&w=0&s=5&hlqp=gEIDPqjHDS6F9wLPRxSMEopGDjm0KWDLzZYJzuyxag4mCtXTYP0iFYZyJdI8qDyBCrcSA+rQfkn1sJG8VbrRylk%2FJrjKSocG7wvP2ljPHH5p8ag+FpYHs9jfphuq%2F6YWIfntWoyFX7RaoQ9EM9FVur7Qy7E70DsRFN2aEaqnfLYu7fmDckTyMxfbyg4xi75f8fXnIlyfJWfKoF36878ml0IAm5ALw%2FRv1n8G5rlCMdTAixZtl3wYOFQLu8JRE6wFaGgAlV7imMRI+7XEeLSef%2Fe56cZFhGJ+WCxK%2F11gmM4oFjOmuQJn4Y9QG2sdUgOC6yRSeItGVqCprEugO8uQng%3D%3D&ws=10'],
      },
    }),
  ],
});
