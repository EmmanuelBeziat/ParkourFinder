<template>
	<header class="header">
		<div class="container-fluid flex">
			<h1 class="header-title">
				<router-link to="/">Parkour<span>Finder</span><span class="version-stage">alpha</span></router-link>
			</h1>

			<nav class="header-actions">
				<MenuAddSpot />
				<MenuAbout />
			</nav>
		</div>
	</header>
</template>

<script>
import MenuAddSpot from '@/components/layout/menu/AddSpot'
import MenuAbout from '@/components/layout/menu/About'

export default {
	name: 'Header',

	components: {
		MenuAddSpot,
		MenuAbout,
	}
}
</script>

<style lang="stylus">
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.header
	background var(--color-background)
	padding 0.5rem 0
	box-shadow 0 0 5px var(--shadow)
	position relative
	z-index 1000

.header-title
	margin 0
	font 400 var(--font-size-heading-3)/1 var(--font-stack-heading)
	color var(--color-primary)
	transform rotate(-8deg)
	white-space nowrap

	@media $mq-tablet
		font-size var(--font-size-title)


	a
		color inherit
		text-decoration none
		transition 0.25s ease

		&:hover
			color var(--color-primary-alt)



	span
		display inline-block
		transform translateY(0.225em)

	.version-stage
		font 400 rem(12px)/1 var(--font-stack-common)
		transform translateY(6px) rotate(8deg)
		display inline-block

.header-actions
	margin-left auto

	.btn
		position relative
</style>
