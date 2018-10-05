<template>
	<modal class="vue-dialog" name="new-spot" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title"><i class="icon-location" aria-hidden="true"></i>{{ texts.form.title }}</h3>
			<div class="dialog-c-text">
				<form>
					<div class="form-group">
						<label for="spot-add-title" class="sr-only">{{ texts.form.name }}</label>
						<input type="text" id="spot-add-title" class="form-control" :placeholder="texts.form.name" required ref="title" @change="formFieldChange">
					</div>
					<div class="form-group">
						<label for="spot-add-description" class="sr-only">{{ texts.form.description }}</label>
						<textarea id="spot-add-description" class="form-control" :placeholder="texts.form.description" required ref="desc" @change="formFieldChange"></textarea>
					</div>

					<div class="img-uploader">
						<UploadImages ref="uploader" />
					</div>
				</form>
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<ModalButton icon="icon-cancel" :text="texts.form.buttons.cancel" @action="closeModal" />
			<ModalButton icon="icon-ok" :text="texts.form.buttons.confirm" @action="submitForm" />
		</div>
	</modal>
</template>

<script>
import Vue from 'vue'
import UploadImages from '@/components/upload/UploadImages'
import ModalButton from '@/components/buttons/ModalButton'

export default {
	data () {
		return {
			formHasErrors: false,
			texts: this.$store.state.languages.lang.modal.spot.add
		}
	},

	components: {
		ModalButton,
		UploadImages,
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
			const data = {
				title: values.title,
				description: values.description,
				location: {
					city: this.$store.state.position.infos.city,
					country: this.$store.state.position.infos.country,
					lat: this.$store.state.position.coords.latitude,
					lng: this.$store.state.position.coords.longitude,
					complementary: this.$store.state.position.infos.complementary
				},
				newMedias: [],
			}
			let picturesURI = null
			let config = {}

			if (this.$refs.uploader.pictures) {
				picturesURI = this.$refs.uploader.picturesURI
				config = {
					onUploadProgress: progressEvent => {
						this.$refs.uploader.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
					}
				}

				this.$refs.uploader.pictures.forEach((picture, index) => {
					data.newMedias.push({ filename: picture.name, uri: picturesURI[index] })
				})
			}

			Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
			Vue.axios.post('https://rest.parkourfinder.com/spots', data, config)
				.then(res => {
					// this.$store.dispatch('spots/addSpot', res.data)
					this.$store.dispatch('spots/init')
					this.closeModal()
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.texts.error.title,
						text: `${this.texts.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [
							{
								title: this.texts.error.buttons.close
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

<style lang="stylus" scoped>
.img-uploader
	margin-top 25px
</style>
