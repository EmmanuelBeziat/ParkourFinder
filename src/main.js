import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import head from 'vue-head'

import './registerServiceWorker'
import './plugins/index'

Vue.config.productionTip = false

// Init store
store.dispatch('spots/init')
store.dispatch('languages/init')

new Vue({
	router,
	head,
	store,
	render: h => h(App)
}).$mount('#app')