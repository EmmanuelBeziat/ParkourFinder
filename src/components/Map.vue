<template>
	<div id="map" class="pkf-map">
		<LMap ref="map" @ready="initMap" @locationfound="locationFound" @movestart="moveStart" :options="map.options">
			<LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<LMarkerClusterGroup :options="map.clusterOptions">
				<LMarker v-for="(spot, index) in spots" :key="index" :latlng="[spot.location.lat, spot.location.lng]" @click="showSpot(spot.slug)" />
			</LMarkerClusterGroup>
			<LMarker :latlng="user.position">
				<LIcon :options="map.userIcon" />
			</LMarker>
			<LCircle :latlng="user.position" :options="user.zone" />
		</LMap>

		<button class="btn btn--icon btn--map is-locked" v-if="map.fullyLoaded && !map.locked" @click="lockView()">
			<i class="icon-target" aria-hidden="true"></i>
			<span class="sr-only">{{ this.$store.state.languages.lang.map.toggle }}</span>
		</button>
	</div>
</template>

<script>
import Vue from 'vue'
import VueLeaflet from 'vue-leaflet'
import 'vue-leaflet/dist/vue-leaflet.css'

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
				locked: false,
				options: {
					attributionControl: false
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

	computed: {
		spots () {
			return this.$store.state.spots.spots
		},

		position () {
			return this.$store.state.position.coords
		},
	},

	methods: {
		initMap () {
			// let userZone = L.circle(this.user.currentPosition, 5).addTo(this.$refs.map.mapObject)
			// userMarker.setLatLng(this.user.currentPosition).addTo(this.$refs.map.mapObject)
			this.$refs.map.layer.locate({ watch: true, setView: false })
		},

		locationFound (e) {
			this.user.zone.radius = e.accuracy / 2
			this.user.position = [e.latlng.lat, e.latlng.lng]
			this.$store.commit('position/setPosition', { latitude: e.latlng.lat, longitude: e.latlng.lng })
			this.$refs.map.layer.setView(this.user.position, 14)
			this.map.fullyLoaded = true
		},

		showSpot (slug) {
			this.$router.push(`/spot/${slug}`)
		},

		moveStart () {
			this.map.locked = false
			this.$refs.map.layer.locate({ watch: true, setView: false })
		},

		lockView () {
			if (this.map.locked) {
				this.map.locked = false
				this.$refs.map.layer.locate({ watch: true, setView: false })
			}
			else {
				this.map.locked = true
				this.$refs.map.layer.flyTo([this.$store.state.position.coords.latitude, this.$store.state.position.coords.longitude], 15, { animate: true, duration: 1, noMoveStart: true })
				this.$refs.map.layer.locate({ watch: true, setView: true })
			}
		}
	}
}
</script>

<style lang="stylus">
.pkf-map
	flex 1

.leaflet-container
	height 100% !important
	max-width 100vw
	width 100vw
</style>

