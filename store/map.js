import axios from 'axios'

// const api = 'http://rest.parkourfinder.localhost/spots'
const api = 'http://localhost:3030/spots'

export const state = () => ({
	markers: null,
	map: null
})

export const mutations = {
	setMarkers (state, markers) {
		state.markers = markers
	},

	getMap (state, map) {
		state.map = map
	}
}

export const actions = {
	async init ({ commit }) {
		let { data } = await axios.get(api)
		commit('setMarkers', data)
	}
}
