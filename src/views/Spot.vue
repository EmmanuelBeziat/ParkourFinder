<template>
	<section class="spot">
		<div v-if="loading" class="spot-content-loading">
			Loading…
		</div>
		<div v-if="error" class="spot-content-error">
			{{ error }}
		</div>
		<div v-if="spot" class="spot-content-loaded">
			<header class="spot-header">
				<h1 class="spot-title">{{ spot.title }}</h1>
				<router-link to="/" class="spot-close btn">
					<i class="icon-cancel" aria-hidden="true"></i>
					<span class="sr-only">Close</span>
				</router-link>
				<div class="spot-location-infos" v-if="spot.location.complementary">
					<i class="icon-location" aria-hidden="true"></i> {{ spot.location.complementary }}
				</div>
			</header>

			<div class="spot-body">
				<div class="spot-description">{{ spot.description }}</div>

				<div class="spot-gallery">
					<a href="#" class="spot-gallery-item" v-for="picture in spot.pictures" :key="picture.src">
						<img class="spot-gallery-img" :src="picture.src" :alt="picture.title">
					</a>
				</div>
			</div>

			<footer class="spot-complementary">
				<div class="spot-actions">
					<!--<button class="btn btn--icon" :data-tooltip="this.$store.state.languages.lang.spot.actions.upload_picture" @click="uploadPicture()">
						<i class="icon-picture" aria-hidden="true"></i>
						<span class="sr-only">{{ this.$store.state.languages.lang.spot.actions.upload_picture }}</span>
					</button>-->
					<button class="btn btn--icon" :data-tooltip="this.$store.state.languages.lang.spot.actions.edit" @click="editSpot()">
						<i class="icon-edit" aria-hidden="true"></i>
						<span class="sr-only">{{ this.$store.state.languages.lang.spot.actions.edit }}</span>
					</button>
					<button class="btn btn--icon" :data-tooltip="this.$store.state.languages.lang.spot.actions.remove" @click="removeSpot()">
						<i class="icon-trash" aria-hidden="true"></i>
						<span class="sr-only">{{ this.$store.state.languages.lang.spot.actions.remove }}</span>
					</button>

					<input ref="fileUploader" type="file" accept="image/*capture=camera" class="sr-only" @change="changeFileUpload()">
				</div>

				<div class="spot-infos">
					<div class="spot-date">{{ this.$store.state.languages.lang.spot.infos.created }}
						<time>{{ spot.createdAt | moment('DD-MM-YYYY') }}</time>
					</div>
					<div class="spot-date" v-if="spot.updatedAt !== spot.createdAt">{{ this.$store.state.languages.lang.spot.infos.edited }}
						<time>{{ spot.updatedAt | moment('DD-MM-YYYY') }}</time>
					</div>
				</div>
			</footer>
		</div>
	</section>
</template>

<script>
import Vue from 'vue'

export default {
	name: 'spot',

	data () {
		return {
			loading: false,
			spot: null,
			error: null
		}
	},

	validate ({ params }) {
		return isNaN(params.slug)
	},

	watch: {
		'$route': 'fetchData'
	},

	created () {
		this.fetchSpot()
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
				.catch (e => {
					this.error = e
				})
				.then (() => {
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

		uploadPictures () { },
		changeFileUpload () { },
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
						buttons: [
							{
								title: this.$store.state.languages.lang.modal.spot.remove.error.buttons.close
							}
						]
					})
				})
		}
	}
}
</script>

<style lang="stylus">
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.spot
	position absolute
	left 1rem
	top 1rem
	right 1rem
	background var(--color-background)
	padding 1rem
	box-shadow 0 0 5px var(--shadow)
	border-radius 3px
	max-height calc(100vh - 56px - 2rem)
	outline 99rem solid var(--shadow)
	z-index 1000

	@media $mq-desktop
		right auto
		width 50vw
		min-width rem(320px)
		max-width rem(980px)

.spot-header
	margin-bottom 1rem

.spot-title
	margin 0 0 10px
	color $color-red
	font 400 var(--font-size-heading-1)/1 var(--font-stack-heading)

.btn.spot-close
	position absolute
	right 1rem
	top 1rem
	padding 0
	font-size var(--font-size-heading-3)

.spot-location-infos
	margin-bottom 1rem
	font-style italic

.spot-complementary
	padding-top 1rem
	margin-top 1rem
	border-top 1px solid var(--shadow)

	@media $mq-tablet
		display flex

.spot-infos
	text-align right
	margin-left auto

.spot-date
	font italic rem(12px)/1.25 var(--font-stack-common)

.spot-gallery
	display flex
	flex-wrap wrap
	margin 1rem -5px 0

.spot-gallery-item
	margin 5px
	width calc(100% / 5 - 10px)

.spot-gallery-img
	display block
	max-width 100%

.v--modal-overlay
	z-index 2000
</style>
