/* import axios from 'axios'

const api = 'http://rest.parkourfinder.localhost/spots'
 */
export const state = () => ({
	markers: ['pouet']
})

export const mutations = {
	/* init (state) {
		axios.get(api)
			.then((res) => {
				state.markers = res.data
			})
	}, */

	init (state, data) {
		state.markers = data
	}
}
