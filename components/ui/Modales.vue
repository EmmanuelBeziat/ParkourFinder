<template>
	<div class="modales">
		<v-dialog/>

		<modale-new-spot/>
	</div>
</template>

<script>
import modaleNewSpot from '~/components/modales/NewSpot'

export default {
	components: {
		modaleNewSpot
	}
}
</script>
