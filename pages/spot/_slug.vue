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
	</section>
</template>

<script>
import axios from 'axios'

export default {
	name: 'spotSingle',

	validate ({ params }) {
		return isNaN(params.slug)
	},

	async asyncData ({ params }) {
		let { data } = await axios.get(`http://rest.parkourfinder.localhost/spots/${params.slug}/`)
		console.log('bite')

		// No return datas
		if (!data) {
			res.statusCode = 404
		}

		return { spot: data }
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

.spot-close
	position absolute
	font-size $font-size-heading-3
	padding 0
	right 1rem
	top 1rem

</style>
