<template>
	<section class="spot">
		<Loader v-if="loading" />
		<Error v-if="error" :message="error" />
		<Spot v-if="spot" :spot="spot" :texts="this.$store.state.languages.lang.spot" />
	</section>
</template>

<script>
import Vue from 'vue'
import Spot from '@/components/spot/Spot'
import Error from '@/components/spot/Error'
import Loader from '@/components/spot/Loader'

export default {
	name: 'spot',

	data () {
		return {
			loading: false,
			spot: null,
			error: null
		}
	},

	components: {
		Spot,
		Error,
		Loader
	},

	validate ({ params }) {
		return isNaN(params.slug)
	},

	watch: {
		'$route': 'fetchData'
	},

	created () {
		this.fetchSpot()
	},

	methods: {
		fetchSpot () {
			this.error = this.post = null
			this.loading = true

			Vue.axios.get(`https://rest.parkourfinder.com/spots/${this.$route.params.slug}`)
				.then(response => {
					this.spot = response.data
					this.$store.commit('spots/setCurrentSpot', this.spot)
				})
				.catch(err => {
					this.error = err
				})
				.then(() => {
					this.loading = false
				})

			// pb avec le getter : si la page spot est chargée directement, le store est vide au moment de l'appel
			// this.$store.getters['spots/getSpotBySlug'](this.$route.params.slug)
			this.setCurrentSpot()
		},

		/**
		 * update the store witht the current consulted spot
		 */
		setCurrentSpot () {
			this.$store.commit('spots/setCurrentSpot', this.spot)
		},
	}
}
</script>
