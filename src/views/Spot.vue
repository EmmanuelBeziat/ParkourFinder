<template>
	<section class="spot">
		<Loader v-if="loading" />
		<Error v-if="error" :message="error" />
		<Edit v-if="spot && isEdit" :spot="spot" @close="isEdit = false" />
		<Spot v-if="spot && !isEdit" :spot="spot" @uploadPicture="mediaUpload()" @removeSpot="removeSpot()" @editSpot="isEdit = true" />
	</section>
</template>

<script>
import Vue from 'vue'
import Spot from '@/components/spot/Spot'
import Edit from '@/components/spot/Edit'
import Error from '@/components/spot/Error'
import Loader from '@/components/loader/Loader'

export default {
	name: 'spot',

	data () {
		return {
			loading: false,
			spot: null,
			error: null,
			isEdit: false
		}
	},

	components: {
		Spot,
		Edit,
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
					this.setCurrentSpot()
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
			this.$store.dispatch('spots/setCurrentSpot', this.spot)
		},

		/**
		 * Prepare image content for upload
		 */
		mediaUpload () {
			this.$modal.show('spot-pictures')
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
						title: `<i class="icon-cancel" aria-hidden="true"></i> ${this.$store.state.languages.lang.modal.spot.remove.action.buttons.cancel}`
					},
					{
						title: `<i class="icon-trash" aria-hidden="true"></i> ${this.$store.state.languages.lang.modal.spot.remove.action.buttons.confirm}`,
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
					this.$store.dispatch('spots/removeSpot', this.spot)
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

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.spot
	background var(--color-background)
	padding 1rem
	box-shadow 0 0 5px var(--shadow)
	outline 200rem solid var(--shadow)
	border-radius 3px
	z-index 2005
	position fixed
	left .5rem
	top .5rem
	right .5rem
	bottom .5rem
	min-width 19rem

	@media $mq-tablet
		position absolute
		bottom auto
		max-height calc(100vh - 56px - 2rem)
		right auto
		width 80vw
		max-width rem(980px)

	@media $mq-desktop
		width 50vw
</style>
