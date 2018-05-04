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
					countryCode: datas.countryCode
				})
			})
		},

		/**
		 * Get informations about city and country from Google Maps
		 * @param lat latitude coord
		 * @param lng longitude coord
		 * @returns promise
		 * TODO: Change google map for a lighter service
		 */
		getGeocodingInformations (lat, lng) {
			return new Promise((resolve, reject) => {
				this.$axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`).then((res) => {
					if (res.data.status === 200) {
						resolve({
							city: res.data.address.county,
							country: res.data.address.country,
							countryCode: res.data.address.country_code
							/*
							cityDistrict: res.data.address.city_district // pais 13e arrondissement
							suburbs: res.data.address.suburbs // quartier de la gare
							postcode: res.data.address.postcode
							service: res.data.address.service // aire de la lozère
							state: res.data.address.state // occitanie
							neighbourhood: res.data.address.state // residence du park
							*/
						})
					}
					else {
						reject(res.data.status)
					}
				})
			})
		}
	}
}
</script>
