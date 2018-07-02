<template>
	<div class="vue-map-container">
		<no-ssr>
			<l-map ref="map" :zoom="leafmap.zoom" :center="leafmap.center">
				<l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
				<!-- <l-marker key="user" :lat-lng="user.currentPosition" :icon="user.icon"></l-marker> -->
				<l-marker-cluster :options="clusterOptions">
					<l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="makeCoords(marker.location.lat, marker.location.lng)" @click="showSpot(marker._id, marker.slug, marker.location.lat, marker.location.lng)"></l-marker>
				</l-marker-cluster>
			</l-map>
		</no-ssr>

		<button class="btn btn--icon btn--map" v-bind:class="{'is-locked': leafmap.locked }" @click="lockView()">
			<i class="icon-target"></i>
			<span class="sr-only">{{ this.$store.state.lang.map.toggle }}</span>
		</button>
	</div>
</template>

<script>
if (process.browser) {
	const L = require('leaflet')
}

export default {
	name: 'Map',
	data () {
		return {
			user: {
				currentPosition: this.makeCoords(0, 0),
				icon: null
			},
			leafmap: {
				center: [48.866667, 2.333333],
				zoom: 6,
				locked: false
			},
			clusterOptions: {
				disableClusteringAtZoom: 13
			},
		}
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
		this.setUserPosition()
		this.setMapCenter()
	},

	methods: {
		/**
		 * Set users's cursor position
		 */
		setUserPosition () {
			this.getUserPosition(true, { enableHighAccuracy: true })
				.then(position => {
					if (position.coords) {
						this.user.icon = L.icon({
							iconRetinaUrl: require('~/assets/img/map/user-icon-2x.png'),
							iconUrl: require('~/assets/img/map/user-icon.png'),
							iconSize: [26, 26],
							shadowUrl: require('~/assets/img/map/user-shadow.png'),
							shadowSize: [26, 26],
							shadowAnchor: [14, 10]
						})
						let userMarker = L.marker(this.user.currentPosition, {
							icon: this.user.icon,
							zIndexOffset: 1000
						})
						let userZone = L.circle(this.user.currentPosition, 5).addTo(this.$refs.map.mapObject)
						this.$refs.map.mapObject.on('locationfound', (e) => {
							userMarker.setLatLng(e.latlng)
							userZone.setLatLng(e.latlng)
							userZone.setRadius(e.accuracy / 2)
							this.user.currentPosition = this.makeCoords(e.latlng.lat, e.latlng.lng)
							this.$store.commit('position/setPosition', { latitude: e.latlng.lat, longitude: e.latlng.lng })
						})
						this.$refs.map.mapObject.locate({ watch: true, setView: false })
						userMarker.setLatLng(this.user.currentPosition).addTo(this.$refs.map.mapObject)
					}
					else {
						console.log('Geolocation is not supported by this browser.')
					}
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.$store.state.lang.modal.spot.geolocation.error.title,
						text: `${this.$store.state.lang.modal.spot.geolocation.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [
							{ title: this.$store.state.lang.modal.spot.geolocation.error.buttons.close }
						]
					})
				})
		},

		/**
		 * Change the map position and zoom
		 */
		setMapCenter () {
			this.getUserPosition(false, { enableHighAccuracy: true })
				.then(position => {
					if (position.coords) {
						this.leafmap.center = this.makeCoords(position.coords.latitude, position.coords.longitude)
						this.leafmap.zoom = 14
					}
					else {
						this.leafmap.center = this.makeCoords(48.866667, 2.333333)
						this.leafmap.zoom = 6
						console.log('Geolocation is not supported by this browser.')
					}
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.$store.state.lang.modal.spot.geolocation.error.title,
						text: `${this.$store.state.lang.modal.spot.geolocation.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [
							{ title: this.$store.state.lang.modal.spot.geolocation.error.buttons.close }
						]
					})
				})
		},

		/**
		 * Get user's location by geolocation
		 * @param watcher { boolean } if set to true, use watchPosition instead of getCurrentPosition
		 * @param options { object } settings for navigator.geolocation methods
		 */
		getUserPosition (watcher, options) {
			if (process.browser && 'geolocation' in navigator) {
				if (watcher === true) {
					return new Promise((resolve, reject) => {
						navigator.geolocation.watchPosition(resolve, reject, options)
					})
				}
				else {
					return new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(resolve, reject, options)
					})
				}
			}
			else {
				return new Promise(
					resolve => resolve({})
				)
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
			this.$router.push(`/spot/${slug}`)
		},

		/**
		 * Bring back the map to current user position and enable the view following user position
		 */
		lockView () {
			if (this.leafmap.locked) {
				this.leafmap.locked = false
				this.$refs.map.mapObject.locate({ watch: true, setView: true })
			}
			else {
				this.leafmap.locked = true
				this.$refs.map.mapObject.flyTo([this.$store.state.position.coords.latitude, this.$store.state.position.coords.longitude])
				this.$refs.map.mapObject.locate({ watch: true, setView: false })
			}
		}
	}
}
</script>

<style lang="stylus">
@require '~assets/styles/variables.styl'
@require '~assets/styles/mixins.styl'
@import 'leaflet/dist/leaflet.css'
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

.vue-map-container
	flex 1
	width 100vw

.leaflet-top
.leaflet-bottom
.leaflet-right
.leaflet-left
	z-index 400
</style>
