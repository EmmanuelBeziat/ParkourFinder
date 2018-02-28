export const state = () => ({
	locale: 'en',
	lang: {}
})

export const mutations = {
	setLocale (state, locale) {
		state.locale = locale
	},

	setLang (state, lang) {
		state.lang = lang
	}
}

export const actions = {
	async nuxtServerInit ({ dispatch, commit, state }, { req }) {
		await dispatch('map/init')
		// await dispatch('position/init')

		try {
			// Get the first accepted language by the browser sending the request
			const userLang = process.BROWSER_BUILD
				? navigator.language
				: req.headers['accept-language'].split('-')[0]
			commit('setLocale', userLang)

			// Get content lang
			commit('setLang', require(`~/static/lang/${state.locale}.json`))
		} catch (error) {
			console.log(error)
		}
	}
}
