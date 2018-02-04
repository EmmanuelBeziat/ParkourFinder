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
const api = 'https://rest.parkourfinder.com/spots'

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
				description: desc.value
			})
		},

		sendDatas (values) {
			const that = this
			const datas = {
				title: values.title,
				description: values.description,
				location: {
					city: this.$store.state.position.coords.city,
					country: this.$store.state.position.coords.country,
					lat: this.$store.state.position.coords.lat,
					lng: this.$store.state.position.coords.lng
				}
			}

			const headers = {
				headers: {
					// Authorization: 'Bearer {token}',
					'Content-Type': 'application/json'
				}
			}

			// let marker = L.marker([datas.location.lat, datas.location.lng]).addTo(mymap);

			/*
			that.$axios.post(api, datas, headers)
				.then(res => {
					that.closeModal()
				})
				.catch(err => {
					console.error(err.message)
				})
			*/
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
