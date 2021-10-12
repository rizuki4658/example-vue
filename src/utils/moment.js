import store from '../store'
const moment = require('moment')
moment.updateLocale(store.getters.language, {})
// moment.defineLocale(store.getters.language, { parentLocale: store.getters.language })

export default moment
