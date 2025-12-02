import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/preloader.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.coral.ru/hotels/vietnam/golden-lotus-hotel-nha-trang/?qp=lWOJw1XDa14WeujkN6zDTiepZxC4QqSIxHmMMD6gfIwoGqdks31F%2BrhPs%2FILFDgNhS4aVYlUNH7l4TI20dY8EE9YzcQGoYbAL5bRrh1feqHX157K7jQk3AGMPyLAsX4C2IVWP5%2B5sTCg%2BMTX36IBro3otBaogeTQv1lMpKUPePndzS3xw%2FmuVYXGtYmI4wuCDramTrgj%2Bh5YlXBhusQraj%2BMX98yyOxdWJUbRxF1yMu6V%2FgEhqjcg0vTwJi0j2T0gV1ATjTD0Umf53ySyOqnq9x2RzJS7iMl5x6CvjDQ7w9x4auyLtFM47dXfjDTYPOf5p4frM6jsVQyZa5%2Fu%2FfMdIVa7mkb8wy7AvkIYQ%2FIFMQ%3D&p=1&w=0&s=5&hlqp=lWOJw1XDa14WeujkN6zDTiepZxC4QqSIxHmMMD6gfIwoGqdks31F+rhPs%2FILFDgNhS4aVYlUNH7l4TI20dY8EE9YzcQGoYbAL5bRrh1feqHX157K7jQk3AGMPyLAsX4C4WJoCk%2FZPIKyz1y7vfcd6tSQgtFMF7RoZQzGaSS5lN%2Fpg9IOfTQ9HZwN4TcO14T1CLmQM5LFccRKas+wf3lk7rCyFqy96B%2FJ99I0jLX27YYEuF6vpM4otz5zSdmsMljUGW6dlxaMuv040I5mZNd93EJ%2FllPicHCVEUwSYUPY3Ltz5KECIsur4kWSIJfnSuqH4LLt5yruw3XqPY5s2aW0MA%3D%3D&ws=10&offerId=0%C9%941%C9%94%C9%94%C9%94%C9%94%C9%946%C9%947%C9%9441%C9%9417147%C9%9448164%C9%94%C9%94422%C9%940%C9%94124%C9%94%C9%940%C9%94197%C9%942671%C9%940%C9%941%C9%940%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%94%C9%942%C9%940%C9%94%C9%9420251203%C9%9420251204%C9%94%C9%94%C9%94%C9%94%C9%94%C9%940%C9%942%C9%940%C9%94%C9%94%C9%94%C9%94%C6%870__-0__%C6%870__-0__%C6%87%C9%94STANDARD+ROOM%C9%94%C9%94%C9%94%C6%87%C6%87'],
      },
    }),
  ],
});
