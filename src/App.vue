<template>
	<div id="app" class="app">
		<LayoutHeader />
		<main class="main">
			<Map />

			<transition name="slide-fade">
				<router-view />
			</transition>
		</main>
		<Modales />
	</div>
</template>

<script>
import Map from '@/components/map/Map'
import LayoutHeader from '@/components/layout/Header'
import Modales from '@/components/modales/Modales'

export default {
	components: {
		Map,
		LayoutHeader,
		Modales
	}
}
</script>

<style lang="stylus">
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'
@require '~@/assets/styles/vendors/normalize.styl'

@require '~@/assets/fonts/icons/icons.css'
@require '~@/assets/fonts/snickles/snickles.css'

:root
	// Colors
	--color-background $color-white
	--color-text $color-black
	--color-primary $color-red
	--color-primary-alt $color-red-alt
	--shadow $color-shadow

	// fonts
	--font-stack-common $font-stack-common
	--font-stack-heading $font-stack-heading
	--font-stack-icons $font-stack-icons

	--font-size-base $font-size-base
	--font-size-title $font-size-title

	--font-size-heading-1 $font-size-heading-1
	--font-size-heading-2 $font-size-heading-2
	--font-size-heading-3 $font-size-heading-3
	--font-size-heading-4 $font-size-heading-4

*
*::before
*::after
	box-sizing inherit

html
	box-sizing border-box

body
	margin 0
	font 400 var(--font-size-base)/1.5 var(--font-stack-common)

.app
	height 100vh
	max-width 100vw
	display grid
	grid-template-rows auto 1fr
	position relative
	overflow hidden

.main
	flex 1
	display flex
	position relative

@require '~@/assets/styles/helpers.styl'
@require '~@/assets/styles/modules/layout.styl'
@require '~@/assets/styles/modules/buttons.styl'
@require '~@/assets/styles/modules/tooltips.styl'
@require '~@/assets/styles/modules/pages-transitions.styl'
@require '~@/assets/styles/modules/forms.styl'
@require '~@/assets/styles/modules/modales.styl'
</style>
