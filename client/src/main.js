
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import 'es6-promise/auto'
import store from './store/store'
import Panel from '@/components/globals/Panel'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(Vuetify)

Vue.component('Panel', Panel)

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})