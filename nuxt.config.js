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
					"A Moby Dick themed Lorem Ipsum generator. Request paragraph content or chapter titles."
			},
			{
				hid: "keywords",
				name: "keywords",
				content: "Moby Dick, Lorem Ipsum, generator, nuxt"
			}
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.png" },
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
	loading: { color: "#d59d37" },
	// env variables - handled by netlify in production
	env: {
		environment: process.env.NODE_ENV || "development",
		APIURL: process.env.APIURL || "url",
		APITOKEN: process.env.APITOKEN || "token",
		GA_ID: process.env.GA_ID || "gaid"
	},
	css: [
		{ src: "~assets/css/main.scss", lang: "sass" },
		{ src: "font-awesome/scss/font-awesome.scss", lang: "scss" }
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		[
			"@nuxtjs/google-analytics",
			{
				id: process.env.GA_ID || "gaid"
			}
		]
	],
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
		},
		postcss: {
			plugins: {
				"postcss-custom-properties": false
			}
		}
	}
};
