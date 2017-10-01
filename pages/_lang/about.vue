<template>
	<section class="about">
		<div class="container">
			<h1>{{ $t('about.title') }}</h1>
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
.about
	flex 1
</style>
