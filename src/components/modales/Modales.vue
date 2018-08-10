<template>
	<div class="modales">
		<v-dialog />

		<ModaleSpotNew />
		<ModaleSpotEdit />
		<ModalePictures />
	</div>
</template>

<script>
import ModaleSpotNew from '@/components/modales/spots/New'
import ModaleSpotEdit from '@/components/modales/spots/Edit'
import ModalePictures from '@/components/modales/spots/Images'

export default {
	components: {
		ModaleSpotNew,
		ModaleSpotEdit,
		ModalePictures
	}
};
</script>

<style lang="stylus" scoped>
.modales
	z-index 1000
</style>
