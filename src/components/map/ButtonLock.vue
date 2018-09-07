<template>
	<button class="btn btn--icon btn--map" @click="$emit('action')">
		<i class="icon-target" aria-hidden="true"></i>
		<span class="sr-only">{{ this.$store.state.languages.lang.map.toggle }}</span>
	</button>
</template>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.btn--map
	size 2.5em
	line-height 1em
	text-align center
	border-radius 50%
	position fixed
	color var(--color-primary)
	background darken(white, 5%)
	bottom 1rem
	right 3.5rem
	position absolute
	z-index 410
	box-shadow 2px 2px 4px var(--shadow)
	text-shadow 1px 1px 0 var(--shadow)

	&:hover
		background var(--color-background)
		color var(--color-primary)

	&:active
		transform scale(.95)
		transition .05s ease-out

	&.is-locked
		background var(--color-primary)
		color var(--color-background)
		border 2px solid var(--color-background)
		&:hover
			background var(--color-primary-alt)
			color var(--color-background)

</style>
