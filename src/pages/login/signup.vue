<template>
  <div v-loading="loading" :class="classLogin" class="login-page">
    <transition name="slide-fade">
      <el-card v-if="signupActive" shadow="always">
        <el-row :gutter="0" type="flex" justify="center" align="middle">
          <el-col :span="12" class="text-right" style="max-width: 48px;">
            <img
              style="width: 48px; height: 48px"
              src="@/assets/logo.png">
          </el-col>
          <el-col class="text-left">
            <span class="font-md">Example Vue JS</span>
          </el-col>
        </el-row>

        <el-form :model="formData" ref="formSignUp">
          <el-row :gutter="20" style="margin-bottom: 24px;">
            <el-col>
              <el-form-item
                prop="name"
                :label="$t('label.nameUp')"
                :rules="rulesName">
                <el-input v-model="formData.name" placeholder="John Doe"/>
              </el-form-item>

              <el-form-item
                prop="username"
                :label="$t('label.username')"
                :rules="rulesUsername">
                <el-input v-model="formData.username" placeholder="johndoe"/>
              </el-form-item>

              <el-row :gutter="10" style="margin-bottom: 0px;">
                <el-col :sm="12">
                  <el-form-item
                    prop="email"
                    :label="$t('label.email')"
                    :rules="rulesEmail">
                    <el-input v-model="formData.email" placeholder="example@mail.com"/>
                  </el-form-item>
                </el-col>
                <el-col :sm="12">
                  <el-form-item
                    prop="birth-date"
                    :label="$t('label.birth_date')">
                    <el-date-picker
                      v-model="formData.birth_date"
                      :placeholder="$t('label.birth_date')"
                      type="date"
                      style="width: 100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <div class="font-sm" style="line-height: 40px;">
                <span class="color-danger">*</span> {{ $t('label.phone') }}
              </div>
              <VuePhoneNumberInput
                ref="phoneNumber"
                id="phoneNumber1"
                v-model="phone"
                :required="true"
                :default-country-code="countryCode !== '' ? countryCode : 'ID'"
                :error="errorPhone"
                @update="phoneUpdate"
              />
              <transition name="el-fade-in">
                <div
                  v-if="errorPhone"
                  style="line-height: normal; font-size: 12px;"
                  class="color-danger">
                  {{ $t('message.phone_error') }}
                </div>
              </transition>
              <div class="mb-16"/>

              <el-row :gutter="10" style="margin-bottom: 0px;">
                <el-col>
                  <el-form-item
                    prop="address"
                    :label="$t('label.address')"
                    :rules="rulesAddress">
                    <el-input v-model="formData.address" type="textarea" :rows="4"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="margin-bottom: 0px;">
                <el-col :sm="12">
                  <el-form-item
                    prop="password"
                    :label="$t('label.password')"
                    :rules="rulesPassword">
                    <el-input v-model="formData.password" type="password" placeholder="password"/>
                  </el-form-item>
                </el-col>
                <el-col :sm="12">
                  <el-form-item
                    prop="confirmPassword"
                    :label="'* ' + $t('label.confirm_password')">
                    <el-input
                      v-model="formData.confirm_password"
                      :style="notSamePass ? 'outline: 1px solid red; outline-offset: -2px border-radius: 3px;' : ''"
                      :placeholder="$t('label.confirm_password').toLowerCase()"
                      type="password"
                    />
                    <transition name="el-fade-in">
                      <div
                        v-if="notSamePass"
                        style="line-height: normal; font-size: 12px;"
                        class="color-danger">
                        {{ $t('message.pass_confirm_error') }}
                      </div>
                    </transition>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 24px;">
            <el-col>
              <el-form-item>
                <el-button type="primary" @click="submitForm('formSignUp')" class="block">
                  <span class="font-md">{{ $t('label.signup') }}</span>
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="mt-16 mb-16 text-center">
          {{ $t('label.or') }}
        </div>

        <div class="mt-16 text-center">
          <span class="info">{{ $t('tips.have_member') }}</span>
          <el-button type="text" @click="goLogin">{{ $t('tips.signIn_here') }}</el-button>
        </div>
      </el-card>
    </transition>

    <my-loading :loading="bigloading"/>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import { signupUser } from '@/api/user'
import moment from '@/utils/moment'
export default {
  name: 'PageLogin',
  components: {
    VuePhoneNumberInput
  },
  data () {
    return {
      formData: {
        name: '',
        phone: null
      },
      rulesName: [
        { required: true, message: this.$t('message.name_empty'), trigger: 'blur' },
        { min: 2, message: this.$t('message.name_error'), trigger: ['blur', 'change'] }
      ],
      rulesUsername: [
        { required: true, message: this.$t('message.username_empty'), trigger: 'blur' },
        { min: 2, message: this.$t('message.username_error'), trigger: ['blur', 'change'] }
      ],
      rulesEmail: [
        { required: true, message: this.$t('message.email_empty'), trigger: 'blur' },
        { type: 'email', message: this.$t('message.email_error'), trigger: ['blur', 'change'] }
      ],
      rulesAddress: [
        { required: true, message: this.$t('message.address_empty'), trigger: 'blur' },
        { min: 10, message: this.$t('message.address_error'), trigger: ['blur', 'change'] }
      ],
      rulesPassword: [
        { required: true, message: this.$t('message.pass_empty'), trigger: 'blur' },
        { min: 6, message: this.$t('message.pass_empty'), trigger: ['blur', 'change'] }
      ],
      showPass: false,
      language: this.$store.getters.language === 'en' ? 'English' : 'Bahasa',
      signupActive: true,
      loading: false,
      countryCode: 'ID',
      phone: null,
      errorPhone: false,
      notSamePass: false,
      bigloading: false
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
      return 'signup'
    }
  },
  async mounted () {
    this.signupActive = false
    await this.delay(300)
    this.signupActive = true
  },
  methods: {
    showingPass () {
      this.showPass = true
    },
    hidingPass () {
      this.showPass = false
    },
    submitForm (formName) {
      this.notSamePass = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.password !== this.formData.confirm_password) {
            this.notSamePass = true
          } else {
            this.confirmUser()
            this.notSamePass = false
          }
          return true
        } else {
          return false
        }
      })
    },
    handleLanguage (command) {
      const switchLang = command
      this.$i18n.locale = switchLang
      this.$store.dispatch('setLanguage', command)
      this.language = this.$store.getters.language === 'en' ? 'English' : 'Bahasa'
    },
    goLogin () {
      this.$router.push({ name: 'login' })
    },
    phoneUpdate (payload) {
      this.formData.phone = null
      if (payload.isValid) {
        this.formData.phone = payload
        this.errorPhone = false
      } else {
        this.errorPhone = true
      }
    },
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    },
    confirmUser () {
      this.bigloading = true
      const data = {
        name: this.formData.name,
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password,
        phone: this.formData.phone.formattedNumber,
        birth_date: moment(this.formData.birth_date).format('YYYY-MM-DD'),
        address: this.formData.address
      }
      signupUser(data).then(response => {
        this.bigloading = false
        this.formData = {
          name: '',
          phone: null
        }
        this.phone = null
        this.$message({
          message: this.$t('message.success_signup'),
          type: 'success'
        })
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
        this.bigloading = false
      })
    }
  }
}
</script>
