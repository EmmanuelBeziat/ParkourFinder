import Vue from 'vue'

/**
 * Moment.js - http://moment.js/docs/#/displaying
 * @param {String} value
 * @return {String}
 */
Vue.filter('moment', (value) => new Intl.DateTimeFormat('fr-FR').format(value))
