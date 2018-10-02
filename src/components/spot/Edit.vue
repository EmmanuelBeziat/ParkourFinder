<template>
	<div class="spot-content-loaded">
		<div class="spot-body">
			<div class="form-group">
				<label for="spot-add-title">{{ texts.name }}</label>
				<input type="text" id="spot-add-title" class="form-control" :placeholder="texts.name" required ref="title" @change="formFieldChange" :value="spot.title">
			</div>

			<div class="form-group">
				<label for="spot-add-description">{{ texts.description }}</label>
				<textarea id="spot-add-description" class="form-control" :placeholder="texts.description" required ref="desc" @change="formFieldChange" v-model="spot.description"></textarea>
			</div>

			<div class="form-group">
				<label>Check pictures to remove</label>
				<div class="spot-gallery">
					<label class="spot-gallery-item" :class="{ 'checked': checkedPictures[pictureIndex] }" v-for="(picture, pictureIndex) in spot.medias" :key="pictureIndex">
						<div class="picture-state">
							<input type="checkbox" :id="pictureIndex" :value="picture[0]" v-model="checkedPictures">
						</div>
						<img class="spot-gallery-img" :src="picture[0].replace('.com/', '.com/min/')" :alt="spot.title">
					</label>
				</div>
			</div>
		</div>

		<footer class="spot-complementary">
			<div class="spot-actions">
				<IconButton icon="icon-cancel" :text="texts.buttons.cancel" @action="$emit('close')" />
				<IconButton icon="icon-ok" :text="texts.buttons.confirm" @action="submitForm" />
			</div>
		</footer>
	</div>
</template>

<script>
import Vue from 'vue'
import IconButton from '@/components/buttons/IconButton'

export default {
	props: ['spot'],

	data () {
		return {
			formHasErrors: false,
			texts: this.$store.state.languages.lang.modal.spot.edit.form,
			checkedPictures: []
		}
	},

	components: {
		IconButton,
	},

	methods: {
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
					this.$store.dispatch('spots/init')
					this.$emit('close')
				})
				.catch(error => {
					this.$modal.show('dialog', {
						title: this.texts.error.title,
						text: `${this.texts.error.text}\n\n${error.code}: ${error.message}`,
						buttons: [
							{ title: this.texts.error.buttons.close }
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
	}
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

label
	display block
	font-size 80%
	color var(--color-primary)

.form-group + .form-group
	margin-top 30px

.spot-content-loaded
	display grid
	grid-template-rows auto 1fr auto
	height 100%

.spot-body
	overflow-y auto

.spot-actions
	margin-left auto

.spot-complementary
	padding-top 1rem
	margin-top 1rem
	border-top 1px solid var(--shadow)

	@media $mq-tablet
		display flex

.spot-gallery
	display grid
	grid-gap 5px
	grid-template-columns 1fr 1fr
	margin 1rem 0

	@media $mq-tablet
		grid-template-columns 1fr 1fr 1fr 1fr

.spot-gallery-item
	max-height 180px
	padding 4px
	border 1px solid var(--shadow)
	overflow hidden
	position relative

	&.checked
		border-color var(--color-primary)
		transition color .2s ease-in

.picture-state
	position absolute
	right 6px
	top 0

.spot-gallery-img
	display block
	max-width 100%
	object-fit cover
	object-position 50% 50%
	transition .25s ease-in-out
</style>
