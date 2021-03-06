import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ko'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css'
import i18n from './locale'

locale.use(lang)

import App from './App'
import routes from './routes'

Vue.use(ElementUI)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  ...App
}).$mount('#app')
