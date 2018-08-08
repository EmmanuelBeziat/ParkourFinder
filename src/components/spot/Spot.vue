<template>
	<div class="spot-content-loaded">
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
				<button class="btn btn--icon" :data-tooltip="texts.actions.upload_picture" @click="buttonUpload()">
					<i class="icon-picture" aria-hidden="true"></i>
					<span class="sr-only">{{ texts.actions.upload_picture }}</span>
				</button>
				<button class="btn btn--icon" :data-tooltip="texts.actions.edit" @click="buttonEdit()">
					<i class="icon-edit" aria-hidden="true"></i>
					<span class="sr-only">{{ texts.actions.edit }}</span>
				</button>
				<button class="btn btn--icon" :data-tooltip="texts.actions.remove" @click="buttonRemove()">
					<i class="icon-trash" aria-hidden="true"></i>
					<span class="sr-only">{{ texts.actions.remove }}</span>
				</button>

				<input class="sr-only" ref="fileUploader" type="file" accept="image/*capture=camera" multiple @change="inputChangePicture()">
			</div>

			<div class="spot-infos">
				<div class="spot-date">{{ texts.infos.created }}
					<time>{{ spot.createdAt | moment('DD-MM-YYYY') }}</time>
				</div>
				<div class="spot-date" v-if="spot.updatedAt !== spot.createdAt">{{ texts.infos.edited }}
					<time>{{ spot.updatedAt | moment('DD-MM-YYYY') }}</time>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	props: ['spot'],

	data () {
		return {
			texts: this.$store.state.languages.lang.spot
		}
	},

	methods: {
		/**
		 * ask for upload picture
		 */
		buttonUpload () {
			this.$refs.fileUploader.click()
		},

		inputChangePicture () {
			this.$emit('uploadPicture', event.target.files)
		},

		buttonEdit () {
			this.$emit('editSpot')
		},

		buttonRemove () {
			this.$emit('removeSpot')
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
