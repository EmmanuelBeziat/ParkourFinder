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
	display flex
	justify-content center
	align-items center

	@media $mq-tablet
		max-width 1920px

	img
		display block
		max-width calc(100vw - 4rem)
		max-height calc(100vh - 4rem)
		object-fit contain
		object-position 50% 50%

		@media $mq-tablet
			max-width calc(100vw - 4rem)
			max-height calc(100vh - 4rem)

// TRANSITIONS
.gallery-fade-enter-active
.gallery-fade-leave-active
	transition opacity .25s ease-in-out

.gallery-fade-enter
.gallery-fade-leave-active
	opacity 0
</style>
