import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from './utils/auth' // getSystemToken // getToken from cookie
router.beforeEach((to, from, next) => {
  if (!getToken() || getToken() === 'undefined') {
    if (to.name === 'signup') {
      next()
    }

    if (to.name !== 'login') {
      Message.error('Not Authentication!')
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    store.dispatch('setToken', getToken())
    if (!store.getters.notification) {
      store.dispatch('setNotification')
    }
    if (to.name === 'login' || to.name === 'signup') {
      next({ name: 'dashboard' })
    } else {
      if (!to.name) {
        next({ name: '404' })
      }
      next()
    }
  }
})
