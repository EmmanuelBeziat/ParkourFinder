const pkg = require('./package')

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
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content:
					'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no'
			},
			{
				hid: 'description',
				name: 'description',
				content: 'A tiny app to help locate and share parkour spots'
			},
			{ name: 'apple-mobile-web-app-title', content: 'ParkourFinder' },
			{ name: 'application-name', content: 'ParkourFinder' },
			{
				name: 'msapplication-config',
				content: '/favicons/browserconfig.xml'
			},
			{ name: 'theme-color', content: '#bd1747' }
		],
		noScript: [
			{ innerHTML: 'Javascript est requis pour parcourir ce site.' }
		],
		link: [
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/favicons/apple-touch-icon.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicons/favicon-32x32.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '192x192',
				href: '/favicons/android-chrome-192x192.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicons/favicon-16x16.png'
			},
			{ rel: 'manifest', href: '/favicons/manifest.json' },
			{
				rel: 'mask-icon',
				href: '/favicons/safari-pinned-tab.svg',
				color: '#bd1747'
			},
			{ rel: 'shortcut icon', href: '/favicons/favicon.ico' }
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
		'@nuxtjs/axios'
		// Doc: https://www.npmjs.com/package/@nuxtjs/localtunnel
		// ['@nuxtjs/localtunnel', { subdomain: 'pkfinder' }],
	],

	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},

	/*
	 ** Proxy module configuration
	 */
	proxy: {
		/*
		'/api/': {
			target: 'https://rest.parkourfinder.com',
			pathRewrite: { '^/api/': '' }
		}
		*/
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
				})
			}
		}
	},

	postcss: [require('autoprefixer')],

	vendor: ['moment', 'vue-js-modal']
}
