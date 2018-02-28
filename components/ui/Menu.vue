<template>
	<nav class="header-actions">
		<btn-add-spot/>
		<btn-about/>
		<!--
		<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.search">
			<i class="icon-search" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.search }}</div>
		</button>
		<nuxt-link class="btn btn--icon" to="/settings" :data-tooltip="this.$store.state.lang.site.nav.settings">
			<i class="icon-cog" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.settings }}</div>
		</nuxt-link>
		-->
	</nav>
</template>

<script>
import btnAddSpot from '~/components/ui/menu/AddSpot'
import btnAbout from '~/components/ui/menu/About'

export default {
	name: 'UiMenu',

	components: {
		btnAddSpot,
		btnAbout
	}
}
</script>
