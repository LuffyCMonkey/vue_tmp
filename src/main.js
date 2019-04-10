// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App_2'
import router from './router/router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
window.bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
