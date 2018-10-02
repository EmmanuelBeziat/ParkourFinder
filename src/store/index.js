import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from '@/store/modules/app.js'
import spots from '@/store/modules/spots.js'
import search from '@/store/modules/search.js'
import gallery from '@/store/modules/gallery.js'
import position from '@/store/modules/position.js'
import languages from '@/store/modules/languages.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		app,
		spots,
		search,
		gallery,
		position,
		languages,
	},
})
