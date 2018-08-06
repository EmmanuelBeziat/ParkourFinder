import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Spot from './views/Spot.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/spot/:slug',
			name: 'spot',
			component: Spot
		}
	]
})

export default router
