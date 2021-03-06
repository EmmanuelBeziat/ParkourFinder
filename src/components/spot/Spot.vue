<template>
	<div class="spot-content-loaded">
		<header class="spot-header">
			<h1 class="spot-title">{{ spot.title | normalize }}</h1>
			<button class="spot-close btn" @click="closeSpot">
				<i class="icon-cancel" aria-hidden="true"></i>
				<span class="sr-only">Fermer</span>
			</button>
			<div class="spot-location-infos" v-if="spot.location.complementary">
				<i class="icon-location" aria-hidden="true"></i> {{ spot.location.complementary }}
			</div>
		</header>

		<div class="spot-body">
			<div class="spot-options" v-if="spot.options">
				<span class="spot-option-item" v-for="option in spot.options" :key="option">{{ option }}</span>
			</div>
			<div class="spot-description">{{ spot.description }}</div>

			<div class="spot-gallery">
				<a :href="picture" class="spot-gallery-item" v-for="(picture, pictureIndex) in spot.medias" :key="pictureIndex" :data-id="pictureIndex" v-gallery>
					<img class="spot-gallery-img" :src="picture[0].replace('.com/', '.com/min/')" :alt="spot.title">
				</a>
			</div>

			<Gallery />
		</div>

		<footer class="spot-complementary">
			<div class="spot-actions">
				<IconButton icon="icon-picture" :text="texts.actions.upload_picture" @action="$emit('uploadPicture')" />
				<IconButton icon="icon-edit" :text="texts.actions.edit" @action="$emit('editSpot')" />
				<!-- <IconButton icon="icon-trash" :text="texts.actions.remove" @action="$emit('removeSpot')" /> -->
			</div>

			<div class="spot-infos">
				<div class="spot-date">{{ texts.infos.created }}
					<time>{{ spot.createdAt | date }}</time>
				</div>
				<div class="spot-date" v-if="spot.updatedAt !== spot.createdAt">{{ texts.infos.edited }}
					<time>{{ spot.updatedAt | date }}</time>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import IconButton from '@/components/buttons/IconButton'
import Gallery from '@/components/gallery/Gallery'

export default {
	props: ['spot'],

	data () {
		return {
			texts: this.$store.state.languages.lang.spot,
			galleryIndex: null,
		}
	},

	computed: {

	},

	components: {
		IconButton,
		Gallery
	},

	methods: {
		closeSpot () {
			this.$store.dispatch('gallery/resetList')
			this.$store.dispatch('spots/resetCurrentSpot')
			this.$router.push('/')
		}
	}
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.spot-content-loaded
	display grid
	grid-template-rows auto 1fr auto
	height 100%

.spot-header
	margin-bottom 1rem

.spot-title
	margin 0 0 10px
	color var(--color-primary)
	font 400 var(--font-size-heading-1)/1 var(--font-stack-heading)

.btn.spot-close
	position absolute
	right 1rem
	top 1rem
	padding 0 0 2px
	line-height 1.25
	font-size var(--font-size-heading-3)

.spot-location-infos
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
	display grid
	grid-gap 5px
	grid-template-columns 1fr 1fr
	margin 1rem 0

	@media $mq-tablet
		grid-template-columns 1fr 1fr 1fr 1fr

.spot-gallery-item
	max-height 180px
	padding 4px
	border 1px solid var(--shadow)
	overflow hidden
	position relative
	&:hover
		border-color var(--color-primary)
		transition color .2s ease-in

.spot-gallery-img
	display block
	max-width 100%
	object-fit cover
	object-position 50% 50%
	transition .25s ease-in-out

.spot-options
	margin-bottom 1rem

.spot-option-item
	display inline-block
	color var(--color-background)
	background var(--color-primary)
	padding 0 8px
	border-radius 2px

	& + .spot-option-item
		margin-left 2px
</style>
