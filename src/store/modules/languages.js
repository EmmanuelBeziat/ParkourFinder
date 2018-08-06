// Initial state
const state = {
	locale: 'en',
	lang: null
}

// Getters
const getters = {}

// Actions
const actions = {
	async init ({ commit }) {
		const lang = navigator.language.split('-')[0].split(',')[0]

		commit('setLocale', lang)
		commit('setLang', require(`@/assets/lang/${lang}.json`))
	}
}

// Mutations
const mutations = {
	setLocale (state, locale) {
		state.locale = locale
	},

	setLang (state, lang) {
		state.lang = lang
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}