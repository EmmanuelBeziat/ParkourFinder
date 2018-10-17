<template>
	<IconButton icon="icon-help" :text="this.$store.state.languages.lang.site.nav.about" @action="showAbout()" />
</template>

<script>
import { app } from '@/config'
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
				text: `<div class="app-ver">version: ${app.version} (alpha)</div>
					<h4 class="title-small">${this.$store.state.languages.lang.about.privacy.title}</h4>
					${this.$store.state.languages.lang.about.privacy.text}

					<h4 class="title-small">${this.$store.state.languages.lang.about.author.title}</h4>
					${this.$store.state.languages.lang.about.author.text}`,
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

.heart
	color var(--color-primary)
</style>
