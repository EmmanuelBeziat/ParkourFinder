<template>
	<modal class="vue-dialog" name="new-spot" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title"><i class="icon-location" aria-hidden="true"></i>{{ texts.title }}</h3>
			<div class="dialog-c-text">
				<form>
					<div class="form-group">
						<label for="spot-add-title" class="sr-only">{{ texts.name }}</label>
						<input type="text" id="spot-add-title" class="form-control" :placeholder="texts.name" required ref="title" @change="formFieldChange">
					</div>
					<div class="form-group">
						<label for="spot-add-description" class="sr-only">{{ texts.description }}</label>
						<textarea id="spot-add-description" class="form-control" :placeholder="texts.description" required ref="desc" @change="formFieldChange"></textarea>
					</div>
				</form>
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<ModalButton icon="icon-cancel" :text="texts.buttons.cancel" @action="closeModal" />
			<ModalButton icon="icon-ok" :text="texts.buttons.confirm" @action="submitForm" />
		</div>
	</modal>
</template>

<script>
import Vue from 'vue'
import ModalButton from '@/components/buttons/ModalButton'

export default {
	data () {
		return {
			formHasErrors: false,
			texts: this.$store.state.languages.lang.modal.spot.add.form
		}
	},

	components: {
		ModalButton
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
			const datas = {
				title: values.title,
				description: values.description,
				location: {
					city: this.$store.state.position.infos.city,
					country: this.$store.state.position.infos.country,
					lat: this.$store.state.position.coords.latitude,
					lng: this.$store.state.position.coords.longitude,
					complementary: this.$store.state.position.infos.complementary
				}
			}

			Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
			Vue.axios.post('https://rest.parkourfinder.com/spots', datas)
				.then(res => {
					// this.$store.commit('spots/addSpot', res.data)
					this.$store.dispatch('spots/init')
					this.closeModal()
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.$store.state.languages.lang.modal.spot.add.error.title,
						text: `${this.$store.state.languages.lang.modal.spot.add.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [
							{
								title: this.$store.state.languages.lang.modal.spot.add.error.buttons.close
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
