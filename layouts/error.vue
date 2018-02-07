<template>
	<section class="error">
		<h1 v-if="error.statusCode === 404"></h1>
	</section>
</template>

<script>
export default {
	props: ['error'],

	head: {
		htmlAttrs: {
			// lang: this.$store.state.locale
		}
	}
}
</script>
