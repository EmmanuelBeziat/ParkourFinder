<template>
	<button class="btn btn--icon" :data-tooltip="this.$store.state.languages.lang.site.nav.about" @click="showAbout()">
		<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.languages.lang.site.nav.about }}</div>
	</button>
</template>

<script>
export default {
	name: 'About',

	data () {
		return {
			modal: {}
		}
	},
	created () {
		this.modal = this.$modal
	},

	methods: {
		showAbout () {
			this.$modal.show('dialog', {
				title: this.$store.state.languages.lang.about.title,
				text: `<div class="app-ver">version: ${this.$store.state.app.version} (alpha)</div>${this.$store.state.languages.lang.about.author}`,
				buttons: [
					{ title: this.$store.state.languages.lang.about.buttons.bug, handler: () => { this.reportBug() } },
					{ title: this.$store.state.languages.lang.about.buttons.close }
				]
			})
		},
		reportBug () {
			location.href = 'https://github.com/EmmanuelBeziat/parkourfinder/issues/new'
		}
	}
}
</script>

<style lang="stylus">
.app-ver
	margin-bottom 1em
</style>
