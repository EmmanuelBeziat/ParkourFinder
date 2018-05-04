<template>
	<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.newspot" @click="addSpotManager()">
		<i class="icon-location" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.newspot }}</div>
	</button>
</template>

<script>
import Vue from 'vue'

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
		/**
		 * Select the method to add a new spot
		 */
		addSpotManager () {
			const that = this

			if (this.geolocation) {
				that.getCurrentPosition()
				/*
				that.$modal.show('dialog', {
					title: that.$store.state.lang.modal.newspot.success.title,
					text: that.$store.state.lang.modal.newspot.success.description,
					buttons: [
						{ title: that.$store.state.lang.modal.newspot.success.buttons[0], handler: () => { this.addSpotWithGeolocation() } },
						// { title: that.$store.state.lang.modal.newspot.success.buttons[1], handler: () => { this.addSpotManually() } },
						{ title: that.$store.state.lang.modal.newspot.success.buttons[2] }
					]
				})
				*/
				that.addSpotWithGeolocation()
			}

			else {
				that.$modal.show('dialog', {
					title: that.$store.state.lang.modal.newspot.error.title,
					text: that.$store.state.lang.modal.newspot.error.description,
					buttons: [
						{ title: that.$store.state.lang.modal.newspot.error.buttons[0], handler: () => { this.addSpotManually() } },
						{ title: that.$store.state.lang.modal.newspot.error.buttons[1] }
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
			const lat = this.$store.state.position.coords.latitude
			const lng = this.$store.state.position.coords.longitude

			this.getGeocodingInformations(lat, lng).then((datas) => {
				this.$store.commit('position/setInfos', {
					city: datas.city,
					country: datas.country,
					countryCode: datas.countryCode,
					complementary: datas.complementary
				})
			})
		},

		/**
		 * Get informations about city and country from OpenStretmaps via Nomatim
		 * @param lat latitude coord
		 * @param lng longitude coord
		 * @returns promise
		 */
		getGeocodingInformations (lat, lng) {
			return new Promise((resolve, reject) => {
				this.$axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`).then(res => {
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
