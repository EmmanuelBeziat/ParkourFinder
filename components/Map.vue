<template>
	<gmap-map :center="center" :zoom="14">
		<gmap-cluster :maxZoom="12">
			<gmap-marker
				v-for="(marker, index) in markers"
				:key="index"
				:position="makeCoords(marker.position_lat, marker.position_lng)"
				:clickable="true"
				:draggable="false"
				@click="showSpot(marker.id, marker.slug, marker.position_lat, marker.position_lng)">
			</gmap-marker>
		</gmap-cluster>
	</gmap-map>
</template>

<script>
import Vue from 'vue'
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
			center: { lat: 42.6991088, lng: 2.8694822 }
		}
	},

	computed: {
		markers () {
			return this.$store.state.map.markers
		}
	},

	created () {
		this.setCenterMap()
	},

	methods: {
		/**
		 * Define the center position of the map if geolocation is available or not
		 */
		setCenterMap () {
			let that = this

			function sucess (position) {
				that.center = that.makeCoords(position.coords.latitude, position.coords.longitude)
			}

			function error (error) {
				console.log(`Error ${error.code}: ${error.message}`)
			}

			if (process.browser && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(sucess, error)
			}
			else {
				this.center = { lat: 42.6991088, lng: 2.8694822 }
			}
		},

		/**
		 * Format valid coords for Google Maps
		 */
		makeCoords (lat, lng) {
			return { lat: parseFloat(lat), lng: parseFloat(lng) }
		},

		/**
		 * Open the page linked to a marker
		 */
		showSpot (id, slug, lat, lng) {
			// this.center = this.makeCoords(lat, lng)
			this.$router.push('/spot/' + id + '-' + slug)
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
