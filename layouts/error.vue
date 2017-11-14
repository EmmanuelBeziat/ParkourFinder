<template>
	<div class="site">
		<ui-header/>
		<main class="main">
			<h1 v-if="error.statusCode === 404"></h1>
		</main>
		<ui-footer/>
		<ui-modales/>
	</div>
</template>

<script>
import UiHeader from '~/components/ui/Header'
import UiFooter from '~/components/ui/Footer'
import UiModales from '~/components/ui/Modales'

export default {
	props: ['error'],

	components: {
		UiHeader,
		UiFooter,
		UiModales
	},

	head: {
		htmlAttrs: {
			// lang: this.$store.state.locale
		}
	}
}
</script>
