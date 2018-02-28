<template>
	<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.newspot" @click="newspot()">
		<i class="icon-location" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.newspot }}</div>
	</button>
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
	name: 'AddSpot',

	data () {
		return {
			modal: {},
			geolocation: false
		}
	},

	created () {
		this.modal = this.$modal
		this.geolocation = process.browser && 'geolocation' in navigator
	},

	computed: {
		position () { return this.$store.state.position.coords }
	},

	methods: {
		newspot () {
			const that = this

			if (this.geolocation) {
				that.getCurrentPosition()
				/*
				that.$modal.show('dialog', {
					title: that.$store.state.lang.modal.newspot.success.title,
					text: that.$store.state.lang.modal.newspot.success.description,
					buttons: [
						{ title: that.$store.state.lang.modal.newspot.success.buttons[0], handler: () => { this.setMarkerAuto() } },
						// { title: that.$store.state.lang.modal.newspot.success.buttons[1], handler: () => { this.setMarkerManually() } },
						{ title: that.$store.state.lang.modal.newspot.success.buttons[2] }
					]
				})
				*/
				that.setMarkerAuto()
			}

			else {
				that.$modal.show('dialog', {
					title: that.$store.state.lang.modal.newspot.error.title,
					text: that.$store.state.lang.modal.newspot.error.description,
					buttons: [
						{ title: that.$store.state.lang.modal.newspot.error.buttons[0], handler: () => { this.setMarkerManually() } },
						{ title: that.$store.state.lang.modal.newspot.error.buttons[1] }
					]
				})
			}
		},

		setMarkerManually () {
			alert('manuel')
		},

		setMarkerAuto () {
			this.$modal.hide('dialog')
			this.$modal.show('new-spot')
		},

		getCurrentPosition () {
			const that = this
			this.getCity(that.$store.state.position.coords.latitude, that.$store.state.position.coords.longitude).then((datas) => {
				this.$store.commit('position/setInfos', { city: datas.city , country: datas.country, countryCode: datas.countryCode})
			})
		},

		/**
		 * Get informations about city and country from Google Maps
		 * @param lat latitude coord
		 * @param lng longitude coord
		 * TODO: Change google map for a lighter service
		 */
		getCity (lat, lng) {
			return new Promise((resolve, reject) => {
				let latlng = new google.maps.LatLng(lat, lng)
				new google.maps.Geocoder().geocode({ 'latLng': latlng }, function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							let country = null
							let countryCode = null
							let city = null
							let c
							let lc
							let component

							for (let r = 0, rl = results.length; r < rl; r += 1) {
								let result = results[r]

								if (!city && result.types[0] === 'locality') {
									for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
										component = result.address_components[c]

										if (component.types[0] === 'locality') {
											city = component.long_name
											break
										}
									}
								}
								else if (!country && result.types[0] === 'country') {
									country = result.address_components[0].long_name
									countryCode = result.address_components[0].short_name
								}

								if (city && country) {
									break
								}
							}

							resolve({
								city: city,
								country: country,
								countryCode: countryCode
							})
						}
						else {
							reject(google.maps.GeocoderStatus)
						}
					}
				})
			})
		}
	}
}
</script>
