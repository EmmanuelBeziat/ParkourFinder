export const state = () => ({
	markers: null
})

export const mutations = {
	setMarkers(state, markers) {
		state.markers = markers
	},

	addMarker(state, marker) {
		state.markers.push(marker)
	}
}

export const actions = {
	async init({ commit }) {
		let { data } = await this.$axios.get(process.env.api.spots)
		commit('setMarkers', data)
	}
}
