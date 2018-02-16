<template>
	<div class="vue-map-container">
		<no-ssr>
			<v-map ref="map" :zoom="zoom" :center="center">
				<v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></v-tilelayer>
				<v-marker-cluster :options="clusterOptions">
					<v-marker
						v-for="(marker, index) in markers"
						:key="index"
						:lat-lng="makeCoords(marker.location.lat, marker.location.lng)"
						v-on:l-click="showSpot(marker._id, marker.slug, marker.location.lat, marker.location.lng)">
					</v-marker>
				</v-marker-cluster>
			</v-map>
		</no-ssr>
	</div>
</template>

<script>
let Vue2Leaflet = {}
let Vue2LeafletMarkerCluster = {}

if (process.browser) {
	L = require('leaflet')
	Vue2Leaflet = require('vue2-leaflet')
	Vue2LeafletMarkerCluster = require('vue2-leaflet-markercluster')

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
			zoom: 5,
			clusterOptions: {
				disableClusteringAtZoom: 13
			}
		}
	},

	components: {
		'v-map': Vue2Leaflet.Map,
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
				navigator.geolocation.watchPosition(success, error, { enableHighAccuracy: true })
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
</style>
