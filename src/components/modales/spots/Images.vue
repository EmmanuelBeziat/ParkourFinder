<template>
	<modal class="vue-dialog" name="spot-pictures" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title"><i class="icon-picture" aria-hidden="true"></i> {{ texts.title }}</h3>
			<div class="dialog-c-text">
				{{ texts.text }}<br>
				{{ texts.formats }} jpeg, png

				<div class="pictures-preview">
					<div class="picture" v-for="(picture, index) in pictures" :key="index">
						<img :src="picturesPreview[index]" alt="picture.name">
						<button class="btn btn--small" @click="removePicture(index)">
							<i class="icon-trash" aria-hidden="true"></i> Remove
						</button>
					</div>
				</div>

				<div class="warning" v-if="warning">{{ warning }}</div>

				<form enctype="multipart/form-data" novalidate>
					<div class="cta-images">
						<button type="button" class="btn btn--lg btn--primary" @click="$refs.fileUploader.click()">
							<i class="icon-upload" aria-hidden="true"></i> {{ texts.cta }}
						</button>

						<transition name="fade">
							<div v-if="progress" class="progress-bar">
								<Progress :value="progress" max="100" />
								<div class="progress-message">
									<span class="progress-current" v-if="!progressFail">{{ texts.progress }} ({{ progress - 1 }}%)</span>
									<span class="progress-fail" v-if="progressFail">{{ texts.fail }}</span>
								</div>
							</div>
						</transition>

						<input class="sr-only" ref="fileUploader" type="file" accept="image/*capture=camera" multiple @change="onChangeInput($event.target.files)">
					</div>
				</form>
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<button class="vue-dialog-button" @click="closeModal">
				<i class="icon-cancel" aria-hidden="true"></i> {{ texts.buttons.cancel }}
			</button>
			<button class="vue-dialog-button" @click="upload">
				<i class="icon-ok" aria-hidden="true"></i> {{ texts.buttons.confirm }}
			</button>
		</div>
	</modal>
</template>

<script>
import Vue from 'vue'
import encodeImageURI from 'encode-image-uri'
import Progress from '@/components/progress/Progress'

export default {
	data () {
		return {
			pictures: [],
			picturesPreview: [],
			picturesURI: [],
			progress: null,
			progressFail: false,
			warning: false,
			texts: this.$store.state.languages.lang.modal.spot.pictures
		}
	},

	mounted () {
		this.reset()
	},

	components: {
		Progress
	},

	methods: {
		closeModal () {
			this.reset()
			this.$modal.hide('spot-pictures')
		},

		/**
		 * Reset form to initial sate
		 */
		reset () {
			this.pictures = []
			this.picturesPreview = []
			this.picturesURI = []
		},

		/**
		 * Send the files to be stored
		 */
		upload () {
			const spot = this.$store.state.spots.currentSpot
			const data = {
				title: spot.title,
				location: spot.location,
				description: spot.description,
				team: spot.team,
				medias: spot.medias,
				newMedias: []
			}
			const config = {
				onUploadProgress: progressEvent => {
					this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				}
			}

			this.pictures.forEach((picture, index) => {
				data.newMedias.push({ filename: picture.name, uri: this.picturesURI[index] })
			})

			Vue.axios.put(`https://rest.parkourfinder.com/spots/${spot._id}`, data, config)
				.then(() => {
					this.$modal.show('dialog', {
						title: this.texts.success,
						text: `<div class="global-success"><i class="icon-ok" aria-hidden="true"></i></div>`,
						buttons: [
							{ title: this.texts.error.buttons.close }
						]
					})
					this.closeModal()
					this.$store.dispatch('spots/init')
				})
				.catch(error => {
					this.progressFail = true
				})
		},

		/**
		 * Remove a single item from the files and preview
		 * @param index int
		 */
		removePicture (index) {
			this.pictures.splice(index, 1)
			this.picturesPreview.splice(index, 1)
		},

		/**
		 * Handle files changes
		 * @param filename String
		 * @param fileList Object fileList
		 */
		onChangeInput (fileList) {
			const list = Array.from(fileList)

			// Abort if field is empty
			if (!list.length) {
				return
			}

			if (list.length > 4) {
				alert(this.texts.upload_max)
				return
			}

			if ((list.length + this.$store.state.spots.currentSpot.medias.length) > 4) {
				alert(this.texts.files_max)
				return
			}

			list.forEach(file => {
				this.pictures.push(file)
				this.picturesPreview.push(URL.createObjectURL(file))
				encodeImageURI(file).then(uri => {
					this.picturesURI.push(uri)
				})
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/variables.styl'
@require '~@/assets/styles/mixins.styl'

.cta-images
	text-align center
	margin 1.5em 0 1em

.pictures-preview
	display grid
	grid-gap 4px
	grid-template-columns repeat(auto-fit, minmax(100px, 1fr))
	margin 1em 0

.picture
	position relative
	padding 4px
	border 1px solid var(--shadow)

	.btn
		position absolute
		bottom 4px
		right 4px
		padding .25em .5em

	img
		vertical-align top
		max-width 100%
		max-height 100px

.progress-bar
	margin 1rem 0
</style>
