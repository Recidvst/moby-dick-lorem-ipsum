export default {
  target: 'static',
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

  // adding env variables to the Nuxt runtime
  publicRuntimeConfig: {
  },
  privateRuntimeConfig: {
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: 'plugins/init.client.js' },
    { src: 'plugins/preview.client.js' },
    { src: 'plugins/persistedState.client.js' },
    { src: 'plugins/vue-dompurify.js' },
    { src: 'plugins/vue-cropString.js' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/applicationinsights'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
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

  appInsights: {
    instrumentationKey: process.env.APP_INSIGHTS_KEY,
    config: {
      enableLiveMetrics: true,
      enableDebug: true,
    },
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
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
  },

  generate: {
    fallback: true,
    // ssr: false,
    // routes () {
    //   const { $content } = require('@nuxt/content');
    //   const aliceTitles = $content('data', { deep: true })
    //     .where({ slug: { $contains: 'combined-alice-in-wonderland-titles' } })
    //     .fetch();
    //   const aliceParagraphs = $content('data', { deep: true })
    //     .where({ slug: { $contains: 'combined-alice-in-wonderland-paragraphs' } })
    //     .fetch();
    //   const mobyTitles = $content('data', { deep: true })
    //     .where({ slug: { $contains: 'moby-dick-or-the-whale-titles' } })
    //     .fetch();
    //   const mobyParagraphs = $content('data', { deep: true })
    //     .where({ slug: { $contains: 'moby-dick-or-the-whale-paragraphs' } })
    //     .fetch();
    //
    //   return Promise.all([aliceTitles, aliceParagraphs, mobyTitles, mobyParagraphs]).then(
    //     ([aliceTitlesData, aliceParagraphsData, mobyTitlesData, mobyParagraphsData]) => {
    //       // Map each item to a route
    //       const aliceTitleRoutes = aliceTitlesData.map(title => `/titles/alice/${title.id}`);
    //       const aliceParagraphRoutes = aliceParagraphsData.map(para => `/paragraphs/alice/${para.id}`);
    //       const mobyTitleRoutes = mobyTitlesData.map(title => `/titles/moby-dick/${title.id}`);
    //       const mobyParagraphRoutes = mobyParagraphsData.map(para => `/paragraphs/moby-dick/${para.id}`);
    //
    //       return [
    //         ...aliceTitleRoutes,
    //         ...aliceParagraphRoutes,
    //         ...mobyTitleRoutes,
    //         ...mobyParagraphRoutes
    //       ];
    //     }
    //   );
    // },
  },

  sitemap: {
    hostname: 'https://moby-dipsum.com/',
    gzip: true,
  },
};
