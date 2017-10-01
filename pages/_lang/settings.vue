<template>
	<section class="settings">
		<div class="container">
			<h1>{{ $t('settings.title') }}</h1>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Settings',
	layout: 'text',
	head () {
		return {
			title: this.$t('settings.title')
		}
	}
}
</script>

<style lang="stylus">
.settings
	flex 1
</style>
