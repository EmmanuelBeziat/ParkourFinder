<template>
	<section class="about">
		<div class="container">
			<h1 v-html="this.$store.state.lang.about.title"></h1>

			<p v-html="this.$store.state.lang.about.author"></p>
		</div>
	</section>
</template>

<script>
export default {
	name: 'About',
	layout: 'text',

	head () {
		return {
			title: this.$store.state.lang.about.title,
			htmlAttrs: {
				lang: this.$store.state.locale
			}
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

.about
	flex 1

.heart
	color $color-red
</style>
