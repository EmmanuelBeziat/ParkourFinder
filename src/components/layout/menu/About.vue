<template>
	<IconButton icon="icon-help" :text="this.$store.state.languages.lang.site.nav.about" @action="showAbout()" />
</template>

<script>
import IconButton from '@/components/buttons/IconButton'

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

	components: {
		IconButton
	},

	methods: {
		showAbout () {
			this.$modal.show('dialog', {
				title: this.$store.state.languages.lang.about.title,
				text: `<div class="app-ver">version: ${this.$store.state.app.version} (alpha)</div>${this.$store.state.languages.lang.about.author}`,
				buttons: [
					{ title: `<i class="icon-bug" aria-hidden="true"></i> ${this.$store.state.languages.lang.about.buttons.bug}`, handler: () => { this.reportBug() } },
					{ title: `<i class="icon-cancel" aria-hidden="true"></i> ${this.$store.state.languages.lang.about.buttons.close}` }
				]
			})
		},
		reportBug () {
			location.href = 'https://github.com/EmmanuelBeziat/parkourfinder/issues/new'
		}
	}
}
</script>

<style lang="stylus" scope>
.app-ver
	margin-bottom 1em
</style>
