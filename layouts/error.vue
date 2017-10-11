<template>
	<div class="site">
		<ui-header/>
		<main class="main">
			<h1 v-if="error.statusCode === 404"></h1>
		</main>
	</div>
</template>

<script>
import UiHeader from '~/components/Header.vue'

export default {
	props: ['error'],

	components: {
		UiHeader
	},

	head: {
		htmlAttrs: {
			// lang: this.$store.state.locale
		}
	}
}
</script>
