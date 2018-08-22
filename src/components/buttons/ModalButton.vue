<template>
	<button class="vue-dialog-button" @click="$emit('action')">
		<i :class="icon" aria-hidden="true"></i> {{ text}}
	</button>
</template>

<script>
export default {
	name: 'ModalButton',
	props: ['text', 'icon']
}
</script>
