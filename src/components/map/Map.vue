<template>
	<div id="map" class="pkf-map">
		<LMap ref="map" @ready="initMap" @locationfound="locationFound" :options="map.options">
			<LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<LMarkerClusterGroup :options="map.clusterOptions">
				<LMarker v-for="(spot, index) in spots" :key="index" :latlng="[spot.location.lat, spot.location.lng]" @click="showSpot(spot.slug)" />
			</LMarkerClusterGroup>
			<LMarker :latlng="user.position">
				<LIcon :options="map.userIcon" />
			</LMarker>
			<LCircle :latlng="user.position" :options="user.zone" />
		</LMap>

		<div class="leaflet-custom-control" v-if="map.fullyLoaded">
			<ButtonLeaflet @action="lockView()" :class="{ 'is-locked': map.locked }" :label="$store.state.languages.lang.map.toggle" icon="icon-target" />
			<ButtonLeaflet @action="fullScreen()" :class="{ 'is-locked': map.fullScreen }" :label="$store.state.languages.lang.map.toggle" icon="icon-resize-full" />
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import VueLeaflet from 'vue-leaflet'
import 'vue-leaflet/dist/vue-leaflet.css'

import ButtonLeaflet from '@/components/buttons/ButtonLeaflet'

Vue.use(VueLeaflet)

export default {
	name: 'Map',

	data () {
		return {
			user: {
				position: [0, 0],
				zone: {
					radius: 0,
					weight: 2,
					color: '#4090d9',
					dashArray: '8',
					fillOpacity: .5
				}
			},
			map: {
				fullyLoaded: false,
				fullScreen: false,
				locked: false,
				options: {
					attributionControl: false,
				},
				userIcon: {
					iconRetinaUrl: require('@/assets/img/map/user-icon-2x.png'),
					iconUrl: require('@/assets/img/map/user-icon.png'),
					shadowUrl: require('@/assets/img/map/user-shadow.png'),
					iconSize: [26, 26],
					shadowSize: [26, 26],
					shadowAnchor: [14, 10]
				},
				clusterOptions: {
					disableClusteringAtZoom: 13
				}
			}
		}
	},

	mounted () {
		this.$store.subscribe((mutation, state) => {
			let coords = this.$store.state.search.search
			if (mutation.type === 'search/setSearch' && coords !== null) {
				this.map.locked = false
				this.$refs.map.layer.locate({ watch: true, setView: false, enableHighAccuracy: true })
				this.$refs.map.layer.setView([coords.latlng.lat, coords.latlng.lng], 14)
			}
		})
	},

	components: {
		ButtonLeaflet,
	},

	computed: {
		spots () {
			return this.$store.state.spots.spots
		},

		position () {
			return this.$store.state.position.coords
		},
	},

	methods: {
		/**
		 * Init Leaflet map with basic settings
		 */
		initMap () {
			this.$refs.map.layer.locate({ watch: true, setView: false, enableHighAccuracy: true })
		},

		/**
		 * Event fired when Leaflet location has finished
		 * @param e { Event }
		 */
		locationFound (e) {
			this.user.zone.radius = e.accuracy / 2
			this.user.position = [e.latlng.lat, e.latlng.lng]
			this.$store.dispatch('position/setPosition', { latitude: e.latlng.lat, longitude: e.latlng.lng })

			// Fires only the first time
			if (!this.map.fullyLoaded) {
				this.$refs.map.layer.setView(this.user.position, 15)
				this.map.fullyLoaded = true
			}
		},

		/**
		 * Go to the selected spot
		 * @param slug { String } spot slug url
		 */
		showSpot (slug) {
			this.$router.push(`/spot/${slug}`)
		},

		/**
		 * Lock or unlock the map on user's position
		 */
		lockView () {
			if (this.map.locked) {
				this.map.locked = false
				this.$refs.map.layer.locate({ watch: true, setView: false, enableHighAccuracy: true })
			}
			else {
				this.map.locked = true
				this.$refs.map.layer.locate({ watch: true, setView: true, enableHighAccuracy: true })
				this.$refs.map.layer.flyTo([this.$store.state.position.coords.latitude, this.$store.state.position.coords.longitude])
			}
		},

		/**
		 * Enable / Disable fullscreen
		 */
		fullScreen () {
			const doc = window.document
			const docEl = doc.documentElement

			const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
			const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

			if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
				requestFullScreen.call(docEl)
				this.map.fullScreen = true
			}
			else {
				cancelFullScreen.call(doc)
				this.map.fullScreen = false
			}
		},
	}
}
</script>

<style lang="stylus">
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.pkf-map
	flex 1

.leaflet-container
	height 100% !important
	max-width 100vw
	width 100vw

.leaflet-top.leaflet-left
	left auto
	top auto
	right 0
	bottom 0 !important

	.leaflet-control
		margin 0 10px 10px 0

.leaflet-custom-control
	border 2px solid rgba(0, 0, 0, 0.2)
	bottom 5rem
	right 10px
	position fixed
	z-index 410
	border-radius 4px
	overflow hidden

.leaflet-control
	line-height rem(30px)
	font-size rem(18px)
	text-align center
	padding 0
	background none
	cursor pointer
	overflow hidden
	outline 0
	border 0
	background #fff
	color var(--color-text)

	i
		size rem(30px)
		display block

	&:hover
		background #f4f4f4
		color var(--color-text)

	&.is-locked
		background var(--color-primary)
		color var(--color-background)
		&:hover
			background var(--color-primary-alt)
			color var(--color-background)

	& + .leaflet-control
		border-top 1px solid #ccc

</style>

