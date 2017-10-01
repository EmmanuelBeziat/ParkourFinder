module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		htmlAttrs: {
			lang: 'en-EN',
			prefix: 'og: http://ogp.me/ns#'
		},
		title: '',
		titleTemplate: 'ParkourFinder — %s',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
			{ hid: 'description', name: 'description', content: 'A tiny app to help locate and share parkour spots' }
		],
		noScript: [
			{ innerHTML: 'Javascript est requis pour parcourir ce site.' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	css: [
		'@/assets/icons/css/icons.css',
		'@/assets/snickles/snickles.css'
	],

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#bb2b4d' },

	/**
	 * Router
	 */
	router: {
		linkActiveClass: '-active',
		base: '/',
		middleware: 'i18n'
	},

	minify: {
		removeEmptyAttributes: false,
		collapseWhitespace: true,
		conservativeCollapse: true,
		collapseBooleanAttributes: true,
		removeTagWhitespace: false,
		removeStyleLinkTypeAttributes: true
	},

	/**
	 * Plugins
	 */
	plugins: [
		'~plugins/vue-filters.js',
		'~/plugins/i18n.js'
	],

	/**
	 * Modules
	 */
	modules: [
		// ['@nuxtjs/localtunnel', { subdomain: 'pkfinder' }],
		'@nuxtjs/manifest'
	],

	manifest: {
		name: 'ParkourFinder',
		lang: 'en'
	},

	/**
	 * Transition
	 */
	transition: {
		name: 'page',
		mode: 'out-in'
	},

	/*
	** Build configuration
	*/
	build: {
		/*
		** Run ESLINT on save
		*/
		extend (config, ctx) {
			if (ctx.dev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		},

		postcss: [
			require('autoprefixer')
		],

		vendor: [
			'axios',
			'moment',
			'vue-i18n'
		]
	}
}
