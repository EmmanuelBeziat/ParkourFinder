// Initial state
const state = {
	images: null,
	index: null,
}

const getters = {
	count: state => {
		return images.length
	}
}

// Mutations
const mutations = {
	addImages (state, url) {
		return state.images.push(url) - 1
	},

	open (index) {
		this.state.index = index
	},

	close () {
		this.state.index = null
	},

	prev () {
		this.state.index--

		if (this.state.index < 0) {
			this.state.index = this.state.images.length - 1
		}
	},

	next () {
		this.state.index++

		if (this.state.index >= this.state.images.length) {
			this.state.index = 0
		}
	}
}

const actions = {

}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
