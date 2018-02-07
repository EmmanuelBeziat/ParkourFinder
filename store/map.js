export const state = () => ({
	markers: null,
	map: null
})

export const mutations = {
	setMarkers(state, markers) {
		state.markers = markers
	},

	addMarker(state, marker) {
		state.markers.push(marker)
	},

	setMap(state, map) {
		state.map = map
	}
}

export const actions = {
	async init({ commit }) {
		let { data } = await this.$axios.get(process.env.api.spots)
		commit('setMarkers', data)
	}
}
