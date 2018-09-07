<template>
	<form class="search" @submit.prevent="submit">
		<input ref="search" class="search-input" type="text" :placeholder="this.$store.state.languages.lang.search.placeholder">
		<i class="icon-location" aria-hidden></i>
		<div class="search-cta">
			<button class="search-btn search-submit" type="submit">
				<i class="icon-search" aria-hidden="true"></i>
				<span class="sr-only">{{ this.$store.state.languages.lang.search.search }}</span>
			</button>
			<button type="reset" class="search-btn search-close" @click="close">
				<i class="icon-cancel" aria-hidden="true"></i>
				<span class="sr-only">{{ this.$store.state.languages.lang.search.close }}</span>
			</button>
		</div>
	</form>
</template>

<script>
import places from 'places.js'

export default {
	name: 'Search',

	data () {
		return {
			places: null,
		}
	},

	mounted () {
		this.places = places({
			container: this.$refs.search,
			aroundLatLngViaIP: false,
			templates: {
				value: (suggestion => {
					return suggestion.name
				})
			}
		})

		this.places.on('change', (event) => {
			this.submit(event.suggestion)
			this.places.close()
		})

		this.places.on('clear', () => {
			this.submit(null)
		})
	},

	methods: {
		close () {
			this.submit(null)
			this.places.close()
			this.$emit('close')
		},

		submit (value) {
			this.$store.commit('search/setSearch', value)
		},
	}
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.search
	position absolute
	left 0
	right 0
	top 100%
	background var(--color-background)
	display flex
	transform translateY(-100%)
	visibility hidden
	opacity 0
	transition .35s ease-in-out

	&.is-active
		visibility visible
		transform translateY(0)
		transition .25s ease-in-out
		opacity 1

.search-input
	flex 1
	padding 0 3rem 0 2.5rem
	height 3.5em
	outline 0
	border 1px solid var(--shadow)
	border-left 0
	border-right 0
	&:focus
		border-color var(--color-primary)
		box-shadow 0 0 2px var(--color-primary)

.icon-location
	position absolute
	left .7rem
	top 0
	bottom 0
	line-height 3em

.search-cta
	position absolute
	top 0
	right 0
	bottom 0
	display flex
	outline 0

.search-btn
	background none
	border 0
	cursor pointer
	flex 1
	padding 0 .2rem
	&:hover
	&:focus
		outline 0
		color var(--color-primary)

.search-close
	padding-right 1rem
	font-size 1.15rem
</style>

<style lang="stylus">
.ap-input-icon
	display none !important
</style>
