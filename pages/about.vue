<template>
	<section class="about">
		<div class="container">
			<h1>About</h1>
		</div>
	</section>
</template>

<script>
export default {
	name: 'about',
	layout: 'about',
	head () {
		return {
			title: 'About'
		}
	}
}
</script>

<style lang="stylus">
.about
	flex 1
</style>
