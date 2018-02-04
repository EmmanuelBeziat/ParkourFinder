const api = 'https://rest.parkourfinder.com/spots'

export const state = () => ({
	markers: null,
	map: null
})

export const mutations = {
	setMarkers(state, markers) {
		state.markers = markers
	},

	setMap(state, map) {
		state.map = map
	}
}

export const actions = {
	async init({ commit }) {
		let { data } = await this.$axios.get(api)
		commit('setMarkers', data)
	}
}
