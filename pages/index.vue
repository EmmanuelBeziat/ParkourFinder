<template>

</template>

<script>
export default {
	name: 'index',
	head () {
		return {
			title: 'Home'
		}
	},

	transition (to, from) {
		if (!from) return 'slide-left'
		return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
	}
}
</script>
