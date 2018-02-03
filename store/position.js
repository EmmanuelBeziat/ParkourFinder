export const state = () => ({
	coords: null
})

export const mutations = {
	setPosition(state, position) {
		state.coords = position
	}
}
