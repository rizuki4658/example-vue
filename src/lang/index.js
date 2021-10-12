import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import enLocale from './en'
import idLocale from './id'
import store from '@/store'

Vue.use(VueI18n)

const messages = {en: { ...enLocale, ...elementEnLocale }, id: { ...idLocale, ...elementEnLocale }}

const i18n = new VueI18n({ locale: store.getters.language, messages })

export default i18n
