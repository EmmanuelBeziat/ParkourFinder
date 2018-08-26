<template>
	<progress :value="value" :max="max"></progress>
</template>

<script>
export default {
	props: ['value', 'max']
}
</script>

<style lang="stylus" scoped>
progress
	-webkit-appearance none
	appearance none
	display block
	width 100%
	border 1px solid var(--shadow)
	padding 1px
	height 1rem
	color var(--color-primary)

	&::-webkit-progress-bar
		background white
		transition .1s ease

	&::-webkit-progress-value
		background var(--color-primary)

	&::-moz-progress-bar
		background var(--color-primary)
		transition .1s ease
</style>
