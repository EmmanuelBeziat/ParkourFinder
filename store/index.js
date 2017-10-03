export const state = () => ({
	locales: ['en', 'fr'],
	locale: 'fr',
	lang: {}
})

export const mutations = {
	SET_LANG (state, locale) {
		if (state.locales.indexOf(locale) !== -1) {
			state.locale = locale
		}
	}
}

export const actions = {
	async nuxtServerInit ({ dispatch }, { req }) {
		await dispatch('map/init')
	}
}
