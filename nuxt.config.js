const pkg = require('./package')

module.exports = {
	mode: 'universal',

	buildDir: '../site',

	/*
	 ** Headers of the page
	 */
	head: {
		htmlAttrs: { lang: 'en', prefix: 'og: http://ogp.me/ns#' },
		title: '',
		titleTemplate: `ParkourFinder (alpha v${pkg.version}) — %s`,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
			{ name: 'description', content: pkg.description, hid: 'description' },
			{ name: 'application-name', content: 'Parkour Finder' },
			{ name: 'format-detection', content: 'telephone-no' },

			// Manifest
			{ name: 'google-site-verification', content: 'ftvkmQUTo3mElVv0FrEpFlnhpZZjyyPVEv49HAOua6w' },
			{ name: 'theme-color', content: '#bd1747' },
			{ name: 'mobile-web-app-capable', content: 'yes' },
			{ name: 'msapplication-TileColor', content: '#bb2b4d' },

			{ property: 'og:title', content: 'ParkourFinder', hid: 'og:title' },
			{ property: 'og:site_name', content: 'ParkourFinder' },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: 'https://www.parkourfinder.com', hid: 'og:url' },
			{ property: 'og:locale:alternate', content: 'en' },
			{ property: 'og:image', content: '', hid: 'og:image' },
			{ property: 'og:description', content: pkg.description, hid: 'og:description' },

			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
			{ name: 'apple-mobile-web-app-title', content: 'Parkour Finder' },
		],
		noScript: [
			{ innerHTML: 'Javascript est requis pour parcourir ce site.' }
		],
		link: [
			{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
			{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
			{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/android-chrome-192x192.png' },
			{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
			{ rel: 'manifest', href: '/favicons/manifest.json' },
			{ rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#bd1747' },
			{ rel: 'shortcut icon', href: '/favicons/favicon.ico' },
			{ rel: 'profile', href: 'http://gmpg.org/xfn/11' }
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
	plugins: [
		'~plugins/vue-filters.js',
		'~plugins/vue-modal.js',
		// { src: '~plugins/map.js', ssr: false }
	],

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
		// ['@nuxtjs/pwa', {}],
		// Doc: https://github.com/nuxt-community/modules/tree/master/packages/browserconfig
		['@nuxtjs/browserconfig', { TileColor: '#bb2b4d' }],
		// Doc: https://github.com/schlunsen/nuxt-leaflet
		'nuxt-leaflet'
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
	/*
	manifest: {
		name: 'ParkourFinder',
		theme_color: '#bb2b4d',
		background_color: '#bb2b4d'
	}, */

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
		extend (config, ctx) {
			if (!ctx.isDev) {
				publicPath: '../site/dist/'
			}

			/*
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			/*/
		}
	},

	postcss: [require('autoprefixer')],

	vendor: ['moment', 'vue-js-modal']
}
