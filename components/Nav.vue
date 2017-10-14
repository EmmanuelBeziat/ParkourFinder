<template>
	<nav class="header-actions">
		<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.newspot" @click="newSpot()">
			<i class="icon-location" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.newspot }}</div>
		</button>
		<!--
		<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.search">
			<i class="icon-search" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.search }}</div>
		</button>
		-->
		<nuxt-link class="btn btn--icon" to="/about" :data-tooltip="this.$store.state.lang.site.nav.about">
			<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.about }}</div>
		</nuxt-link>
		<nuxt-link class="btn btn--icon" to="/settings" :data-tooltip="this.$store.state.lang.site.nav.settings">
			<i class="icon-cog" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.settings }}</div>
		</nuxt-link>

		<v-dialog/>
	</nav>
</template>

<script>
export default {
	name: 'Nav',

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

	methods: {
		newSpot () {
			const that = this

			if (this.geolocation) {
				that.$modal.show('dialog', {
					title: that.$store.state.lang.spot.modal.success.title,
					text: that.$store.state.lang.spot.modal.success.description,
					buttons: [
						{ title: that.$store.state.lang.spot.modal.success.buttons[0], handler: () => { this.setMarkerAuto() } },
						{ title: that.$store.state.lang.spot.modal.success.buttons[1], handler: () => { setMarkerManually() } },
						{ title: that.$store.state.lang.spot.modal.success.buttons[2] }
					]
				})
			}

			else {
				that.$modal.show('dialog', {
					title: that.$store.state.lang.spot.modal.error.title,
					text: that.$store.state.lang.spot.modal.error.description,
					buttons: [
						{ title: that.$store.state.lang.spot.modal.error.buttons[0], handler: () => { setMarkerManually() } },
						{ title: that.$store.state.lang.spot.modal.error.buttons[1] }
					]
				})
			}

			function setMarkerManually () {
				alert('manuel')
			}
		},

		setMarkerAuto () {
		},

		getCurrentPosition () {
			function success (position) {
				console.log({ lat: position.coords.latitude, lng: position.coords.longitude })
			}
			function error (error) {
				console.log(error)
			}

			navigator.geolocation.getCurrentPosition(success, error, {
				enableHighAccuracy: true,
				maximumAge: 5000
			})
		}
	}
}
</script>

<style lang="stylus">
@require '~assets/styles/variables.styl'
@require '~assets/styles/mixins.styl'

.v--modal-box
	@media (max-width 400px)
		max-width calc(100vw - 20px)
		margin auto

.vue-dialog
	button:focus
	button:active
		outline 0

	button:hover
		background $color-red
		color $color-white
</style>
