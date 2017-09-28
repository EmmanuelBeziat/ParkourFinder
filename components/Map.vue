<template>
	<gmap-map :center="center" :zoom="14">
		<gmap-marker
			v-for="(marker, index) in markers"
			:key="index"
			:position="makeCoords(marker.position_lat, marker.position_lng)"
			:clickable="true"
			:draggable="false"
			@click="showSpot(marker.id, marker.slug, marker.position)">
		</gmap-marker>
	</gmap-map>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import geolocation from 'geolocation'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'

// import { mapMutations } from 'vuex'

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
			center: null
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

		makeCoords (lat, lng) {
			return { lat: parseFloat(lat), lng: parseFloat(lng) }
		},

		showSpot (id, slug, position) {
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
