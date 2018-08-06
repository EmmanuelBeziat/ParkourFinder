<template>
	<div class="modales">
		<v-dialog />

		<modale-new-spot />
		<modale-edit-spot />
	</div>
</template>

<script>
import modaleNewSpot from '@/components/modales/NewSpot';
import modaleEditSpot from '@/components/modales/EditSpot';

export default {
	components: {
		modaleNewSpot,
		modaleEditSpot
	}
};
</script>

<style lang="stylus" scoped>
.modales
	z-index 1000
</style>
