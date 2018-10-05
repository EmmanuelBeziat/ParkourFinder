<template>
	<modal class="vue-dialog" name="spot-pictures" :delay="250" height="auto" :clickToClose="false">
		<div class="dialog-content">
			<h3 class="dialog-c-title"><i class="icon-picture" aria-hidden="true"></i> {{ texts.title }}</h3>
			<div class="dialog-c-text">
				<UploadImages ref="uploader" />
			</div>
		</div>

		<div class="vue-dialog-buttons">
			<ModalButton @action="closeModal" icon="icon-cancel" :text="texts.buttons.cancel" />
			<ModalButton @action="upload" icon="icon-ok" :text="texts.buttons.confirm" />
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
			texts: this.$store.state.languages.lang.modal.spot.pictures
		}
	},

	components: {
		UploadImages,
		ModalButton,
	},

	methods: {
		closeModal () {
			this.$refs.uploader.reset()
			this.$modal.hide('spot-pictures')
		},

		/**
		 * Send the files to be stored
		 */
		upload () {
			const spot = this.$store.state.spots.currentSpot
			const picturesURI = this.$refs.uploader.picturesURI
			const data = {
				title: spot.title,
				location: spot.location,
				description: spot.description,
				team: spot.team,
				medias: spot.medias,
				newMedias: []
			}
			const newImages = spot.medias.slice(0)
			const config = {
				onUploadProgress: progressEvent => {
					this.$refs.uploader.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				}
			}

			this.$refs.uploader.pictures.forEach((picture, index) => {
				data.newMedias.push({ filename: picture.name, uri: picturesURI[index] })
				newImages.push([picturesURI[index]])
			})

			Vue.axios.put(`https://rest.parkourfinder.com/spots/${spot._id}`, data, config)
				.then(() => {
					spot.medias = newImages
				})
				.catch(error => console.log(error))
				.then(() => this.closeModal())
		},
	}
}
</script>
