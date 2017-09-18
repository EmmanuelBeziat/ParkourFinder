<template>
	<gmap-map :center="center" :zoom="7">
		<gmap-marker
			v-for="(m, index) in markers"
			:key="index"
			:position="m.position"
			:clickable="true"
			:draggable="false"
			@click="showSpot(m.slug)">
		</gmap-marker>
	</gmap-map>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import geolocation from 'geolocation'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyDsALDNDN2jhM6JwLP39aVo3rnPyXw-C5A',
		librairies: 'places'
	}
})

export default {
	name: 'Map',

	data () {
		return {
			center: null,
			markers: [
				{
					'id': 1,
					'slug': 'perpignan-parking-arago',
					'name': 'Parking Arago',
					'position': {
						'lat': 42.6974956,
						'lng': 2.8920385
					},
					'description': 'Bla bla'
				},
				{
					'id': 2,
					'slug': 'perpignan-fontaine-rouge',
					'name': 'Fontaine Rouge',
					'position': {
						'lat': 42.7040423,
						'lng': 2.8919186
					},
					'description': 'Bla bla'
				}
			]
		}
	},

	/*
	asyncData () {
		console.log('nique ta mère')
		return axios.get('https://www.parkourfinder.com/markers.json')
			.then((res) => {
				return { markers: res.data }
			})
	},
	// */

	created () {
		this.setCenterMap()
	},

	methods: {
		setCenterMap () {
			if (process.BROWSER_BUILD && navigator.geolocation) {
				this.center = geolocation.getCurrentPosition(function (err, position) {
					if (err) throw err
					console.log(position)
				})
			} else {
				this.center = { lat: 42.6991088, lng: 2.8694822 }
			}
		},

		showSpot (slug) {
			this.$router.push('/spot/' + slug)
		}
	}
}
</script>

<style lang="stylus">
@require '~assets/styles/variables.styl'
@require '~assets/styles/mixins.styl'

.vue-map-container
	flex 1
	width 100vw
</style>
