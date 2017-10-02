<template>
	<section class="spot">
		<header class="spot-header">
			<h1 class="spot-title">{{ spot.name }}</h1>
			<nuxt-link to="/" class="spot-close btn"><i class="icon-cancel" aria-hidden="true"></i><span class="sr-only">Close</span></nuxt-link>
		</header>

		<div class="spot-body">
			<div class="spot-description">{{ spot.description }}</div>

			<div class="spot-gallery">
				<a href="#" class="spot-gallery-item" v-for="picture in spot.pictures" :key="picture">
					<img class="spot-gallery-img" :src="picture.src" :alt="picture.title">
				</a>
			</div>
		</div>

		<footer class="spot-complementary">
			<div class="spot-actions">
				<button class="btn btn--icon" :data-tooltip="$t('spot.actions.upload_picture')" @click="uploadPicture()">
					<i class="icon-picture" aria-hidden="true"></i>
					<span class="sr-only">{{ $t('spot.actions.upload_picture') }}</span>
				</button>
				<button class="btn btn--icon" :data-tooltip="$t('spot.actions.edit')" @click="editSpot()">
					<i class="icon-edit" aria-hidden="true"></i>
					<span class="sr-only">{{ $t('spot.actions.edit') }}</span>
				</button>
			</div>

			<div class="spot-infos">
				<div class="spot-date">{{ $t('spot.infos.created') }} <time>{{ spot.created | moment('DD-MM-YYYY') }}</time></div>
				<div class="spot-date" v-if="spot.modified">{{ $t('spot.infos.edited') }} <time>{{ spot.modified | moment('DD-MM-YYYY') }}</time></div>
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

	data () {
		return {
			imagesPath: 'http://rest.parkourfinder.localhost/images/'
		}
	},

	async asyncData ({ params }) {
		let { data } = await axios.get(`http://rest.parkourfinder.localhost/spots/${params.slug}`)

		let gallery = []
		let images = data.pictures ? data.pictures.split(';') : null

		if (images) {
			images.forEach(function (image) {
				gallery.push(JSON.parse(image))
			})
		}

		data.pictures = gallery
		data.name = removeAccents(data.name)
		return { spot: data }
	},

	methods: {
		uploadPicture () {

		},

		editSpot () {
			alert('Not available')
		}
	},

	head () {
		return {
			title: this.spot.name
		}
	},

	transition (to, from) {
		if (!from) return 'slide-left'
		return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
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
</style>
