<template>
	<button class="btn btn--icon btn--map" @click="$emit('action')">
		<i class="icon-target" aria-hidden="true"></i>
		<span class="sr-only">{{ this.$store.state.languages.lang.map.toggle }}</span>
	</button>
</template>
