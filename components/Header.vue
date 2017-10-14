<template>
	<header class="header">
		<div class="container-fluid flex">
			<h1 class="header-title"><nuxt-link to="/">Parkour<span>Finder</span></nuxt-link></h1>

			<ui-nav/>
		</div>
	</header>
</template>

<script>
import uiNav from '~/components/Nav.vue'

export default {
	components: {
		uiNav
	}
}
</script>

<style lang="stylus">
@require '~assets/styles/variables.styl'
@require '~assets/styles/mixins.styl'

.header
	background $color-white
	padding .5rem 0
	box-shadow 0 0 5px $color-shadow
	position relative
	z-index 10

.header-title
	margin 0
	font 400 $font-size-heading-3/1 $font-stack-heading
	color $color-red
	transform rotate(-8deg)
	white-space nowrap

	@media $mq-tablet
		font-size $font-size-title

	a
		color inherit
		text-decoration none
		transition .25s ease

		&:hover
			color darken($color-red, 15%)

	span
		display inline-block
		transform translateY(.225em)

.header-actions
	margin-left auto

	.btn
		position relative

</style>
