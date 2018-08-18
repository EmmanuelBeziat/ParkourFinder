<template>
	<div class="spot-content-loaded">
		<header class="spot-header">
			<h1 class="spot-title">{{ spot.title }}</h1>
			<router-link to="/" class="spot-close btn">
				<i class="icon-cancel" aria-hidden="true"></i>
				<span class="sr-only">Close</span>
			</router-link>
			<div class="spot-location-infos" v-if="spot.location.complementary">
				<i class="icon-location" aria-hidden="true"></i> {{ spot.location.complementary }}
			</div>
		</header>

		<div class="spot-body">
			<div class="spot-description">{{ spot.description }}</div>

			<div class="spot-gallery">
				<a href="#" class="spot-gallery-item" v-for="(picture, index) in spot.medias" :key="index" @click.prevent>
					<img class="spot-gallery-img" :src="picture" alt="">
				</a>
			</div>
		</div>

		<footer class="spot-complementary">
			<div class="spot-actions">
				<IconButton icon="icon-picture" :text="texts.actions.upload_picture" @action="buttonPicture()" />
				<IconButton icon="icon-edit" :text="texts.actions.edit" @action="buttonEdit()" />
				<IconButton icon="icon-trash" :text="texts.actions.remove" @action="buttonRemove()" />
			</div>

			<div class="spot-infos">
				<div class="spot-date">{{ texts.infos.created }}
					<time>{{ spot.createdAt | moment('DD-MM-YYYY') }}</time>
				</div>
				<div class="spot-date" v-if="spot.updatedAt !== spot.createdAt">{{ texts.infos.edited }}
					<time>{{ spot.updatedAt | moment('DD-MM-YYYY') }}</time>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import IconButton from '@/components/buttons/IconButton'

export default {
	props: ['spot'],

	data () {
		return {
			texts: this.$store.state.languages.lang.spot
		}
	},

	components: {
		IconButton
	},

	methods: {
		buttonPicture () {
			this.$emit('uploadPicture')
		},

		buttonEdit () {
			this.$emit('editSpot')
		},

		buttonRemove () {
			this.$emit('removeSpot')
		}
	}
}
</script>

<style lang="stylus">
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.spot
	background var(--color-background)
	padding 1rem
	box-shadow 0 0 5px var(--shadow)
	border-radius 3px
	outline 99rem solid var(--shadow)
	z-index 1000
	position fixed
	top 0
	left 0
	right 0
	bottom 0

	@media $mq-desktop
		position absolute
		left 1rem
		top 1rem
		right 1rem
		bottom auto
		max-height calc(100vh - 56px - 2rem)
		right auto
		width 50vw
		min-width rem(320px)
		max-width rem(980px)

.spot-content-loaded
	display grid
	grid-template-rows auto 1fr auto
	height 100%

.spot-header
	margin-bottom 1rem

.spot-title
	margin 0 0 10px
	color $color-red
	font 400 var(--font-size-heading-1)/1 var(--font-stack-heading)

.btn.spot-close
	position absolute
	right 1rem
	top 1rem
	padding 0
	font-size var(--font-size-heading-3)

.spot-location-infos
	margin-bottom 1rem
	font-style italic

.spot-body
	overflow-y auto

.spot-complementary
	padding-top 1rem
	margin-top 1rem
	border-top 1px solid var(--shadow)

	@media $mq-tablet
		display flex

.spot-infos
	text-align right
	margin-left auto

.spot-date
	font italic rem(12px)/1.25 var(--font-stack-common)

.spot-gallery
	display flex
	margin 1rem -5px 0

.spot-gallery-item
	max-height 180px
	border 4px solid var(--color-background)
	outline 1px solid var(--shadow)
	overflow hidden
	flex 1
	position relative
	margin 0 5px

	/* &::before
		content ""
		position absolute
		left 0
		right 0
		top 0
		bottom 0
		background alpha(white, 50%)
		z-index 4
		opacity 0
		visibility hidden
		transition .25s ease-in

	&::after
		font-family var(--font-stack-icons)
		content "\e811"
		position absolute
		left 50%
		top 50%
		transform translate(-50%, -50%)
		font-size 4rem
		color var(--color-primary)
		z-index 5
		opacity 0
		visibility hidden
		transition .45s ease-out */

	&:hover
		.spot-gallery-img
			transform scale(1.05)

		/*
		&::before
		&::after
			opacity 1
			visibility visible
			transition .25s ease-in */

.spot-gallery-img
	display block
	max-width 100%
	object-fit cover
	object-position 50% 50%
	transition .25s ease-in-out

.v--modal-overlay
	z-index 2000
</style>
