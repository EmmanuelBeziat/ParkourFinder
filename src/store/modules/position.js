// Initial state
const state = {
	coords: null,
	infos: null,
}

// Getters
const getters = {
	getMapView: state => {
		return state.mapView
	}
}

// Actions
const actions = {
	setPosition ({ commit }, position) {
		commit('SET_POSITION', position)
	},

	setInfos ({ commit }, infos) {
		commit('SET_INFOS', infos)
	},

	setMapView ({ commit }, coords) {
		commit('SET_MAP_VIEW', coords)
	}
}

// Mutations
const mutations = {
	SET_POSITION (state, position) {
		state.coords = position
	},

	SET_INFOS (state, infos) {
		state.infos = infos
	},

	SET_MAP_VIEW (state, coords) {
		state.mapView = coords
	}
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
