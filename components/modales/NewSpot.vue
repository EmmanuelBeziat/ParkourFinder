<template>
	<modal class="vue-dialog" name="new-spot" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title">{{ this.$store.state.lang.modal.newspot.form.title }}</h3>
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
					<hr>
					<div class="form-group">
						<label for="nom" class="sr-only">{{ this.$store.state.lang.modal.newspot.form.city }}</label>
						<textarea id="city" class="form-control" :placeholder="this.$store.state.lang.modal.newspot.form.city" required ref="city" @change="formChange"></textarea>
					</div>
					<div class="form-group">
						<label for="nom" class="sr-only">{{ this.$store.state.lang.modal.newspot.form.country }}</label>
						<textarea id="country" class="form-control" :placeholder="this.$store.state.lang.modal.newspot.form.country" required ref="country" @change="formChange"></textarea>
					</div>
				</form>
			</div>
		</div>
		<div class="dialog-buttons">
			<button @click="closeModal"><i class="icon-left-open" aria-hidden="true"></i> {{ this.$store.state.lang.modal.newspot.form.cancel }}</button>
			<button @click="submitForm">{{ this.$store.state.lang.modal.newspot.form.validate }} <i class="icon-right-open" aria-hidden="true"></i></button>
		</div>
	</modal>
</template>

<script>
import axios from 'axios'

const api = `http://localhost:3030/spots`

export default {
	data () {
		return {
			formErrors: false
		}
	},

	methods: {
		closeModal () {
			this.$modal.hide('new-spot')
		},

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
				description: desc.value,
				city: city.value,
				country: country.value
			})
		},

		getCoords () {
			function success (position) {
				return { lat: position.coords.latitude, lng: position.coords.longitude }
			}

			function error (error) {
				console.log(`Error ${error.code}: ${error.message}`)
			}

			if (process.browser && 'geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(success, error)
			}
			else {
				return { lat: 42.6991088, lng: 2.8694822 }
			}
		},

		sendDatas (values) {
			const datas = {
				title: values.title,
				description: values.description,
				location: {
					city: values.city,
					country: values.country,
					lat: 42.6991088,
					lng: 2.8694822
				}
			}

			const headers = {
				headers: {
					// Authorization: 'Bearer {token}',
					'Content-Type': 'application/json'
				}
			}

			axios.post(api, datas, headers)
				.then(res => {
					console.log(res.data)
				})
				.catch(err => {
					console.error(err.message)
				})
		},

		formChange (event) {
			this.formValidate(event.target)
		},

		formValidate (field) {
			if (field.value === '' || field.value === undefined) {
				field.classList.add('has-error')
				this.formErrors = true
			}
			else {
				field.classList.remove('has-error')
				this.formErrors = false
			}
		}
	}
}
</script>
