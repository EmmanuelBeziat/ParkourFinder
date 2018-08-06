import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import spots from '@/store/modules/spots.js'
import languages from '@/store/modules/languages.js'
import position from '@/store/modules/position.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		languages,
		spots,
		position
	},
})
