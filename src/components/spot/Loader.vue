<template>
	<div class="spot-content-loading">
		<h3 class="title">{{ this.$store.state.languages.lang.site.loading }}</h3>
		<div class="loader">
			<span class="loader-item" />
			<span class="loader-item" />
			<span class="loader-item" />
		</div>
	</div>
</template>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

@keyframes sk-stretchdelay
	0%
	40%
	100%
		transform scaleY(0.4)
	20%
		transform scaleY(1.0)
		background var(--color-primary)

.spot-content-loading
	padding 1em
	text-align center

.title
	color var(--color-primary)
	font 400 2.5em/1.5 var(--font-stack-heading)
	margin 0

.loader-item
	vertical-align top
	display inline-block
	margin 0 2px
	size 6px 50px
	background var(--shadow)
	animation sk-stretchdelay 1.2s infinite ease-in-out

	&:nth-child(1)
		animation-delay -1.2s
	&:nth-child(2)
		animation-delay -1.1s
	&:nth-child(3)
		animation-delay -1.0s

</style>
