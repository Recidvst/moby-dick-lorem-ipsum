require('dotenv').config();
import axios from 'axios';
const APIURL = process.env.APIURL;
const APITOKEN = process.env.APITOKEN;

module.exports = {
	mode: "universal",
	/*
	 ** Headers of the page
	 */
	head: {
		title: "Moby Dipsum",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content:
					"A Moby Dick themed Lorem Ipsum generator. Make your placeholder content more majestic with random paragraphs and chapter titles from the legendary book."
			},
			{
				hid: "keywords",
				name: "keywords",
				content: "Moby Dick, Lorem Ipsum, generator, nuxt"
			}
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=EB+Garamond|Hind+Siliguri"
			}
		]
	},
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
  // transitions
  pageTransition: 'page',
	// env variables - handled by netlify in production
	env: {
		environment: process.env.NODE_ENV || "development",
		APIURL: process.env.APIURL || "url",
		APITOKEN: process.env.APITOKEN || "token",
		GA_ID: process.env.GA_ID || "gaid",
		SENTRY_DSN: process.env.SENTRY_DSN || "sentry_dsn",
		SENTRY_DISABLED: process.env.SENTRY_DISABLED || false,
	},
	css: [{ src: "~assets/css/main.scss", lang: "sass" }],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics'
	],
	sentry: {
    dsn: process.env.SENTRY_DSN
  },
  googleAnalytics: {
    id: process.env.GA_ID
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
					enforce: "pre",
					test: /\.(js|vue)$/,
					loader: "eslint-loader",
					exclude: /(node_modules)/
				});
			}
      config.module.rules.push(
        {
          test: /ico$/,
          loader: 'file-loader?name=[name].[ext]',
        }
      )
		},
		postcss: {
			plugins: {
				"postcss-custom-properties": false
			}
		}
  },
  generate: {
    fallback: true,
    routes () {
      // build graphql query
      const query = `query {
        bookalice: book(name: "alice") {
          titles(random: false) {
            _id
            identifier
            content
          },
          paragraphs(random: false) {
            _id
            identifier
            content
          },
        },
        bookmoby: book(name: "moby") {
          titles(random: false) {
            _id
            identifier
            content
          },
          paragraphs(random: false) {
            _id
            identifier
            content
          },
        },
      }`;
      let allContent = axios.post(`${APIURL}/graphql`, query, {
        type: "cors",
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "x-access-token": APITOKEN
        }
      })
      .then(function(response) {
        if (response.data && response.data.data) {
          return response.data.data;
        }
      	return response;
      })
      .then(data => {
        const aliceContent = data.bookalice;
        const mobyContent = data.bookalice;
        // map the returned data to URLs for Nuxt
        if (aliceContent && mobyContent) {
          const aliceTitles = aliceContent.titles.map((title) => {
            return '/titles/alice/' + title._id;
          });
          const aliceParagraphs = aliceContent.paragraphs.map((paragraph) => {
            return '/paragraphs/alice/' + paragraph._id;
          });
          const mobyTitles = mobyContent.titles.map((title) => {
            return '/titles/moby-dick/' + title._id;
          });
          const mobyParagraphs = mobyContent.paragraphs.map((paragraph) => {
            return '/paragraphs/moby-dick/' + paragraph._id;
          });
          // return combined array of all content
          return [...aliceTitles, ...aliceParagraphs, ...mobyTitles, ...mobyParagraphs];
        }
        return [];
      });
      // return promise into routes
      return Promise.all([allContent]).then(values => {
        return values.join().split(',');
      });
    }
  },
};
