import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

import localizeFilter from "./shared/filters/localize.filter"
Vue.filter("localize", localizeFilter);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
