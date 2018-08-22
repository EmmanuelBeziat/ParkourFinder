<template>
	<div class="spot-content-error">
		<h3 class="title">{{ this.$store.state.languages.lang.site.loading }}</h3>
		<p>{{ message }}</p>
	</div>
</template>

<script>
export default {
	props: ['message']
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.title
	color var(--color-primary)
	font 400 2.5em/1.5 var(--font-stack-heading)
	margin 0
</style>
