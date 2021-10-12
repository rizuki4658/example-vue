<template>
  <div :class="classLogin" class="login-page">
    <my-loading :loading="loading"/>
    <transition name="slide-fade">
      <el-card v-if="loginActive" shadow="always">
        <el-row :gutter="0" type="flex" justify="center" align="middle">
          <el-col :span="9" class="text-right">
            <img
              style="width: 48px; height: 48px"
              src="@/assets/logo.png">
          </el-col>
          <el-col :span="15" class="text-left">
            <span class="font-md">Example Vue JS</span>
          </el-col>
        </el-row>

        <el-form :model="formData" ref="formLogin">
          <el-form-item
            prop="email"
            :rules="rulesEmail">
            <el-input v-model="formData.email" suffix-icon="el-icon-message" placeholder="example@mail.com"/>
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="rulesPassword">
            <el-input v-model="formData.password" :type="typePassWord" placeholder="password">
              <i v-if="!showPass" class="el-icon-view el-input__icon" slot="suffix" @click="showingPass"/>
              <i v-if="showPass" class="el-icon-remove-outline el-input__icon" slot="suffix" @click="hidingPass"/>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formLogin')" class="block">
              <span class="font-md">{{ $t('label.login') }}</span>
            </el-button>
          </el-form-item>
        </el-form>

        <div class="mt-16 mb-16 text-center">
          {{ $t('label.or') }}
        </div>

        <div class="mt-16 mb-16 text-center">
          <el-row :gutter="20" type="flex" justify="center" align="middle">
            <el-col :span="12">
              <el-button class="block" icon="el-icon-info" @click="slidingAbout">
                <span class="font-md">{{ $t('label.about') }}</span>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-dropdown trigger="click" class="block" placement="bottom-end" @command="handleLanguage">
                <el-button class="block">
                  {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="en">English</el-dropdown-item>
                  <el-dropdown-item command="id">Bahasa</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>

        <div class="mt-16 text-center">
          <span class="info">{{ $t('tips.not_member') }}</span>
          <el-button type="text" @click="goSignup">{{ $t('tips.sign_here') }}</el-button>
        </div>
      </el-card>
    </transition>

    <transition name="slide-fade-two">
      <page-about :active="aboutActive" @back="slidingLogin"/>
    </transition>
  </div>
</template>

<script>
import { loginUser } from '@/api/user'
import PageAbout from './about'
export default {
  name: 'PageLogin',
  components: {
    PageAbout
  },
  data () {
    return {
      formData: {},
      rulesEmail: [
        { required: true, message: this.$t('message.email_empty'), trigger: 'blur' },
        { type: 'email', message: this.$t('message.email_error'), trigger: ['blur', 'change'] }
      ],
      rulesPassword: [
        { required: true, message: this.$t('message.pass_empty'), trigger: 'blur' },
        { message: this.$t('message.pass_empty'), trigger: ['blur', 'change'] }
      ],
      showPass: false,
      loginActive: true,
      aboutActive: false,
      loading: false
    }
  },
  computed: {
    typePassWord () {
      if (this.showPass) {
        return 'text'
      } else {
        return 'password'
      }
    },
    classLogin () {
      if (this.loginActive) {
        return ''
      } else if (this.aboutActive) {
        return 'about'
      }
    },
    language () {
      return this.$store.state.app.language === 'en' ? 'English' : 'Bahasa'
    }
  },
  async mounted () {
    this.loginActive = false
    await this.delay(300)
    this.loginActive = true
  },
  methods: {
    showingPass () {
      this.showPass = true
    },
    hidingPass () {
      this.showPass = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          loginUser(this.formData).then(response => {
            this.loading = false
            const data = {
              language: this.$store.getters,
              page_data: null,
              skills: this.$store.getters.skills,
              system_token: this.$store.getters.system_token,
              user: response.data
            }
            this.$store.dispatch('setUser', data.user)
            this.$store.getters = { ...data }
            this.$router.push({ name: 'dashboard' })
          }).catch((error) => {
            this.loading = false
            if (error.error.status === 406) {
              this.$msgbox({
                title: this.$t('label.waiting_confirmation'),
                message: this.$t('message.success_signup')
              })
            } else {
              this.$message({
                message: this.$t('message.failed_login'),
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    handleLanguage (command) {
      const switchLang = command
      this.$i18n.locale = switchLang
      this.$store.dispatch('setLanguage', command)
    },
    slidingAbout () {
      this.loginActive = false
      this.aboutActive = true
    },
    slidingLogin () {
      this.loginActive = true
      this.aboutActive = false
    },
    goSignup () {
      this.$router.replace({ path: '/signup' })
    },
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    }
  }
}
</script>
