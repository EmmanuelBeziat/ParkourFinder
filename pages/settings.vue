<template>
	<section class="settings">
		<div class="container">
			<h1>{{ this.$store.state.lang.settings.title }}</h1>

			<h3>{{ this.$store.state.lang.settings.lang.title }}</h3>
			<button @click="changeLocale('en')">en</button>
			<button @click="changeLocale('fr')">fr</button>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Settings',
	layout: 'text',

	head () {
		return {
			title: this.$store.state.lang.settings.title,
			htmlAttrs: {
				lang: this.$store.state.locale
			}
		}
	},

	methods: {
		changeLocale (lang) {
			this.$store.commit('setLocale', lang)
		}
	},

	transition (to, from) {
		if (!from) return 'slide-left'
		return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
	}
}
</script>

<style lang="stylus">
.settings
	flex 1
</style>
