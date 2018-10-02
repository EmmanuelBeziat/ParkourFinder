// Initial state
const state = {
	search: null,
}

// Getters
const getters = {}

// Actions
const actions = {
	setSearch ({ commit }, search) {
		commit('SET_SEARCH', search)
	}
}

// Mutations
const mutations = {
	SET_SEARCH (state, search) {
		state.search = search
	},
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
