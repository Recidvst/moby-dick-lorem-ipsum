require('dotenv').config();
// const appVersion = require('./package.json').version;
// const isProduction = process.env.NODE_ENV === 'production' || false;
let APIURL = process.env.APIURL || 'url';
if (APIURL && APIURL.slice(-1) === '/') {
  APIURL = APIURL.substring(1);
}

export default {
  target: 'static',

  generate: {
    fallback: true,
  },

  /*
   ** Global page headers
   */
  head: {
    title: 'Moby Dipsum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'A Moby Dick themed Lorem Ipsum generator. Make your placeholder content more majestic with random paragraphs and chapter titles from the legendary book.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Moby Dick, Lorem Ipsum, generator, nuxt',
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=EB+Garamond|Hind+Siliguri',
      }
    ],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // env variables - handled by netlify in production
  env: {
    APIURL,
    APITOKEN: process.env.APITOKEN || 'token',
    GA_ID: process.env.GA_ID || 'gaid',
    SENTRY_DSN: process.env.SENTRY_DSN || 'sentry_dsn',
    SENTRY_DISABLED: process.env.SENTRY_DISABLED || false,
  },

  // adding env variables to the Nuxt runtime
  publicRuntimeConfig: {
    APIURL,
    APITOKEN: process.env.APITOKEN || 'token',
    GA_ID: process.env.GA_ID || 'gaid',
    SENTRY_DSN: process.env.SENTRY_DSN || 'sentry_dsn',
    SENTRY_DISABLED: process.env.SENTRY_DISABLED || false,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: 'plugins/persistedState.client.js' },
    { src: 'plugins/vue-dompurify.js' },
    { src: 'plugins/vue-cropString.js' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/sentry'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/stylelint-module',
      {
        fix: true,
      }
    ],
    '@nuxtjs/fontawesome',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg'
  ],

  // fontawesome
  fontawesome: {
    component: 'fa',
    suffix: true,
    icons: {
      brands: ['faGithubSquare'],
      solid: ['faQuoteLeft', 'faQuoteRight'],
    },
  },

  // global styling
  styleResources: {
    scss: ['~assets/css/main.scss'],
  },

  css: [{ src: '~assets/css/main.scss', lang: 'sass' }],

  // transitions
  pageTransition: 'page',

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#37cecd',
    height: '6px',
    throttle: 0,
    duration: 3000,
    continuous: true,
  },

  sentry: {
    dsn: process.env.SENTRY_DSN,
  },

  googleAnalytics: {
    id: process.env.GA_ID,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Moby Dipsum',
      lang: 'en',
    },
    meta: {
      name: 'Moby Dipsum',
      lang: 'en',
      theme_color: '#37cecd',
      ogHost: 'https://moby-dipsum.com/',
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: APIURL, // Used as fallback if no runtime config is provided
    retry: { retries: 3 },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
      config.module.rules.push({
        test: /ico$/,
        loader: 'file-loader?name=[name].[ext]',
      });
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false,
      },
    },
  },

  // generate: {
  //   fallback: true,
  //   routes () {
  //     // build graphql query
  //     const query = `query {
  //       bookalice: book(name: "alice") {
  //         titles(random: false) {
  //           _id
  //           identifier
  //           content
  //         },
  //         paragraphs(random: false) {
  //           _id
  //           identifier
  //           content
  //         },
  //       },
  //       bookmoby: book(name: "moby") {
  //         titles(random: false) {
  //           _id
  //           identifier
  //           content
  //         },
  //         paragraphs(random: false) {
  //           _id
  //           identifier
  //           content
  //         },
  //       },
  //     }`;
  //     let allContent = axios.post(`${APIURL}/graphql`, query, {
  //       type: "cors",
  //       headers: {
  //         "Content-Type": "application/graphql",
  //         "Access-Control-Origin": "*",
  //         "x-access-token": APITOKEN
  //       }
  //     })
  //     .then(function(response) {
  //       if (response.data && response.data.data) {
  //         return response.data.data;
  //       }
  //     	return response;
  //     })
  //     .then(data => {
  //       const aliceContent = data.bookalice;
  //       const mobyContent = data.bookalice;
  //       // map the returned data to URLs for Nuxt
  //       if (aliceContent && mobyContent) {
  //         const aliceTitles = aliceContent.titles.map((title) => {
  //           return '/titles/alice/' + title._id;
  //         });
  //         const aliceParagraphs = aliceContent.paragraphs.map((paragraph) => {
  //           return '/paragraphs/alice/' + paragraph._id;
  //         });
  //         const mobyTitles = mobyContent.titles.map((title) => {
  //           return '/titles/moby-dick/' + title._id;
  //         });
  //         const mobyParagraphs = mobyContent.paragraphs.map((paragraph) => {
  //           return '/paragraphs/moby-dick/' + paragraph._id;
  //         });
  //         // return combined array of all content
  //         return [...aliceTitles, ...aliceParagraphs, ...mobyTitles, ...mobyParagraphs];
  //       }
  //       return [];
  //     });
  //     // return promise into routes
  //     return Promise.all([allContent]).then(values => {
  //       return values.join().split(',');
  //     });
  //   }
  // },

  sitemap: {
    hostname: 'https://moby-dipsum.com/',
    gzip: true,
  },
};
