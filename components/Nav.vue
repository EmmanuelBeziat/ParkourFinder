<template>
	<nav class="header-actions">
		<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.header.newspot">
			<i class="icon-location" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.header.newspot }}t</div>
		</button>
		<!--
		<button class="btn btn--icon" :data-tooltip="$t('header.search')">
			<i class="icon-search" aria-hidden="true"></i><div class="sr-only">{{ $t('header.search') }}</div>
		</button>
		-->
		<nuxt-link class="btn btn--icon" to="/about" :data-tooltip="this.$store.state.lang.header.about">
			<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.header.about }}</div>
		</nuxt-link>
		<nuxt-link class="btn btn--icon" to="/settings" :data-tooltip="this.$store.state.lang.header.settings">
			<i class="icon-cog" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.header.settings }}</div>
		</nuxt-link>
	</nav>
</template>
