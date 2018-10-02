/* import Vue from 'vue'
import store from './GalleryStore'

Vue.directive('gallery', {
	bind (element, binding) {
		const index = store.addImage(element.getAttribute('href'))
		element.addEventListener('click', event => {
			event.preventDefault()
			store.open(index)
		})
	}
})
 */
import Vue from 'vue'
import store from '@/store/index.js'

Vue.directive('gallery', {
	bind (element, binding) {
		store.dispatch('gallery/addImage', element.getAttribute('href'))
		element.addEventListener('click', event => {
			event.preventDefault()
			store.dispatch('gallery/open', element.getAttribute('data-id'))
		})
	}
})

