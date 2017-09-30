<template>
	<section class="spot">
		<header class="spot-header">
			<h1 class="spot-title">{{ spot.name }}</h1>
			<nuxt-link to="/" class="spot-close btn"><i class="icon-cancel" aria-hidden="true"></i><span class="sr-only">Close</span></nuxt-link>
		</header>

		<div class="spot-body">
			<div class="spot-slider"></div>

			<div class="spot-description">{{ spot.description }}</div>
		</div>

		<footer class="spot-complementary">
			<div class="spot-actions">
				<button class="btn btn--icon" @click="getPicture" data-tooltip="Take a picture"><i class="icon-camera" aria-hidden="true"></i> <span class="sr-only">Take a photo</span></button>
				<button class="btn btn--icon" @click="getPicture" data-tooltip="Upload a picture"><i class="icon-picture" aria-hidden="true"></i> <span class="sr-only">Upload a picture</span></button>
			</div>

			<div class="spot-infos">
				<div class="spot-date">Created: <time>{{ spot.created | moment('DD-MM-YYYY') }}</time></div>
				<div class="spot-date" v-if="spot.modified !== null">Last edited: <time>{{ spot.modified | moment('DD-MM-YYYY') }}</time></div>
			</div>
		</footer>
	</section>
</template>

<script>
import axios from 'axios'
import removeAccents from 'remove-accents'

export default {
	name: 'spotSingle',

	validate ({ params }) {
		return isNaN(params.slug)
	},

	async asyncData ({ params }) {
		let { data } = await axios.get(`http://rest.parkourfinder.localhost/spots/${params.slug}`)

		// No return datas
		if (!data) {
			res.statusCode = 404
		}

		data.name = removeAccents(data.name)
		return { spot: data }
	},

	methods: {
		getPicture () {
			if (process.BROWSER_BUILD && navigator.geolocation) {
				navigator.camera.getPicture(onPhotoURISuccess, onFail, {
					quality: 50,
					destinationType: navigator.camera.DestinationType.FILE_URI,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
				})
			}
		}
	},

	head () {
		return {
			title: this.spot.name
		}
	}
}
</script>

<style lang="stylus">
@require '~assets/styles/variables.styl'
@require '~assets/styles/mixins.styl'

.spot
	position absolute
	left 1rem
	top 1rem
	right 1rem
	background $color-white
	padding 1rem
	box-shadow 0 0 5px $color-shadow
	border-radius 3px
	max-height calc(100vh - 56px - 2rem)
	outline 99rem solid $color-shadow

	@media $mq-desktop
		right auto
		width 50vw
		min-width rem(320px)
		max-width rem(980px)

.spot-title
	margin 0
	color $color-red
	font 400 $font-size-heading-1/1.25 $font-stack-heading

.btn.spot-close
	position absolute
	right 1rem
	top 1rem
	padding 0
	font-size $font-size-heading-3

.spot-complementary
	padding-top 1rem
	margin-top 1rem
	border-top 1px solid $color-shadow
	@media $mq-tablet
		display flex

.spot-infos
	text-align right
	margin-left auto

.spot-date
	font italic rem(12px)/1.25 $font-stack-common

</style>
