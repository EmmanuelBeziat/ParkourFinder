<template></template>

<script>
export default {
	name: 'Home',

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
