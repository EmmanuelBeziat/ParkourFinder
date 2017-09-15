<template>
	<div class="site">
		<ui-header/>
		<main class="main">
			<module-map/>
			<nuxt/>
		</main>
	</div>
</template>

<script>
import UiHeader from '~/components/Header.vue'
import ModuleMap from '~/components/Map.vue'

export default {
	components: {
		UiHeader,
		ModuleMap
	}
}
</script>


<style lang="stylus">
*
*::before
*::after
	box-sizing border-box

body
	margin 0
	font 400 16px/1.5 "Source Sans Pro", "Segoe UI", "Helvetica Neue", Roboto, Arial, sans-serif

.site
	min-height 100vh
	display flex
	flex-direction column
	position relative

.main
	flex 1
	display flex

.container
.container-fluid
	margin-left auto
	margin-right auto
	padding-left 1rem
	padding-right 1rem

.container
	max-width 980px

.flex
	display flex
	align-items center

.sr-only
	position absolute
	width 1px
	height 1px
	visibility hidden
	clip rect(0, 0, 0, 0)

.btn
	transition .25s ease
	box-shadow none
	outline none
	background #fff
	border 1px solid #bb2b4d
	color #bb2b4d
	padding 1em 2em
	cursor pointer
	border-radius .15em

	&:hover
		background #bb2b4d
		text-shadow 1px 1px 0 rgba(0, 0, 0, .5)
		color #fff
	&:active
		background darken(#bb2b4d, 15%)
		text-shadow 1px 1px 0 rgba(0, 0, 0, .5)

.btn-primary
	background #bb2b4d
	color #fff

</style>
