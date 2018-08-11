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

				<form enctype="multipart/form-data" novalidate>
					<div class="cta-images">
						<button type="button" class="btn btn--lg btn--primary" @click="$refs.fileUploader.click()">
							<i class="icon-upload" aria-hidden="true"></i> {{ texts.cta }}
						</button>

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

export default {
	data () {
		return {
			pictures: [],
			picturesPreview: [],
			texts: this.$store.state.languages.lang.modal.spot.pictures
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
			this.pictures = []
			this.picturesPreview = []
		},

		/**
		 * Send the files to be stored
		 */
		upload () {
			let fd = new FormData()
			this.pictures.forEach((picture, i) => {
				fd.append(picture.name, picture)
			})

			/*
			Vue.axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
			Vue.axios.post('https://rest.parkourfinder.com/medias, fd)
				.then(res) {
					console.log(res)
					this.reset()
					this.closeModal()
				}
				.catch(error) {
					console.error(error)
				}
			*/
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
			// Abort if field is empty
			if (!fileList.length) {
				return
			}

			Array.from(fileList).forEach(file => {
				this.pictures.push(file)
				this.picturesPreview.push(URL.createObjectURL(file))
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
</style>
