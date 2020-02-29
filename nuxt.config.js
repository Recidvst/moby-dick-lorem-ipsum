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
      let titles = axios.get(`${APIURL}/titles/moby-dick`, {
        method: "GET",
        type: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Origin": "*",
          "x-access-token": APITOKEN
        }
      })
      .then((res) => {
        return res.data.map((title) => {
          return '/titles/moby-dick/' + title._id;
        })
      });
      let alicetitles = axios.get(`${APIURL}/titles/alice`, {
        method: "GET",
        type: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Origin": "*",
          "x-access-token": APITOKEN
        }
      })
      .then((res) => {
        return res.data.map((title) => {
          return '/titles/alice/' + title._id;
        })
      });
      let paragraphs = axios.get(`${APIURL}/paragraphs/moby-dick`, {
        method: "GET",
        type: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Origin": "*",
          "x-access-token": APITOKEN
        }
      })
      .then((res) => {
        return res.data.map((paragraph) => {
          return '/paragraphs/moby-dick/' + paragraph._id;
        })
      });
      let aliceparagraphs = axios.get(`${APIURL}/paragraphs/alice`, {
        method: "GET",
        type: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Origin": "*",
          "x-access-token": APITOKEN
        }
      })
      .then((res) => {
        return res.data.map((paragraph) => {
          return '/paragraphs/alice/' + paragraph._id;
        })
      });
      return Promise.all([titles, alicetitles, paragraphs, aliceparagraphs]).then(values => {
        return values.join().split(',');
      })
    }
  },
};
