<template>
	<nav class="header-actions">
		<!--
		<btn-add-spot/>
		<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.search">
			<i class="icon-search" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.search }}</div>
		</button>
		-->
		<nuxt-link class="btn btn--icon" to="/about" :data-tooltip="this.$store.state.lang.site.nav.about">
			<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.about }}</div>
		</nuxt-link>
		<nuxt-link class="btn btn--icon" to="/settings" :data-tooltip="this.$store.state.lang.site.nav.settings">
			<i class="icon-cog" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.settings }}</div>
		</nuxt-link>
	</nav>
</template>

<script>
// import btnAddSpot from '~/components/AddSpot'

export default {
	name: 'UiMenu',

	components: {
		// btnAddSpot
	}
}
</script>
