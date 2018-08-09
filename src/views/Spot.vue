<template>
	<section class="spot">
		<Loader v-if="loading" />
		<Error v-if="error" :message="error" />
		<Spot v-if="spot" :spot="spot" @uploadPicture="mediaUpload($event)" @removeSpot="removeSpot" @editSpot="editSpot" />
	</section>
</template>

<script>
import Vue from 'vue'
import Spot from '@/components/spot/Spot'
import Error from '@/components/spot/Error'
import Loader from '@/components/spot/Loader'

export default {
	name: 'spot',

	data () {
		return {
			loading: false,
			spot: null,
			error: null
		}
	},

	components: {
		Spot,
		Error,
		Loader
	},

	created () {
		this.fetchSpot()
	},

	validate ({ params }) {
		return isNaN(params.slug)
	},

	watch: {
		'$route': 'fetchData'
	},

	methods: {
		fetchSpot () {
			this.error = this.post = null
			this.loading = true

			Vue.axios.get(`https://rest.parkourfinder.com/spots/${this.$route.params.slug}`)
				.then(response => {
					this.spot = response.data
					this.$store.commit('spots/setCurrentSpot', this.spot)
				})
				.catch(err => {
					this.error = err
				})
				.then(() => {
					this.loading = false
				})

			// pb avec le getter : si la page spot est chargée directement, le store est vide au moment de l'appel
			// this.$store.getters['spots/getSpotBySlug'](this.$route.params.slug)
			this.setCurrentSpot()
		},

		/**
		 * update the store witht the current consulted spot
		 */
		setCurrentSpot () {
			this.$store.commit('spots/setCurrentSpot', this.spot)
		},

		/**
		 * Prepare image content for upload
		 */
		mediaUpload (files) {
			// Abort if no file
			if (!files.length) {
				return
			}
			console.log(files)
			/*
			Array.from(files).forEach((file) => {
			})
			const fileUploader = this.$refs.fileUploader
			let data = new FormData()
			let config = {
				headers: { 'content-type': 'multipart/form-data' },
				onUploadProgress: function (progressEvent) {
					let percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total)
					console.log(percentCompleted)
				}
			}

			data.append('image', fileUploader.files[0])
			axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
			Vue.axios.post('https://rest.parkourfinder.com/medias', data)
				.then(function (res) {
					console.log(res.data)
				})
				.catch(function (err) {
					console.log(err.message)
				})
			*/
		},

		/**
		 * Call for edit modal
		 */
		editSpot () {
			this.$modal.show('edit-spot')
		},

		/**
		 * show confirmation popin when remove is asked
		 */
		removeSpot () {
			this.$modal.show('dialog', {
				title: this.$store.state.languages.lang.modal.spot.remove.action.title,
				text: this.$store.state.languages.lang.modal.spot.remove.action.author,
				buttons: [
					{
						title: this.$store.state.languages.lang.modal.spot.remove.action.buttons.cancel
					},
					{
						title: this.$store.state.languages.lang.modal.spot.remove.action.buttons.confirm,
						handler: () => {
							this.confirmRemoveSpot()
						}
					}
				]
			})
		},

		/**
		 * Remove spot from API
		 */
		confirmRemoveSpot () {
			Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
			Vue.axios.delete(`https://rest.parkourfinder.com/spots/${this.spot._id}`)
				.then(() => {
					this.$store.commit('spots/removeSpot', this.spot)
					this.$modal.hide('dialog')
					this.$router.push('/')
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.$store.state.languages.lang.modal.spot.remove.error.title,
						text: `${this.$store.state.languages.lang.modal.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [{
							title: this.$store.state.languages.lang.modal.spot.remove.error.buttons.close
						}]
					})
				})
		}
	}
}
</script>
