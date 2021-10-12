// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'
import Element from 'element-ui'
import VueHtml2pdf from 'vue-html2pdf'
import componentLoading from './components/loading'
import skeletonLoading from './components/loading/skeleton'
import Layout from '@/pages/layout/index'
import money from 'v-money'
// import * as VueGoogleMaps from 'vue2-google-maps'
import 'element-ui/lib/theme-chalk/index.css'
import './permission'
import './styles/variable.scss'
import './styles/index.scss'
import './xicons'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import './mixins/resize.js'
import Skeleton from 'vue-loading-skeleton'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// Vue.use(VueGoogleMaps, { load: { key: 'AIzaSyDWj2pRjYevllgP-_g2CBIZuev0m_RZRyc', libraries: 'places', installComponents: true } })
Vue.use(VueHtml2pdf)
Vue.config.productionTip = false
Vue.use(Skeleton)
Vue.component('my-loading', componentLoading)
Vue.component('loading-skeleton', skeletonLoading)
Vue.component('sidebar', Layout)
Vue.use(money)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
