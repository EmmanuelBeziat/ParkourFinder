import axios from 'axios'

const api = 'http://rest.parkourfinder.localhost/spots'

export const state = () => ({
	markers: []
})

export const mutations = {
	loadData (state) {
		axios.get(api)
			.then((res) => {
				state.markers = res.data
			})
	}
}

export const actions = {
	init ({ commit }) {
		commit('loadData')
	}
}
