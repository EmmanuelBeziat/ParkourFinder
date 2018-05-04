<template>
	<modal class="vue-dialog" name="new-spot" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title"><i class="icon-location" aria-hidden="true"></i>{{ this.$store.state.lang.modal.spot.add.form.title }}</h3>
			<div class="dialog-c-text">
				<form>
					<div class="form-group">
						<label for="spot-add-title" class="sr-only">{{ this.$store.state.lang.modal.spot.add.form.name }}</label>
						<input type="text" id="spot-add-title" class="form-control" :placeholder="this.$store.state.lang.modal.spot.add.form.name" required ref="title" @change="formFieldChange">
					</div>
					<div class="form-group">
						<label for="spot-add-description" class="sr-only">{{ this.$store.state.lang.modal.spot.add.form.description }}</label>
						<textarea id="spot-add-description" class="form-control" :placeholder="this.$store.state.lang.modal.spot.add.form.description" required ref="desc" @change="formFieldChange"></textarea>
					</div>
				</form>
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<button class="vue-dialog-button" @click="closeModal"><i class="icon-left-open" aria-hidden="true"></i> {{ this.$store.state.lang.modal.spot.add.form.buttons.cancel }}</button>
			<button class="vue-dialog-button" @click="submitForm">{{ this.$store.state.lang.modal.spot.add.form.buttons.confirm }} <i class="icon-right-open" aria-hidden="true"></i></button>
		</div>
	</modal>
</template>

<script>
export default {
	data () {
		return {
			formHasErrors: false
		}
	},

	methods: {
		closeModal () {
			this.$modal.hide('new-spot')
		},

		/**
		 * Send datas from the form and the store to the API
		 * @param values object { title, description, location { city, country, lat, lng } }
		 */
		sendDatasToAPI (values) {
			const that = this
			const datas = {
				title: values.title,
				description: values.description,
				location: {
					city: that.$store.state.position.infos.city,
					country: that.$store.state.position.infos.country,
					lat: that.$store.state.position.coords.latitude,
					lng: that.$store.state.position.coords.longitude,
					complementary: that.$store.state.position.infos.complementary
				}
			}

			that.$axios.setHeader('Content-Type', 'application/json')
			that.$axios
				.post(process.env.api.spots, datas)
				.then(res => {
					that.$store.dispatch('map/init')
					that.closeModal()
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.$store.state.lang.modal.spot.add.error.title,
						text: `${this.$store.state.lang.modal.spot.add.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [
							{
								title: this.$store.state.lang.modal.spot.add.error.buttons.close
							}
						]
					})
				})
		},

		/**
		 * Call for form validation when detecting changes in the form fields
		 */
		formFieldChange (event) {
			this.formFieldValidation(event.target)
		},

		/**
		 * Form validation
		 * Check for errors
		 * @param field DOM object — current field being checked
		 */
		formFieldValidation (field) {
			if (field.value === '' || field.value === undefined) {
				field.classList.add('has-error')
				this.formHasErrors = true
			} else {
				field.classList.remove('has-error')
				this.formHasErrors = false
			}
		},

		/**
		 * Form submission
		 * Check for validation
		 */
		submitForm () {
			const title = this.$refs.title
			const desc = this.$refs.desc

			this.formFieldValidation(title)
			this.formFieldValidation(desc)

			if (this.formHasErrors) {
				return
			}

			this.sendDatasToAPI({
				title: title.value,
				description: desc.value
			})
		}
	}
}
</script>
