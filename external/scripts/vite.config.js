import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/hotel-empty.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        // match: ['https://www.coral.ru/packagetours/moskva-to-turtsiya-tours/?qp=lWOJw1XDa14WeujkN6zDTvUQqPbS3jAkXnSbQAEtmkYGE6L0gA1gc8OzJhHjufIYfJqkGUXwgPJHWDim9VUFkfMtSxY4oaQWgoiqIg6LaeGcKjurDdX9GhrIMQo3Z3KJizkUR1DHWoTTJ17wt1WwjgpTQ6znQrW%2BbB93IUrQXXLYrOQosfg8wbHJUEWNm3sY%2FJxGfrmL2Qj7RZvnE%2Bt%2BkIRfsNS6fSgXT72Js4nRTqktY5SS3Q48%2Bo1aJ2svsB3hJKgrh7xNvsIlMoM6zCFVWn7a7pBE13Zr9Ts3%2ByWW4RNy2DsgTkiF%2FCf%2FTxR153k0&p=1&w=0&s=0'],
        match: ['https://www.coral.ru/hotels/turkey/armonia-holiday-village-spa-bodrum/?qp=lWOJw1XDa14WeujkN6zDTvUQqPbS3jAkXnSbQAEtmkYGE6L0gA1gc8OzJhHjufIYfJqkGUXwgPJHWDim9VUFkfMtSxY4oaQWgoiqIg6LaeGcKjurDdX9GhrIMQo3Z3KJqNKAi0axRe1Ju%2bQENR3lHlgXVKegn4CgUpF2OBVyC3Ie6hykyjZ6aeQm0tpIKP%2bDxDWQUxaAXYOu292nje%2bWL75msfCVKr7tahcT2xEKGHixNqQP8Wz9gd%2fvfGCiJPTW4NenhDYfnoalkgh3327nuqyT3Zc207OMU8TILAd9s4qoTEK0GqVuJsFgpvoiQlOL6FeaK6XK%2bAYSH3e8hY9SWXiqLl1Xh%2b1i14Tn7jwIj8M%3d&p=1&w=0&s=5&hlu=packagetours/moskva-to-turtsiya-tours&hlqp=lWOJw1XDa14WeujkN6zDTvUQqPbS3jAkXnSbQAEtmkYGE6L0gA1gc8OzJhHjufIYfJqkGUXwgPJHWDim9VUFkfMtSxY4oaQWgoiqIg6LaeGcKjurDdX9GhrIMQo3Z3KJizkUR1DHWoTTJ17wt1WwjgpTQ6znQrW+bB93IUrQXXLYrOQosfg8wbHJUEWNm3sY/JxGfrmL2Qj7RZvnE+t+kIRfsNS6fSgXT72Js4nRTqktY5SS3Q48+o1aJ2svsB3hJKgrh7xNvsIlMoM6zCFVWn7a7pBE13Zr9Ts3+yWW4RNy2DsgTkiF/Cf/TxR153k0'],
      },
    }),
  ],
});
