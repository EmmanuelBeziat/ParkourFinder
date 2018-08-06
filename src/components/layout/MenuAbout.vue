<template>
	<!--
	<router-link class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.about" to="/about">
		<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.about }}</div>
	</router-link>
	-->
	<router-link class="btn btn--icon" :data-tooltip="this.$store.state.languages.lang.site.nav.about" to="/about">
		<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.languages.lang.site.nav.about }}</div>
	</router-link>
</template>

<script>
export default {
	name: 'About'
}
</script>
