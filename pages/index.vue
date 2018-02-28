<template>
	<section class="home"></section>
</template>

<script>
export default {
	name: 'Home',

	async fetch ({ store, app }) {
		store.commit('spot/setCurrentSpot', null)
	},

	head () {
		return {
			title: this.$store.state.lang.home.title,
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
