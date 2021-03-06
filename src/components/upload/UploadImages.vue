<template>
	<div class="upload-images">
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
				<transition name="fade" mode="out-in">
					<div v-if="progress" class="progress-bar">
						<Progress :value="progress" max="100" />

						<div class="progress-message">
							<span class="progress-current" v-if="!progressFail">{{ texts.progress }} ({{ progress - 1 }}%)</span>
							<span class="progress-fail" v-else>{{ texts.fail }}</span>
						</div>
					</div>

					<button v-else type="button" class="btn btn--primary" @click="$refs.fileUploader.click()">
						<i class="icon-upload" aria-hidden="true"></i> {{ texts.cta }}
					</button>
				</transition>

				<input class="sr-only" ref="fileUploader" type="file" accept="image/*capture=camera" multiple @change="onChangeInput($event.target.files)">
			</div>
		</form>
	</div>
</template>

<script>
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
			texts: this.$store.state.languages.lang.modal.spot.pictures
		}
	},

	components: {
		Progress,
	},

	mounted () {
		this.reset()
	},

	methods: {
		/**
		 * Reset form to initial sate
		 */
		reset () {
			this.pictures = []
			this.picturesPreview = []
			this.picturesURI = []
			this.progress = null
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

			if ((this.$store.state.spots.currentSpot && list.length + this.$store.state.spots.currentSpot.medias.length) > 4) {
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

	button
		--btn-padding .5em 1em
		@media $mq-tablet
			--btn-font-size 1.25rem
			--btn-padding .5em 2em

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

