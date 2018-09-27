<template>
	<button class="leaflet-control" @click="$emit('action')" :title="label">
		<i :class="icon" aria-hidden="true"></i>
		<span class="sr-only">{{ label }}</span>
	</button>
</template>

<script>
export default {
	props: ['label', 'icon']
}
</script>
