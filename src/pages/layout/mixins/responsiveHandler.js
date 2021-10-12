import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route (route) {
      store.dispatch('setName', this.$t(route.meta.title))
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('setDevice', 'phone')
    }
  },
  methods: {
    isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler () {
      const isMobile = this.isMobile()
      if (isMobile) {
        if (this.device === 'phone' && this.sidebar) {
          store.dispatch('setMainClass', 'on-mobile-active')
        } else if (this.device === 'phone' && !this.sidebar) {
          store.dispatch('setMainClass', 'on-mobile-hide')
        }
      } else {
        if (this.sidebar) {
          store.dispatch('setMainClass', 'on-desktop-active')
        } else if (this.sidebar === false) {
          store.dispatch('setMainClass', 'on-desktop-hide')
        }
      }
      store.dispatch('setDevice', isMobile ? 'phone' : 'desktop')
    }
  }
}
