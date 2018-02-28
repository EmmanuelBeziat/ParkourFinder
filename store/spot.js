export const state = () => ({
	currentSpot: null
})

export const mutations = {
	setCurrentSpot (state, spot) {
		state.currentSpot = spot
	}
}
