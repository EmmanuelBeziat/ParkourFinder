<template>
	<div class="gallery" v-if="image" @click="close">
		<Loader class="gallery-load" />

		<transition :name="transition">
			<GalleryImage :image="image" :key="image" />
		</transition>

		<div class="gallery-controls">
			<button class="gallery-control gallery-control__previous" v-if="state.index- 1 >= 0" @click.stop.prevent="prev">
				<i class="icon-angle-left" aria-hidden="true"></i>
				<span class="sr-only">Précédent</span>
			</button>

			<button class="gallery-control gallery-control__next" v-if="state.index + 1 < state.images.length" @click.stop.prevent="next">
				<i class="icon-angle-right" aria-hidden="true"></i>
				<span class="sr-only">Suivant</span>
			</button>

			<button class="gallery-control gallery-control__close" @click="close">
				<i class="icon-cancel" aria-hidden="true"></i>
				<span class="sr-only">Fermer</span>
			</button>
		</div>
	</div>
</template>

<script>
import './GalleryDirective'
import Store from './GalleryStore'
import GalleryImage from './GalleryImage'
import Loader from '@/components/loader/Loader'

export default {
	data () {
		return {
			state: Store.state,
			direction: 'next'
		}
	},

	components: {
		GalleryImage,
		Loader,
	},

	computed: {
		transition () {
			return `gallery-${this.direction}`
		},

		image () {
			if (this.state.index === null) return
			return this.state.images[this.state.index]
		}
	},

	methods: {
		close () {
			Store.close()
		},

		prev () {
			this.direction = 'prev'
			Store.prev()
		},

		next () {
			this.direction = 'next'
			Store.next()
		}
	}
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.gallery-load
	position absolute
	left 50%
	top 50%
	transform translate(-50%, -50%)

.gallery
	position fixed
	left 0
	top 0
	size 100vw 100vh
	background rgba(0, 0, 0, .9)
	display flex
	align-items center
	justify-content center
	z-index 5015
	transition .35s ease-in-out

.gallery-overlay
	position fixed
	left 0
	top 0
	size 100vw 100vh
	z-index 5010

.gallery-control
	border 2px solid var(--color-background)
	background none
	color var(--color-background)
	font-size rem(24px)
	cursor pointer
	position absolute
	z-index 5020
	transition transform .25s ease-in-out
	padding 0
	size rem(32px)
	border-radius 50%
	outline 0

	@media $mq-tablet
		font-size var(--font-size-heading-1)
		size rem(64px)

	i
		position absolute
		left 0
		top 0
		bottom 0
		right 0
		display flex
		justify-content center
		align-items center

	&:hover
		transform scale(1.15)

// Controls
.gallery-control__close
	right 1rem
	top 1rem

.gallery-control__previous
	left 1rem
	top 50%
	i::before
		margin-left 3px

.gallery-control__next
	right 1rem
	top 50%
	i::before
		margin-right 3px

// TRANSITIONS
.gallery-next-enter-active
.gallery-next-leave-active
	opacity 1
	transition .25s ease-in-out

.gallery-next-enter-active
	transition-delay .5s

.gallery-next-enter
	transform translateX(100px)
	opacity 0

.gallery-next-leave-active
	transform translateX(-100px)
	opacity 0

.gallery-prev-enter-active
.gallery-prev-leave-active
	opacity 1
	transition .25s ease-in-out

.gallery-prev-enter-active
	transition-delay .5s

.gallery-prev-enter
	transform translateX(-100px)
	opacity 0

.gallery-prev-leave-active
	transform translateX(100px)
	opacity 0
</style>
