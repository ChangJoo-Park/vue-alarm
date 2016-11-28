import Vue from 'vue'
import VueI18n from 'vue-i18n'
import korean from './lang/ko'
const locales = {
  ko: korean
}

Vue.use(VueI18n)

Vue.config.lang = 'ko'

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
