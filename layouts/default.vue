<template>
	<div class="site">
		<ui-header/>
		<main class="main">
			<module-map/>
			<nuxt/>
		</main>
		<ui-footer/>
		<ui-modales/>
	</div>
</template>

<script>
import UiHeader from '~/components/ui/Header'
import UiFooter from '~/components/ui/Footer'
import UiModales from '~/components/ui/Modales'
import ModuleMap from '~/components/Map.vue'

export default {
	components: {
		UiHeader,
		UiFooter,
		UiModales,
		ModuleMap
	},

	head: {
		htmlAttrs: {
			// lang: this.$store.state.locale
		}
	}
}
</script>


<style lang="stylus">
@require '~assets/styles/variables.styl'
@require '~assets/styles/mixins.styl'

*
*::before
*::after
	box-sizing inherit

html
	box-sizing border-box

body
	margin 0
	font 400 $font-size-base/1.5 $font-stack-common

.site
	min-height 100vh
	display flex
	flex-direction column
	position relative

.main
	flex 1
	display flex
	position relative

@require '~assets/styles/helpers.styl'
@require '~assets/styles/modules/layout.styl'
@require '~assets/styles/modules/buttons.styl'
@require '~assets/styles/modules/tooltips.styl'
@require '~assets/styles/modules/pages-transitions.styl'
@require '~assets/styles/modules/forms.styl'
</style>
