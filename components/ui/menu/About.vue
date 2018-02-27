<template>
	<button class="btn btn--icon" :data-tooltip="this.$store.state.lang.site.nav.about" @click="about()">
		<i class="icon-help" aria-hidden="true"></i><div class="sr-only">{{ this.$store.state.lang.site.nav.about }}</div>
	</button>
</template>

<script>
export default {
	name: 'About',

	data() {
		return {
			modal: {}
		};
	},

	created() {
		this.modal = this.$modal;
	},

	methods: {
		about () {
			this.$modal.show('dialog', {
				title: this.$store.state.lang.about.title,
				text: this.$store.state.lang.about.author,
				buttons: [
					{ title: this.$store.state.lang.about.buttons[0], handler: () => { this.reportBug() } },
					{ title: this.$store.state.lang.about.buttons[1] }
				]
			});
		},

		reportBug () {
			location.href = 'https://github.com/EmmanuelBeziat/parkourfinder/issues/new'
		}
	}
};
</script>
