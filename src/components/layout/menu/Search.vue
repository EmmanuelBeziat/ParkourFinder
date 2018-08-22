<template>
	<IconButton icon="icon-search" :text="this.$store.state.languages.lang.site.nav.search" @action="$emit('action')" />
</template>

<script>
import IconButton from '@/components/buttons/IconButton'


export default {
	name: 'MenuSearch',

	components: {
		IconButton
	},
}
</script>
