// Initial state
const state = {
	coords: null,
	infos: null,
}

const getters = {}

// Mutations
const mutations = {
	setPosition (state, position) {
		state.coords = position
	},

	setInfos (state, infos) {
		state.infos = infos
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations
}
