import Cookies from 'js-cookie'
import { removeToken, getToken } from '@/utils/auth'
import { getAllUser } from '@/api/user'
const app = {
  state: {
    page_data: null,
    language: Cookies.get('example-language') ? Cookies.get('example-language') : 'en',
    skills: [
      {
        value: 55,
        name: 'Adobe Photoshop',
        icon: 'photoshop'
      },
      {
        value: 45,
        name: 'Adobe XD',
        icon: 'xd'
      },
      {
        value: 30,
        name: 'Adobe Illustrator',
        icon: 'ai'
      },
      {
        value: 80,
        name: 'HTML',
        icon: 'html5'
      },
      {
        value: 80,
        name: 'CSS',
        icon: 'css3'
      },
      {
        value: 80,
        name: 'Javascript',
        icon: 'js'
      },
      {
        value: 50,
        name: 'Node JS',
        icon: 'node'
      },
      {
        value: 70,
        name: 'MySql',
        icon: 'mysql-2'
      },
      {
        value: 60,
        name: 'PHP',
        icon: 'php-1'
      },
      {
        value: 80,
        name: 'Vue',
        icon: 'vue'
      },
      {
        value: 45,
        name: 'React',
        icon: 'react'
      },
      {
        value: 60,
        name: 'Laravel',
        icon: 'laravel'
      }
    ],
    device: 'desktop',
    sidebar: true,
    name: '',
    main_class: 'on-desktop-active',
    notification: null
  },
  mutations: {
    SET_PAGE: (state, pageData) => {
      state.page_data = pageData
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('example-language', language)
    },
    SET_SKILL: (state, skills) => {
      state.skills = skills
    },
    SET_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIDEBAR: (state, sidebar) => {
      state.sidebar = sidebar
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_MAIN_CLASS: (state, classMain) => {
      state.main_class = classMain
    },
    SET_NOTIFCATION: (state, notification) => {
      state.notification = notification
    }
  },
  actions: {
    setPage ({ commit }, pageData) {
      commit('SET_PAGE', pageData)
    },
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSkill ({ commit }, skills) {
      commit('SET_SKILL', skills)
    },
    setDevice ({ commit }, device) {
      commit('SET_DEVICE', device)
    },
    setSidebar ({ commit }, sidebar) {
      commit('SET_SIDEBAR', sidebar)
    },
    setName ({commit}, name) {
      commit('SET_NAME', name)
    },
    setMainClass ({commit}, classMain) {
      commit('SET_MAIN_CLASS', classMain)
    },
    setNotification ({commit}) {
      return new Promise((resolve, reject) => {
        getAllUser().then(response => {
          const data = response.data
          const results = data.filter(function (x) { return x.status === 0 })
          commit('SET_NOTIFCATION', results)
          resolve(response)
        }).catch(error => {
          if (error.errorData.error === 'token_expired') {
            const token = getToken()
            removeToken(token)
          }
          reject(error)
        })
      })
    },
    setDeleteNotif ({commit}, notification) {
      commit('SET_NOTIFCATION', notification)
    }
  }
}

export default app
