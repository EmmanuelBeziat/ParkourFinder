class GalleryStore {
	constructor() {
		this.state = {
			images: [],
			index: null
		}
	}

	addImage (url) {
		return this.state.images.push(url) - 1
	}

	open (index) {
		this.state.index = index
	}

	close () {
		this.state.index = null
	}

	prev () {
		this.state.index--

		if (this.state.index < 0) {
			this.state.index = this.state.images.length - 1
		}
	}

	next () {
		this.state.index++

		if (this.state.index >= this.state.images.length) {
			this.state.index = 0
		}
	}
}

export default new GalleryStore()
