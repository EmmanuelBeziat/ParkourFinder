<template>
	<modal class="vue-dialog" name="new-spot" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title"><i class="icon-location" aria-hidden="true"></i>{{ this.$store.state.lang.modal.newspot.form.title }}</h3>
			<div class="dialog-c-text">
				<form>
					<div class="form-group">
						<label for="nom" class="sr-only">{{ this.$store.state.lang.modal.newspot.form.name }}</label>
						<input type="text" id="nom" class="form-control" :placeholder="this.$store.state.lang.modal.newspot.form.name" required ref="title" @change="formChange">
					</div>
					<div class="form-group">
						<label for="nom" class="sr-only">{{ this.$store.state.lang.modal.newspot.form.description }}</label>
						<textarea id="description" class="form-control" :placeholder="this.$store.state.lang.modal.newspot.form.description" required ref="desc" @change="formChange"></textarea>
					</div>
				</form>
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<button class="vue-dialog-button" @click="closeModal"><i class="icon-left-open" aria-hidden="true"></i> {{ this.$store.state.lang.modal.newspot.form.cancel }}</button>
			<button class="vue-dialog-button" @click="submitForm">{{ this.$store.state.lang.modal.newspot.form.validate }} <i class="icon-right-open" aria-hidden="true"></i></button>
		</div>
	</modal>
</template>

<script>
export default {
	data () {
		return {
			formErrors: false
		}
	},

	methods: {
		/**
		 * Send datas from the form and the store to the API
		 */
		sendDatas (values) {
			const that = this
			const datas = {
				title: values.title,
				description: values.description,
				location: {
					city: that.$store.state.position.infos.city,
					country: that.$store.state.position.infos.country,
					lat: that.$store.state.position.coords.latitude,
					lng: that.$store.state.position.coords.longitude
				}
			}

			that.$axios.setHeader('Content-Type', 'application/json')
			that.$axios.post(process.env.api.spots, datas)
				.then(res => {
					that.$store.dispatch('map/init')
					that.$modal.hide('new-spot')
				})
				.catch(err => {
					console.error(err.message)
				})
		},

		/**
		 * Call for form validation when detecting changes in the form fields
		 */
		formChange (event) {
			this.formValidate(event.target)
		},

		/**
		 * Form validation
		 * Check for errors
		 */
		formValidate (field) {
			if (field.value === '' || field.value === undefined) {
				field.classList.add('has-error')
				this.formErrors = true
			}
			else {
				field.classList.remove('has-error')
				this.formErrors = false
			}
		},

		/**
		 * Form submission
		 * Check for validation
		 */
		submitForm () {
			const title = this.$refs.title
			const desc = this.$refs.desc

			this.formValidate(title)
			this.formValidate(desc)

			if (this.formErrors) {
				return
			}

			this.sendDatas({
				title: title.value,
				description: desc.value
			})
		}
	}
}
</script>
