import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Multiplication from './components/Multiplication.vue'
import Metrics from './components/Metrics.vue'
import Fractions from './components/Fractions.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/multiplication', component: Multiplication },
  { path: '/metrics', component: Metrics },
  { path: '/fractions', component: Fractions },
  { path: '/', component: Metrics }
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
