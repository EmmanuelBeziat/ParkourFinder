<template>
	<button class="btn btn--icon" :data-tooltip="text" @click="$emit('action')">
		<i :class="icon" aria-hidden="true"></i>
		<span class="sr-only">{{ text }}</span>
	</button>
</template>

<script>
export default {
	name: 'Button',
	props: ['text', 'icon']
}
</script>

