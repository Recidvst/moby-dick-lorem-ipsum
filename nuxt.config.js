module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Moby Dick Lorem Ipsum generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A Moby Dick themed Lorem Ipsum generator. Request paragraph content or chapter titles.' },
      { hid: 'keywords', name: 'keywords', content: 'Moby Dick, Lorem Ipsum, generator, nuxt' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=EB+Garamond:400,400i,500,500i' }, 
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Old+Standard+TT:400,400i' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#d59d37' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  css: [
    { src: '~assets/css/main.scss', lang: 'sass' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' },
  ],  
  vendor: [
    '~/assets/js/utils.js'    
  ]
}