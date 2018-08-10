<template>
	<modal class="vue-dialog" name="spot-pictures" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title"><i class="icon-picture" aria-hidden="true"></i> {{ texts.title }}</h3>
			<div class="dialog-c-text">
				{{ texts.text }}<br>
				{{ texts.formats }} jpeg, png

				<form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
					<div class="cta-images">
						<button class="btn btn--lg btn--primary" :disabled="isSaving" @click="$refs.fileUploader.click()">
							<i class="icon-upload" aria-hidden="true"></i> {{ texts.cta }}
						</button>

						<input class="sr-only" ref="fileUploader" :disabled="isSaving" :name="uploadInput" type="file" accept="image/*capture=camera" multiple @change="onChangeInput($event.target.name, $event.target.files); fileCount = $event.target.files.length">
					</div>
				</form>
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<button class="vue-dialog-button" @click="closeModal">
				<i class="icon-cancel" aria-hidden="true"></i> {{ texts.buttons.cancel }}
			</button>
			<button class="vue-dialog-button" @click="uploadPictures">
				<i class="icon-ok" aria-hidden="true"></i> {{ texts.buttons.confirm }}
			</button>
		</div>
	</modal>
</template>

<script>
import Vue from 'vue'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
	data () {
		return {
			uploadedFiles: [],
			uploadError: null,
			currentStatus: null,
			uploadFieldName: pictures,
			texts: this.$store.state.languages.lang.modal.spot.pictures
		}
	},

	computed: {
		isInitial () {
			return this.currentStatus === STATUS_INITIAL
		},

		isSaving () {
			return this.currentStatus === STATUS_SAVING
		},

		isSuccess () {
			return this.currentStatus === STATUS_SUCCESS
		},

		isFailed () {
			return this.currentStatus === STATUS_FAILED
		}
	},

	mounted () {
		this.reset()
	},

	methods: {
		closeModal () {
			this.$modal.hide('spot-pictures')
		},

		/**
		 * Reset form to initial sate
		 */
		reset () {
			this.currentStatus = 0;
			this.uploadedFiles = [];
			this.uploadError = null;
		},

		save (formData) {
			this.currentStatus = STATUS_SAVING

			this.pictures.forEach(picture => {
				const fd = new FormData()
				fd.append('image', picture, picture.name)
				/*
				Vue.axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
				Vue.axios.post('https://rest.parkourfinder.com/medias', fd)
					.then(res => {
						console.log(rest)
					})
				*/
			})
		},

		/**
		 * Handle files changes
		 * @param filename String
		 * @param fileList Object fileList
		 */
		onChangeInput (filename, fileList) {
			// Abort if field is empty
			if (!fileList.length) {
				return
			}

			const formData = new FormData()

			Array
				.from(Array(fileList.length).keys())
				.map(x => {
					formData.append(fieldName, fileList[x], fileList[x].name)
				})

			this.save(formData)
		}
	}
}
</script>

<style lang="stylus" scoped>
.cta-images
	text-align center
	margin 1.5em 0 1em
</style>
