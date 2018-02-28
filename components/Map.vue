<template>
	<div class="vue-map-container">
		<no-ssr>
			<v-map ref="map" :zoom="mapZoomLevel" :center="mapPosition" v-on:l-zoomstart="toggleWatchPosition(true)" v-on:l-movestart="toggleWatchPosition(true)">
				<v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></v-tilelayer>
				<v-marker-cluster :options="clusterOptions">
					<v-marker
						v-for="(marker, index) in markers"
						:key="index"
						:lat-lng="makeCoords(marker.location.lat, marker.location.lng)"
						v-on:l-click="showSpot(marker._id, marker.slug, marker.location.lat, marker.location.lng)">
					</v-marker>
				</v-marker-cluster>
				<!-- <v-ais :lat-lng="mapPosition" :options="trackerOptions"></v-ais> -->
			</v-map>
		</no-ssr>

		<button v-if="!followUserPosition" class="btn btn--icon btn--map" @click="toggleWatchPosition()">
			<i class="icon-target"></i><span class="sr-only">{{ this.$store.state.lang.map.toggle }}</span>
		</button>
	</div>
</template>

<script>
/**
 * Leaflet can only be loaded on client side
 */
let Vue2Leaflet = {}
let Vue2LeafletMarkerCluster = {}
let Vue2LeafletTracksymbol = {}

if (process.browser) {
	L = require('leaflet')
	Vue2Leaflet = require('vue2-leaflet')
	Vue2LeafletMarkerCluster = require('vue2-leaflet-markercluster')
	Vue2LeafletTracksymbol = require('vue2-leaflet-tracksymbol')

	// eslint-disable-next-line
	delete L.Icon.Default.prototype._getIconUrl

	// eslint-disable-next-line
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: require('~/assets/img/map/marker-icon-2x.png'),
		iconUrl: require('~/assets/img/map/marker-icon.png'),
		shadowUrl: require('~/assets/img/map/marker-shadow.png')
	})
}

export default {
	name: 'Map',
	data () {
		return {
			mapPosition: [42.6991088, 2.8694822],
			mapZoomLevel: 6,
			followUserPosition: false,
			watcher: null,
			clusterOptions: {
				disableClusteringAtZoom: 13
			},
			trackerOptions: {}
		}
	},

	components: {
		'v-map': Vue2Leaflet.Map,
		'v-ais': Vue2LeafletTracksymbol,
		'v-marker': Vue2Leaflet.Marker,
		'v-tilelayer': Vue2Leaflet.TileLayer,
		'v-marker-cluster': Vue2LeafletMarkerCluster
	},

	computed: {
		markers () {
			return this.$store.state.map.markers
		},

		position () {
			return this.$store.state.position.coords
		}
	},

	created () {
		this.setMapCenter()
	},

	methods: {
		/**
		 * Define the center position of the map if geolocation is available or not
		 */
		setMapCenter () {
			let that = this

			/**
			 * Store the current position location
			 * Set map position and zoom level
			 */
			function geolocationSuccess (position) {
				that.mapPosition = that.makeCoords(
					position.coords.latitude,
					position.coords.longitude
				)
				that.mapZoomLevel = 14
				that.$store.commit('position/setPosition', position.coords)
			}

			/**
			 * show error modal when geolocation couldn't happen
			 */
			function geolocationError (error) {
				this.$modal.show('dialog', {
					title: this.$store.state.lang.modal.error.title,
					text: `${this.$store.state.lang.modal.error.text}\n\n${error.code}: ${error.message}`,
					buttons: [
						{ title: this.$store.state.lang.modal.error.buttons[0] }
					]
				});
			}

			/**
			 * Check if geolocation from browser is available
			 * If not, set a default position
			 */
			if (process.browser && 'geolocation' in navigator) {
				if (this.followUserPosition) {
					this.watcher = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, { enableHighAccuracy: true })
				}
				else {
					navigator.geolocation.clearWatch(this.watcher)
					this.watcher = null
					navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, { enableHighAccuracy: true })
				}
			} else {
				this.mapPosition = { lat: 0, lng: 0 }
			}
		},

		/**
		 * Format valid coords for Google Maps
		 * @param lat latitude coord
		 * @param lng longitude coord
		 */
		makeCoords (lat, lng) {
			return { lat: parseFloat(lat), lng: parseFloat(lng) }
		},

		/**
		 * Open the page linked to a marker
		 * @param id id of the current spot
		 * @param slug slug of the current spot — used for the url
		 * @param lat latitude coord
		 * @param lng longitude coord
		 */
		showSpot (id, slug, lat, lng) {
			// this.mapPosition = this.makeCoords(lat, lng)
			this.$router.push(`/spot/${slug}`)
		},

		/**
		 * Toggle watch position
		 * @param stopWatchingUserPosition (default: false)
		 */
		toggleWatchPosition (stopWatchingUserPosition = false) {
			if (stopWatchingUserPosition) {
				this.followUserPosition = false
			}
			else {
				this.followUserPosition = this.followUserPosition === true ? false : true
			}
			this.setMapCenter()
		}
	}
}
</script>

<style lang="stylus">
@require '~assets/styles/variables.styl'
@require '~assets/styles/mixins.styl'

@import "leaflet/dist/leaflet.css"
@import "leaflet.markercluster/dist/MarkerCluster.Default.css"

.vue-map-container
	flex 1
	width 100vw

.leaflet-top
.leaflet-bottom
.leaflet-right
.leaflet-left
	z-index 400
</style>
