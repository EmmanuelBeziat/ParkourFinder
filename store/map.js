/* import axios from 'axios'

const api = 'http://rest.parkourfinder.localhost/spots'
 */
export const state = () => ({
	markers: [
		{
			'id': 1,
			'slug': 'perpignan-arago',
			'position_lat': '42.6980979',
			'position_lng': '2.8918932',
			'name': 'Parking Arago',
			'description': 'Description Arago',
			'pictures': null,
			'thumbnail': null,
			'team': 1
		},
		{
			'id': 2,
			'slug': 'perpignan-poste',
			'position_lat': '42.697172',
			'position_lng': '2.8888037',
			'name': 'La Poste',
			'description': 'Description la poste',
			'pictures': null,
			'thumbnail': null,
			'team': 1
		},
		{
			'id': 3,
			'slug': 'perpignan-fnac',
			'position_lat': '42.697606',
			'position_lng': '2.8873337',
			'name': 'Barres bleues Fnac',
			'description': 'Description Fnac',
			'pictures': null,
			'thumbnail': null,
			'team': 1
		},
		{
			'id': 4,
			'slug': 'perpignan-castillet',
			'position_lat': '42.701939',
			'position_lng': '2.8938517',
			'name': 'Castillet',
			'description': 'Description castillet',
			'pictures': null,
			'thumbnail': null,
			'team': 1
		},
		{
			'id': 5,
			'slug': 'perpignan-p1',
			'position_lat': '42.702505',
			'position_lng': '2.8947117',
			'name': 'P1',
			'description': 'Description P1',
			'pictures': null,
			'thumbnail': null,
			'team': 1
		},
		{
			'id': 6,
			'slug': 'perpignan-fontaine-rouge',
			'position_lat': '42.704083',
			'position_lng': '2.8908299',
			'name': 'Fontaine Rouge',
			'description': 'Description fontainge rouge',
			'pictures': null,
			'thumbnail': null,
			'team': 1
		},
		{
			'id': 7,
			'slug': 'perpignan-place-theatre',
			'position_lat': '42.70225',
			'position_lng': '2.8901487',
			'name': 'Place Théatre',
			'description': 'Description place theatre',
			'pictures': null,
			'thumbnail': null,
			'team': 1
		}
	]
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
