<template>
	<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.newspot" @click="newspot()">
		<i class="icon-location" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.newspot }}</div>
	</button>
</template>

<script>
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

	methods: {
		newspot () {
			const that = this

			if (this.geolocation) {
				that.$modal.show('dialog', {
					title: that.$store.state.lang.modal.newspot.success.title,
					text: that.$store.state.lang.modal.newspot.success.description,
					buttons: [
						{ title: that.$store.state.lang.modal.newspot.success.buttons[0], handler: () => { this.setMarkerAuto() } },
						{ title: that.$store.state.lang.modal.newspot.success.buttons[1], handler: () => { setMarkerManually() } },
						{ title: that.$store.state.lang.modal.newspot.success.buttons[2] }
					]
				})
			}

			else {
				that.$modal.show('dialog', {
					title: that.$store.state.lang.modal.newspot.error.title,
					text: that.$store.state.lang.modal.newspot.error.description,
					buttons: [
						{ title: that.$store.state.lang.modal.newspot.error.buttons[0], handler: () => { setMarkerManually() } },
						{ title: that.$store.state.lang.modal.newspot.error.buttons[1] }
					]
				})
			}

			function setMarkerManually () {
				alert('manuel')
			}
		},

		setMarkerAuto () {
			this.$modal.hide('dialog')
			this.$modal.show('new-spot')
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

.dialog-buttons
	button
		border-radius 0
		flex 1
</style>
