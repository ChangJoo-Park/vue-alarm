import Vue from 'vue'
import VueI18n from 'vue-i18n'
import korean from './lang/ko'
import moment from 'moment'
const locales = {
  ko: korean
}

Vue.use(VueI18n)
// TODO: Set by system locale
const defaultLang = 'ko'
Vue.config.lang = defaultLang
Vue.config.fallbackLang = 'en'
moment.locale(defaultLang)
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
