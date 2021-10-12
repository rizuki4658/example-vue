<template>
  <el-dialog :visible.sync="showForm" :show-close="false" :before-close="reset" fullscreen @close="cancel">
    <div slot="title">
      <el-row type="flex">
        <el-col class="text-center">
          <span class="font-xl">
            <template v-if="data">
              {{ formData.name }}
            </template>
            <template v-else>
              {{ $t('label.add_user') }}
            </template>
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="container-680">
      <el-form :model="formData" ref="formSignUp">
        <el-row :gutter="20" style="margin-bottom: 0px;">
          <el-col>
            <el-form-item
              prop="name"
              :label="$t('label.nameUp')"
              :rules="rulesName">
              <el-input v-model="formData.name" placeholder="John Doe"/>
            </el-form-item>

            <template v-if="!formData.id">
              <el-form-item
                prop="username"
                :label="$t('label.username')"
                :rules="rulesUsername">
                <el-input v-model="formData.username" placeholder="johndoe"/>
              </el-form-item>
            </template>

            <el-row :gutter="10" style="margin-bottom: 0px;">
              <template v-if="!formData.id">
                <el-col :sm="12">
                  <el-form-item
                    prop="email"
                    :label="$t('label.email')"
                    :rules="rulesEmail">
                    <el-input v-model="formData.email" placeholder="example@mail.com"/>
                  </el-form-item>
                </el-col>
              </template>
              <el-col :sm="!formData.id ? 12 : 24">
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

            <template v-if="!formData.id">
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
            </template>

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
          </el-col>
        </el-row>

        <template v-if="formData.id && formData.status !== 0">
          <el-row :gutter="20" style="margin-bottom: 120px;">
            <el-col :sm="12">
              <el-radio-group v-model="formData.status" :fill="formData.status === 1 ? '#40EE95' : '#DC3545'">
                <el-radio-button :label="1">Active</el-radio-button>
                <el-radio-button :label="2">Block</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col v-if="$store.getters.user.status === 1" :sm="12" class="text-right">
              <el-popconfirm
                confirmButtonText='OK'
                cancelButtonText='No, Thanks'
                icon="el-icon-info"
                iconColor="red"
                title="Are you sure to delete this?"
                @onConfirm="deleteUser">
                <el-button slot="reference" type="danger">Delete</el-button>
              </el-popconfirm>
            </el-col>
          </el-row>
        </template>

        <el-row :gutter="20" style="margin-bottom: 24px;">
          <el-col :sm="12">
            <el-form-item v-if="formData.id">
              <el-button type="info" @click="submitForm('formSignUp', 1)" class="block">
                <span class="font-md">{{ $t('label.update') }}</span>
              </el-button>
            </el-form-item>
            <el-form-item v-else>
              <el-button type="success" @click="submitForm('formSignUp', 0)" class="block">
                <span class="font-md">{{ $t('label.save') }}</span>
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item>
              <el-button @click="cancel" class="block">
                <span class="font-md">{{ $t('label.cancel') }}</span>
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
export default {
  name: 'PageAddUser',
  components: {
    VuePhoneNumberInput
  },
  props: {
    active: {
      type: Boolean,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      dataUsers: [],
      formData: {},
      showForm: false,
      errorPhone: false,
      countryCode: 'ID',
      phone: null,
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
      ]
    }
  },
  watch: {
    active: {
      handler (data) {
        this.showForm = data
      },
      deep: true,
      immediate: true
    },
    data: {
      handler (data) {
        if (data) {
          this.formData = data
          if (Object.keys(data).length > 0) {
            this.countryCode = data.phone.countryCode ? data.phone.countryCode : 'ID'
            this.phone = data.phone.phoneNumber ? data.phone.phoneNumber : data.phone
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async showingAll () {
      this.loading = true
    },
    reset () {
      this.$refs['formSignUp'].resetFields()
    },
    cancel () {
      this.$refs['formSignUp'].resetFields()
      if (this.formData.id) {
        this.$emit('cancel', 1)
      } else {
        this.$emit('cancel', 0)
      }
    },
    phoneUpdate (payload) {
      console.log(this.phone)
      this.formData.phone = null
      if (payload.isValid) {
        this.formData.phone = payload
        this.errorPhone = false
      } else {
        this.errorPhone = true
      }
    },
    submitForm (formName, type) {
      this.notSamePass = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmUser(type)
          return true
        } else {
          return false
        }
      })
    },
    confirmUser (type) {
      this.$emit('save', type)
    },
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    },
    deleteUser () {
      this.$emit('delete', this.formData.id)
    }
  }
}
</script>
