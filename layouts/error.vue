<template>
	<div class="site">
		<ui-header/>
		<main class="main">
			<h1 v-if="error.statusCode === 404">{{ $('error.404.title') }}</h1>

		</main>
	</div>
</template>

<script>
import UiHeader from '~/components/Header.vue'

export default {
	props: ['error'],

	components: {
		UiHeader
	}
}
</script>
