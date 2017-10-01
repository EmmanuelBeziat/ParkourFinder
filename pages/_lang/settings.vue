<template>
	<section class="settings">
		<div class="container">
			<h1>{{ $t('settings.title') }}</h1>

			<h3>{{ $t('settings.lang.title') }}</h3>
			<button @click="setLang('en')">{{ $t('en') }}</button>
			<button @click="setLang('fr')">{{ $t('fr') }}</button>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Settings',
	layout: 'text',

	methods: {
		setLang (lang) {
			this.$store.commit('SET_LANG', lang)
		}
	},

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
