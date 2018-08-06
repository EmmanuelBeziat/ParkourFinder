<template>
	<button class="btn btn--icon" :data-tooltip="this.$store.state.languages.lang.site.nav.newspot" @click="addSpotManager()">
		<i class="icon-location" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.languages.lang.site.nav.newspot }}</div>
	</button>
</template>

<script>
import Vue from 'vue'

export default {
	name: 'AddSpot',

	data () {
		return {
			modal: {},
		}
	},

	created () {
		// this.modal = this.$modal
	},

	computed: {
		position () { return this.$store.state.position.coords }
	},

	methods: {
		/**
		 * Select the method to add a new spot
		 */
		addSpotManager () {

			if (navigator.geolocation) {
				this.getCurrentPosition()

				this.$modal.show('dialog', {
					title: this.$store.state.languages.lang.modal.spot.add.success.title,
					text: this.$store.state.languages.lang.modal.spot.add.success.description,
					buttons: [
						{ title: this.$store.state.languages.lang.modal.spot.add.success.buttons[0], handler: () => { this.addSpotWithGeolocation() } },
						// { title: this.$store.state.languages.lang.modal.spot.add.success.buttons[1], handler: () => { this.addSpotManually() } },
						{ title: this.$store.state.languages.lang.modal.spot.add.success.buttons[2] }
					]
				})
				this.addSpotWithGeolocation()
			}

			else {
				this.$modal.show('dialog', {
					title: this.$store.state.languages.lang.modal.sopt.add.error.title,
					text: this.$store.state.languages.lang.modal.sopt.add.error.description,
					buttons: [
						{ title: this.$store.state.languages.lang.modal.sopt.add.error.buttons[0], handler: () => { this.addSpotManually() } },
						{ title: this.$store.state.languages.lang.modal.sopt.add.error.buttons[1] }
					]
				})
			}
		},

		addSpotManually () {
			// TODO
		},

		/**
		 * Add a spot with automated location information
		 */
		addSpotWithGeolocation () {
			this.$modal.hide('dialog')
			this.$modal.show('new-spot')
		},

		/**
		 * Store the current position informations
		 */
		getCurrentPosition () {
			const success = pos => {
				this.getGeocodingInformations(pos.coords.latitude, pos.coords.longitude).then((datas) => {
					this.$store.commit('position/setInfos', {
						city: datas.city,
						country: datas.country,
						countryCode: datas.countryCode,
						complementary: datas.complementary
					})
				})
			}

			const error = err => {
				console.warn(`${err.code}: ${err.message}`)
			}

			navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 2500 })
		},

		/**
		 * Get informations about city and country from OpenStretmaps via Nomatim
		 * @param lat  latitude coord
		 * @param lng  longitude coord
		 * @returns promise
		 */
		getGeocodingInformations (lat, lng) {
			return new Promise((resolve, reject) => {
				Vue.axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`).then(res => {
					if (res.status === 200) {
						let complementary = []
						let city = null

						if (res.data.address.service !== undefined) complementary.push(res.data.address.service)
						if (res.data.address.road !== undefined) complementary.push(res.data.address.road)
						if (res.data.address.suburb !== undefined) complementary.push(res.data.address.suburb)
						if (res.data.address.city_district !== undefined) complementary.push(res.data.address.city_district)
						if (res.data.address.neighbourhood !== undefined) complementary.push(res.data.address.neighbourhood)
						if (res.data.address.village !== undefined) complementary.push(res.data.address.village)
						if (res.data.address.town !== undefined) complementary.push(res.data.address.town)
						if (res.data.address.city !== undefined) complementary.push(res.data.address.city)
						if (res.data.address.state !== undefined) complementary.push(res.data.address.state)
						if (res.data.address.country !== undefined) complementary.push(res.data.address.country)

						if (res.data.address.city !== undefined) {
							city = res.data.address.city
						}
						else if (res.data.address.town !== undefined) {
							city = res.data.address.town
						}
						else if (res.data.address.village !== undefined) {
							city = res.data.address.village
						}
						else {
							city = res.data.address.county
						}

						resolve({
							city: city,
							country: res.data.address.country,
							countryCode: res.data.address.country_code,
							complementary: complementary.join(', ')
						})
					}
					else {
						reject(res.status)
					}
				})
				.catch(error => {
					reject(error)
				})
			})
		}
	}
}
</script>
