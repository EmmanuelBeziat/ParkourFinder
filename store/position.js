export const state = () => ({
	coords: null,
	infos: null,
})

export const mutations = {
	setPosition (state, position) {
		state.coords = position
	},

	setInfos (state, infos) {
		state.infos = infos
	}
}
