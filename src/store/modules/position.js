// Initial state
const state = {
	coords: null,
	infos: null,
}

const getters = {
	getMapView: state => {
		return state.mapView
	}
}

// Mutations
const mutations = {
	setPosition (state, position) {
		state.coords = position
	},

	setInfos (state, infos) {
		state.infos = infos
	},

	setMapView (state, coords) {
		state.mapView = coords
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations
}
