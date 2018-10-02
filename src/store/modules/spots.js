import axios from 'axios'

// Initial state
const state = {
	spots: null,
	currentSpot: null
}

// Getters
const getters = {
	getSpotBySlug: (state) => (slug) => {
		return state.spots.find(spot => spot.slug === slug)
	},

	getSpotByID: (state) => (id) => {
		return state.spots.find(spot => spot._id === id)
	},

	getSpotsCount: (state) => {
		return state.spots.length
	}
}

// Actions
const actions = {
	async init ({ commit }) {
		let { data } = await axios.get('https://rest.parkourfinder.com/spots')
		commit('SET_SPOTS', data)
	},

	addSpot ({ commit }, spot) {
		commit('ADD_SPOT', spot)
	},

	removeSpot ({ commit }, index) {
		commit('REMOVE_SPOT', index)
	},

	setCurrentSpot ({ commit }, spot) {
		commit('SET_CURRENT_SPOT', spot)
	}
}

// Mutations
const mutations = {
	SET_SPOTS (state, spots) {
		state.spots = spots
	},

	SET_CURRENT_SPOT (state, spot) {
		state.currentSpot = spot
	},

	ADD_SPOT (state, spot) {
		state.spots.push(spot)
	},

	REMOVE_SPOT (state, spot) {
		state.spots.forEach((item, index) => {
			if (item['slug'] === spot.slug) {
				state.spots.splice(index, 1)
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
