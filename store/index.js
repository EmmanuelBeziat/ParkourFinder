export const state = () => ({
	locale: 'en'
})

export const mutations = {
	setLang (state, locale) {
		state.locale = locale
	}
}

export const actions = {
	async nuxtServerInit ({ dispatch, commit }, { req }) {
		await dispatch('map/init')

		try {
			// Get the first accepted language by the browser sending the request
			commit('setLang', req.headers['accept-language'].split('-')[0])
		}
		catch (error) {
			console.log(error)
		}
	}
}
