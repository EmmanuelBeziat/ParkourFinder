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
}

// Actions
const actions = {
	async init ({ commit }) {
		let { data } = await axios.get('https://rest.parkourfinder.com/spots')
		commit('setSpots', data)
	}
}

// Mutations
const mutations = {
	setSpots (state, spots) {
		state.spots = spots
	},

	setCurrentSpot (state, spot) {
		state.currentSpot = spot
	},

	addSpot (state, spot) {
		console.log(spot)
		state.spots.push(spot)
	},

	removeSpot (state, spot) {
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
