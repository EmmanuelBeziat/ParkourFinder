<template>
	<div class="vue-map-container">
		<no-ssr>
			<v-map ref="map" :zoom="zoom" :center="center" v-on:l-zoomstart="toggleWatchPosition(true)" v-on:l-movestart="toggleWatchPosition(true)">
				<v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></v-tilelayer>
				<v-marker-cluster :options="clusterOptions">
					<v-marker
						v-for="(marker, index) in markers"
						:key="index"
						:lat-lng="makeCoords(marker.location.lat, marker.location.lng)"
						v-on:l-click="showSpot(marker._id, marker.slug, marker.location.lat, marker.location.lng)">
					</v-marker>
				</v-marker-cluster>
				<!-- <v-ais :lat-lng="center" :options="trackerOptions"></v-ais> -->
			</v-map>
		</no-ssr>

		<button v-if="!followUser" class="btn btn--icon btn--map" @click="toggleWatchPosition()">
			<i class="icon-target"></i><span class="sr-only">{{ this.$store.state.lang.map.toggle }}</span>
		</button>
	</div>
</template>

<script>
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
			center: [42.6991088, 2.8694822],
			zoom: 6,
			followUser: false,
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
		this.setCenterMap()
	},

	methods: {
		/**
		 * Define the center position of the map if geolocation is available or not
		 */
		setCenterMap () {
			let that = this

			function success (position) {
				that.center = that.makeCoords(
					position.coords.latitude,
					position.coords.longitude
				)
				that.zoom = 14
				that.$store.commit('position/setPosition', position.coords)
			}

			function error (error) {
				console.log(`Error ${error.code}: ${error.message}`)
			}

			if (process.browser && 'geolocation' in navigator) {
				if (this.followUser) {
					this.watcher = navigator.geolocation.watchPosition(success, error, { enableHighAccuracy: true })
				}
				else {
					navigator.geolocation.clearWatch(this.watcher)
					this.watcher = null
					navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true })
				}
			} else {
				this.center = { lat: 0, lng: 0 }
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
			this.$router.push('/spot/' + slug)
		},

		/**
		 * Toggle watch position
		 */
		toggleWatchPosition (value = false) {
			if (value) {
				this.followUser = false
			}
			else {
				this.followUser = this.followUser === true ? false : true
			}
			this.setCenterMap()
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
