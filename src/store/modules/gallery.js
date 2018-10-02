// Initial state
const state = {
	images: [],
	index: null,
}

// Getters
const getters = {
	count: state => {
		return state.images.length
	},

	images: state => {
		return state.images
	},

	index: state => {
		return state.index
	}
}

// Actions
const actions = {
	addImage ({ commit }, url) {
		commit('ADD_IMAGE', url)
	},

	open ({ commit }, index) {
		commit('OPEN', index)
	},

	close ({ commit }) {
		commit('CLOSE')
	},

	previousImage ({ commit }) {
		commit('PREVIOUS_IMAGE')
	},

	nextImage ({ commit }) {
		commit('NEXT_IMAGE')
	},

	resetList ({ commit }) {
		commit('RESET_LIST')
	}
}

// Mutations
const mutations = {
	ADD_IMAGE (state, url) {
		state.images.push(url) - 1
	},

	OPEN (state, index) {
		state.index = index
	},

	CLOSE (state) {
		state.index = null
	},

	RESET_LIST (state) {
		state.images = []
	},

	PREVIOUS_IMAGE (state) {
		state.index--

		if (state.index < 0) {
			state.index = state.images.length - 1
		}
	},

	NEXT_IMAGE (state) {
		state.index++

		if (state.index >= state.images.length) {
			state.index = 0
		}
	}
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
