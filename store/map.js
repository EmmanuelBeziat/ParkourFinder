/* import axios from 'axios'

const api = 'http://rest.parkourfinder.localhost/spots'
 */
export const state = () => ({
	markers: null
})

export const mutations = {
	init (state) {
		axios.get(api)
			.then((res) => {
				state.markers = res.data
			})
	}
}

export const actions = {
	init ({ commit }) {
		commit('init')
	}
}
