<template>
	<div @click.stop class="gallery-image">
		<transition name="gallery-fade">
			<img :src="src" alt="" :key="src">
		</transition>
	</div>
</template>

<script>
export default {
	props: ['image'],

	data () {
		return {
			src: false
		}
	},

	mounted () {
		const image = new window.Image()
		image.onload = () => {
			this.src = this.image
		}

		image.src = this.image
	}
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.gallery-image
	position absolute
	z-index 5015
	size calc(100vw - 1.5rem) calc(100vh - 1.5rem)
	display flex
	justify-content center
	align-items center

	@media $mq-tablet
		size calc(100vw - 4rem) calc(100vh - 4rem)
		max-width 1920px

	img
		display block
		max-width 100%
		max-height 100%
		object-fit contain
		object-position 50% 50%

// TRANSITIONS
.gallery-fade-enter-active
.gallery-fade-leave-active
	transition opacity .25s ease-in-out

.gallery-fade-enter
.gallery-fade-leave-active
	opacity 0
</style>
