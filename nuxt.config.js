const pkg = require('./package');

module.exports = {
	mode: 'universal',

	/*
	 ** Headers of the page
	 */
	head: {
		htmlAttrs: {
			lang: 'fr',
			prefix: 'og: http://ogp.me/ns#'
		},
		title: '',
		titleTemplate: 'ParkourFinder — %s',
		meta: [
			{ name: 'robots', content: 'noindex' }
		],
		noScript: [
			{ innerHTML: 'Javascript est requis pour parcourir ce site.' }
		],
		link: [
			// { rel: 'shortcut icon', href: '/favicons/favicon.ico' }
		]
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#bb2b4d' },

	/**
	 * Router
	 */
	router: {
		linkActiveClass: '-active',
		base: '/'
	},

	/*
	 ** Global CSS
	 */
	css: ['@/assets/icons/css/icons.css', '@/assets/snickles/snickles.css'],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: ['~plugins/vue-filters.js', '~plugins/vue-modal.js'],

	/*
	 ** Minification options for build
	 */
	minify: {
		removeEmptyAttributes: false,
		collapseWhitespace: true,
		conservativeCollapse: true,
		collapseBooleanAttributes: true,
		removeTagWhitespace: false,
		removeStyleLinkTypeAttributes: true
	},

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios',
		// Doc: https://www.npmjs.com/package/@nuxtjs/localtunnel
		// ['@nuxtjs/localtunnel', { subdomain: 'pkfinder' }],
		// Doc: https://pwa.nuxtjs.org/
		['@nuxtjs/pwa', {}],
		// Doc: https://github.com/nuxt-community/modules/tree/master/packages/browserconfig
		['@nuxtjs/browserconfig', { TileColor: '#bb2b4d' }]
	],

	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},

	/*
	 ** PWA manifest module configuration
	 */
	manifest: {
		name: 'ParkourFinder',
		theme_color: '#bb2b4d',
		background_color: '#bb2b4d'
	},

	/**
	 * Variables environment
	 * https://fr.nuxtjs.org/api/configuration-env/
	 */
	env: {
		api: {
			spots: `https://rest.parkourfinder.com/spots`
		}
	},

	/*
	 ** Proxy module configuration
	 */
	proxy: {
		// '/spots/': `https://rest.parkourfinder.com`
	},

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	},

	postcss: [require('autoprefixer')],

	vendor: ['moment', 'vue-js-modal']
};
