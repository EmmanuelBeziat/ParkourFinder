import axios from 'axios'

const api = 'http://rest.parkourfinder.localhost/spots'

export const state = () => ({
	markers: null
})

export const mutations = {
	setMarkers (state, markers) {
		state.markers = markers
	}
}

export const actions = {
	async init ({ commit }) {
		let { data } = await axios.get(api)
		commit('setMarkers', data)
	}
}
