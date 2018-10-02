<template>
	<div class="modales">
		<v-dialog />

		<ModaleSpotNew />
		<ModalePictures />
	</div>
</template>

<script>
import ModaleSpotNew from '@/components/modales/spots/New'
import ModalePictures from '@/components/modales/spots/Images'

export default {
	components: {
		ModaleSpotNew,
		ModalePictures
	}
};
</script>

<style lang="stylus" scoped>
.modales
	z-index 2010
</style>
