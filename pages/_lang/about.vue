<template>
	<section class="about">
		<div class="container">
			<h1 v-html="$t('about.title')"></h1>

			<p v-html="$t('about.author')"></p>
		</div>
	</section>
</template>

<script>
export default {
	name: 'About',
	layout: 'text',
	head () {
		return {
			title: this.$t('about.title')
		}
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
