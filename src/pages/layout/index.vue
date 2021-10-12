<template>
  <div>
    <div :class="classObject.sidebar" class="side-right-menu">
      <el-row type="flex" justify="center" align="middle">
        <el-col v-if="sidebar" class="button">
          <el-button type="primary" @click="handleShowing(false)">
            <svg-icon :icon-class="classObject.sidebar === 'on-mobile-active' || classObject.sidebar === 'on-mobile-hide' ? 'open-menu' : 'arrow'"/>
          </el-button>
        </el-col>
        <el-col v-if="!sidebar" class="button">
          <el-button type="primary" @click="handleShowing(true)">
            <svg-icon icon-class="open-menu"/>
          </el-button>
        </el-col>
        <el-col class="text-notif">
          <div class="title">
            {{ pageData }}
          </div>

          <el-dropdown trigger="click" style="margin-right: 4px;" placement="bottom-end" @command="handlingLang">
            <span class="el-dropdown-link">
              <el-button type="primary" class="trigger-notif">
                <template v-if="languageApp === 'id' || languageApp === 'ID'">
                  <svg-icon icon-class="bahasa"/>
                </template>
                <template v-else>
                  <svg-icon icon-class="english"/>
                </template>
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :class="[languageApp === 'id' || languageApp === 'ID' ? 'bg-primary' : '']"
                command="id">
                <el-row type="flex" justify="center" align="middle">
                  <el-col class="font-lg" style="max-width: 40px;">
                    <svg-icon icon-class="bahasa"/>
                  </el-col>
                  <el-col>
                    Bahasa
                  </el-col>
                </el-row>
              </el-dropdown-item>
              <el-dropdown-item
                :class="[languageApp === 'en' ? 'bg-primary' : '']"
                command="en">
                <el-row
                  type="flex"
                  justify="center"
                  align="middle">
                  <el-col class="font-lg" style="max-width: 40px;">
                    <svg-icon icon-class="english"/>
                  </el-col>
                  <el-col>
                    English
                  </el-col>
                </el-row>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click" style="margin-right: 4px;" placement="bottom-end" @command="viewNotif">
            <span class="el-dropdown-link">
              <el-badge v-if="notifications.length > 0" :value="notifications.length" class="item">
                <el-button type="primary" class="trigger-notif">
                  <svg-icon icon-class="bell"/>
                </el-button>
              </el-badge>
              <el-button v-else type="primary" class="trigger-notif">
                <svg-icon icon-class="bell"/>
              </el-button>
            </span>
            <el-dropdown-menu v-if="notifications.length > 0" slot="dropdown" class="notif">
              <el-dropdown-item v-for="(notify, n) in notifications" :key="n" :command="n">
                <el-row type="flex" justify="center" align="middle">
                  <el-col class="font-lg m-null" :span="3">
                    <svg-icon icon-class="email"/>
                  </el-col>
                  <el-col class="m-null" :span="21">
                    <el-row :gutter="10" type="flex" justify="center" align="middle">
                      <el-col class="m-null">
                        <div class="overflow-ellipsis font-md bold">
                          {{ notify.name }}
                        </div>
                      </el-col>
                      <el-col class="text-right m-null">
                        <div class="overflow-ellipsis font-xs color-text-placeholder">
                          {{ formatedDate(notify.created_at) }}
                        </div>
                      </el-col>
                    </el-row>
                    <div class="overflow-ellipsis font-sm bold">{{ notify.username }} {{ $t('message.email_notif') }}</div>
                  </el-col>
                </el-row>
              </el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu v-if="notifications.length <= 0" slot="dropdown">
              <el-dropdown-item icon="el-icon-close-notification" class="font-lg color-text-placeholder">
                <span class="font-md">no notification</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click" @command="handleDropdownUser">
            <span class="el-dropdown-link">
              <el-button type="primary" class="trigger-user">
                {{ dataUser.name.toUpperCase() }}
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" class="font-md" command="profile">
                {{ dataUser.username }}
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" class="font-md" command="logout">
                logout
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>

    <div :class="classObject.sidebar" class="side-left-menu">
      <div style="padding: 16px 8px 0px;">
        <el-row :gutter="10" type="flex" align="middle" justify="center">
          <el-col style="max-width: 48px;">
            <img src="../../assets/logo.png" height="40" width="40">
          </el-col>
          <el-col v-if="sidebar">
            Example Vue
          </el-col>
        </el-row>
      </div>
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @select="handleRouter">
        <el-menu-item v-for="(list, n) in menus" :key="n" :index="n.toString()">
          <div class="menu-icon">
            <svg-icon :icon-class="list.meta.icon"/>
          </div>
          <div v-if="sidebar" slot="title" class="menu-name">
            {{ $t(list.meta.title) }}
          </div>
        </el-menu-item>
      </el-menu>
    </div>

    <transition name="el-fade-in">
      <div
        v-if="classObject.sidebar === 'on-mobile-active'"
        :class="classObject.sidebar === 'on-mobile-active' ? 'active' : ''"
        class="wrapper-menu"
        @click="handleShowing(false)"
      />
    </transition>

    <my-loading :loading="loading"/>
  </div>
</template>

<script>
import asyncRouterMap from '@/router'
import moment from '@/utils/moment'
import responsiveMixin from './mixins/responsiveHandler'
export default {
  name: 'Layout',
  mixins: [responsiveMixin],
  data () {
    return {
      isCollapse: false,
      loading: false
    }
  },
  computed: {
    menus () {
      const data = []
      asyncRouterMap.options.routes.map(x => {
        if (x.meta) {
          if (x.meta.layout) {
            if (x.meta.layout === 'sidebar-active') {
              data.push(x)
            }
          }
        }
      })
      return data
    },
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    classObject () {
      const data = {
        sidebar: null
      }
      if (this.device === 'phone') {
        if (this.sidebar) {
          data.sidebar = 'on-mobile-active'
        } else {
          data.sidebar = 'on-mobile-hide'
        }
      } else {
        if (this.sidebar) {
          data.sidebar = 'on-desktop-active'
        } else {
          data.sidebar = 'on-desktop-hide'
        }
      }
      this.$store.dispatch('setMainClass', data.sidebar)
      return data
    },
    pageData () {
      return this.$store.state.app.name !== '' ? this.$store.state.app.name : this.$t(this.$route.meta.title)
    },
    dataUser () {
      return this.$store.state.user.data_user
    },
    defaultActive () {
      let active = 0
      for (var i = 0; i < this.menus.length; i++) {
        if (this.menus[i].name === this.$route.name) {
          active = i
        }
      }
      return active.toString()
    },
    notifications () {
      if (this.$store.state.app.notification) {
        if (this.$store.state.app.notification.length > 0) {
          return this.$store.state.app.notification
        } else {
          return []
        }
      } else {
        return []
      }
    },
    languageApp () {
      return this.$store.state.app.language
    }
  },

  mounted () {
  },

  methods: {
    handleRouter (n) {
      if (n !== this.defaultActive) {
        const index = parseInt(n)
        this.$router.push({ name: this.menus[index].name })
      }
    },
    handleShowing (status) {
      console.log(status)
      this.$store.dispatch('setSidebar', status)
    },
    formatedDate (date) {
      return moment(date).format('DD MMM YYYY')
    },
    viewNotif (n) {
      if (this.$route.name !== 'users') {
        this.$router.push({ name: 'users' })
      }
    },
    handleDropdownUser (names) {
      if (names === 'logout') {
        this.logout()
      } else {
        if (this.$route.name !== names) {
          this.$router.push({ name: names, params: { username: this.$store.getters.user.username } })
        }
      }
    },
    async handlingLang (lang) {
      if (lang !== this.languageApp) {
        this.loading = true
        const switchTo = lang
        this.$i18n.locale = switchTo
        this.$store.dispatch('setLanguage', switchTo)
        await this.delay(500)
        this.$message({
          message: 'Language has been changed!',
          type: 'success'
        })
        this.loading = false
      }
    },
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    },
    logout () {
      this.$confirm(this.$t('message.logout_quest'), 'Logout', {
        confirmButtonText: 'OK',
        cancelButtonText: this.$t('label.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('signOut').then(() => {
          this.loading = false
        })
        this.$router.push({ name: 'login' })
      }).catch(() => {
        console.log('cancel logout')
      })
    }
  }
}
</script>
