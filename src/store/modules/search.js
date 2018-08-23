// Initial state
const state = {
	search: null,
}

const getters = {}

// Mutations
const mutations = {
	setSearch (state, search) {
		state.search = search
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations
}
