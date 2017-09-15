<template>
	<gmap-map :center="center" :zoom="7"></gmap-map>
</template>

<script>
import Vue from 'vue'
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
			center: null
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
				this.center = {lat: 0, lng: 0}
			}
		}
	}
}
</script>

<style lang="stylus">
.vue-map-container
	flex 1
	width 100vw
</style>
