<template>
	<nav class="header-actions">
		<button class="btn btn--icon" :data-tooltip="$t('header.newspot')">
			<i class="icon-location" aria-hidden="true"></i><div class="sr-only">{{ $t('header.newspot') }}t</div>
		</button>
		<!--
		<button class="btn btn--icon" :data-tooltip="$t('header.search')">
			<i class="icon-search" aria-hidden="true"></i><div class="sr-only">{{ $t('header.search') }}</div>
		</button>
		-->
		<nuxt-link class="btn btn--icon" to="/about" :data-tooltip="$t('header.about')">
			<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ $t('header.about') }}</div>
		</nuxt-link>
		<nuxt-link class="btn btn--icon" to="/settings" :data-tooltip="$t('header.settings')">
			<i class="icon-cog" aria-hidden="true"></i><div class="sr-only">{{ $t('header.settings') }}t</div>
		</nuxt-link>
	</nav>
</template>
