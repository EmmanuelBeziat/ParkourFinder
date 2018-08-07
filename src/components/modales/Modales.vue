<template>
	<div class="modales">
		<v-dialog />

		<ModaleSpotNew />
		<ModaleSpotEdit />
	</div>
</template>

<script>
import ModaleSpotNew from '@/components/modales/spots/New';
import ModaleSpotEdit from '@/components/modales/spots/Edit';

export default {
	components: {
		ModaleSpotNew,
		ModaleSpotEdit
	}
};
</script>

<style lang="stylus" scoped>
.modales
	z-index 1000
</style>
