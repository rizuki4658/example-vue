import Cookies from 'js-cookie'
import { removeToken } from '@/utils/auth'
const user = {
  state: {
    data_user: Cookies.get('example-user') ? JSON.parse(Cookies.get('example-user')) : null,
    system_token: null,
    list: null
  },
  mutations: {
    SET_DATA_USER: (state, dataUser) => {
      Cookies.set('example-user', dataUser, { expires: 60 })
      state.data_user = dataUser
    },
    SET_SYSTEM_TOKEN: (state, systemToken) => {
      state.system_token = systemToken
    },
    SET_LIST_USER: (state, list) => {
      state.list = list
    }
  },
  actions: {
    setUser ({ commit }, dataUser) {
      commit('SET_DATA_USER', dataUser)
    },
    setToken ({ commit }, systemToken) {
      commit('SET_SYSTEM_TOKEN', systemToken)
    },
    setListUser ({ commit }, list) {
      commit('SET_LIST_USER', list)
    },
    signOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_SYSTEM_TOKEN', null)
        commit('SET_DATA_USER', null)
        commit('SET_LIST_USER', null)
        Cookies.remove('example-user')
        removeToken()
      })
    }
  }
}

export default user
