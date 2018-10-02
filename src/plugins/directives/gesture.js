import Vue from 'vue'

const emit = (vnode, name, data) => {
	const handlers = (vnode.data && vnode.data.on) ||
		(vnode.componentOptions && vnode.componentOptions.listeners);

	if (handlers && handlers[name]) {
		handlers[name].fns(data);
	}
}

Vue.directive('gesture', (el, binding, vnode) => {
	el.addEventListener('touchstart', event => { start(event.touches[0].clientX, event.touches[0].clientY) }, false)
	el.addEventListener('touchmove', event => { swipe(event.touches[0].clientX, event.touches[0].clientY) }, false)
	el.addEventListener('mousedown', event => { start(event.clientX, event.clientY) }, false)
	el.addEventListener('mousemove', event => { swipe(event.clientX, event.clientY) }, false)

	let xDown = null
	let yDown = null

	function start (x, y) {
		xDown = x
		yDown = y
	}

	function swipe (xUp, yUp) {
		if (!xDown || !yDown) return

		const xDiff = xDown - xUp
		const yDiff = yDown - yUp

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			// Left swipe
			if (xDiff > 0) {
				// vnode.context.$emit('swipeleft')
				emit(vnode, 'swipeleft')
			}
			// Right swipe
			else {
				vnode.context.$emit('swiperight')
				emit(vnode, 'swiperight')
			}
		}

		xDown = null
		yDown = null
	}
})
