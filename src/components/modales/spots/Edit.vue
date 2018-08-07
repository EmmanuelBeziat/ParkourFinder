<template>
	<modal v-if="spot !== null" class="vue-dialog" name="edit-spot" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title">
				<i class="icon-edit" aria-hidden="true"></i>{{ this.$store.state.languages.lang.modal.spot.edit.form.title }}</h3>
			<div class="dialog-c-text">
				<form>
					<div class="form-group">
						<label for="spot-edit-title" class="sr-only">{{ this.$store.state.languages.lang.modal.spot.edit.form.name }}</label>
						<input type="text" id="spot-edit-title" class="form-control" :placeholder="this.$store.state.languages.lang.modal.spot.edit.form.name" :value="spot.title" required ref="title" @change="formFieldChange">
					</div>

					<div class="form-group">
						<label for="spot-edit-description" class="sr-only">{{ this.$store.state.languages.lang.modal.spot.edit.form.description }}</label>
						<textarea id="spot-edit-description" class="form-control" :placeholder="this.$store.state.languages.lang.modal.spot.edit.form.description" :value="spot.description" required ref="desc" @change="formFieldChange"></textarea>
					</div>
				</form>
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<button class="vue-dialog-button" @click="closeModal">
				<i class="icon-left-open" aria-hidden="true"></i> {{ this.$store.state.languages.lang.modal.spot.edit.form.buttons.cancel }}
			</button>
			<button class="vue-dialog-button" @click="submitForm">{{ this.$store.state.languages.lang.modal.spot.edit.form.buttons.confirm }}
				<i class="icon-right-open" aria-hidden="true"></i>
			</button>
		</div>
	</modal>
</template>

<script>
import Vue from 'vue'

export default {
	data () {
		return {
			formHasErrors: false,
		}
	},

	computed: {
		spot () {
			return this.$store.state.spots.currentSpot
		}
	},

	methods: {
		closeModal () {
			this.$modal.hide('edit-spot')
		},

		/**
		 * Send datas from the form and the store to the API
		 * @param values object { title, description, location { city, country, lat, lng } }
		 */
		sendDatasToAPI (values) {
			const datas = {
				title: values.title,
				description: values.description
			}

			Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
			Vue.axios.put(`https://rest.parkourfinder.com/spots/${this.spot._id}`, datas)
				.then(() => {
					this.$store.dispatch('map/init')
					this.closeModal()
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.$store.state.languages.lang.modal.spot.edit.error.title,
						text: `${this.$store.state.languages.lang.modal.spot.edit.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [
							{ title: this.$store.state.languages.lang.modal.spot.edit.error.buttons.close }
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
