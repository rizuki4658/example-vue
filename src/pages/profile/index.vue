<template>
  <div>
    <transition name="el-fade-in">
      <div v-if="!loading" class="container-680 mt-24">
        <div class="p16" style="background-color: #FFFFFF; border-radius: 10px;">
          <el-row type="flex" justify="center" align="middle" class="mb-24">
            <el-col style="max-width: 90px;">
              <el-avatar
                icon="el-icon-user-solid"
                style="height: 80px; width: 80px; font-size: 48px; line-height: 80px;"
              />
            </el-col>
            <el-col class="text-right">
              <div class="text-right font-xl" style="text-transform: uppercase;">
                {{ headerTitle }}
              </div>
              <el-button v-if="readOnlyForm" type="text" @click="editableForm">
                <svg-icon icon-class="edit-2"/> Edit
              </el-button>
              <el-button type="text" @click="editablePassword">
                <svg-icon icon-class="password"/> Password
              </el-button>
            </el-col>
          </el-row>

          <el-form :model="formData">
            <el-form-item>
              <el-input
                v-model="formData.name"
                :disabled="readOnlyForm">
                <template slot="prefix">
                  <div class="font-md">
                    <svg-icon icon-class="man"/>
                  </div>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="formData.username"
                :disabled="readOnlyForm">
                <template slot="prefix">
                  <div class="font-md">
                    <svg-icon icon-class="user"/>
                  </div>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="formData.email"
                :disabled="readOnlyForm">
                <template slot="prefix">
                  <div class="font-md">
                    <svg-icon icon-class="email"/>
                  </div>
                </template>
              </el-input>
            </el-form-item>

            <VuePhoneNumberInput
              ref="phoneNumber"
              id="phoneNumber1"
              v-model="phone"
              :disabled="readOnlyForm"
              :required="true"
              :default-country-code="countryCode !== '' ? countryCode : 'ID'"
              @update="phoneUpdate"
            />
            <div class="mb-24"/>

            <el-form-item>
              <el-date-picker
                v-model="formData.birth_date"
                :disabled="readOnlyForm"
                :placeholder="$t('label.birth_date')"
                type="date"
                format="dd MMMM yyyy"
                style="width: 100%;"
              />
            </el-form-item>

            <el-form-item>
              <el-input v-model="formData.address" type="textarea" :rows="4" :disabled="readOnlyForm"/>
            </el-form-item>

            <el-row>
              <el-col>
                <transition name="el-fade-in">
                  <el-form-item v-if="!readOnlyForm" style="margin-bottom: 0px;">
                    <el-button type="info" @click="saveData">
                      <span class="font-md">{{ $t('label.save') }}</span>
                    </el-button>

                    <el-button @click="cancelEdit">
                      <span class="font-md">{{ $t('label.cancel') }}</span>
                    </el-button>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in">
                  <el-form-item v-if="readOnlyForm" style="margin-bottom: 0px;">
                    <el-button style="opacity: 0;">
                      <span class="font-md">{{ $t('label.cancel') }}</span>
                    </el-button>
                  </el-form-item>
                </transition>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </transition>

    <transition name="el-fade-in">
      <div v-if="loading" class="container-680 mt-24">
        <div class="p16" style="background-color: #FFFFFF; border-radius: 10px;">
          <el-row type="flex" justify="center" align="middle" class="mb-24">
            <el-col style="max-width: 90px;" class="skeleton-circle">
              <PuSkeleton :count="1" :circle="true" height="80px" width="80px"/>
            </el-col>
            <el-col class="text-right">
              <div class="text-right font-xl" style="text-transform: uppercase;">
                <PuSkeleton :count="1" :circle="true" height="32px" width="200px"/>
              </div>
              <el-row :gutter="10" type="flex" justify="end">
                <el-col style="max-width: 80px">
                  <PuSkeleton :count="1" :circle="true" height="32px"/>
                </el-col>
                <el-col style="max-width: 80px">
                  <PuSkeleton :count="1" :circle="true" height="32px"/>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-form>
            <el-form-item v-for="n in 6" :key="n" :style="n === 6 ? 'margin-bottom: 16px;' : 'margin-bottom: 8px;'">
              <PuSkeleton v-if="n !== 6" :count="1" :circle="true" height="48px"/>
              <PuSkeleton v-else-if="n == 6" :count="1" :circle="true" height="120px"/>
            </el-form-item>

            <el-row>
              <el-col>
                <el-form-item>
                  <PuSkeleton :count="1" :circle="true" height="48px" width="120px"/>
                  <PuSkeleton :count="1" :circle="true" height="48px" width="120px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </transition>

    <el-dialog
      title="Password"
      :visible.sync="editPassword"
      :show-close="false"
      custom-class="small-dialog">
      <span>
        <el-form :model="formPassword" label-position="left" label-width="200px">
          <el-form-item :label="$t('label.old_password')" required>
            <el-input v-model="formPassword.old_password" type="password"/>
          </el-form-item>

          <el-form-item :label="$t('label.new_password')" style="margin-bottom: 8px; font-size: 13px;" required>
            <el-input v-model="formPassword.new_password" :type="typePassword1">
              <template slot="suffix">
                <i v-if="typePassword1 === 'password'" class="el-icon-view" @click="changePassNew('text')"/>
                <i v-else class="el-icon-remove-outline" @click="changePassNew('password')"/>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('label.confirm_password')" style="margin-bottom: 8px; font-size: 13px;" required>
            <el-input v-model="formPassword.confirm_password" type="password"/>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetFormPassword">Cancel</el-button>
        <el-button type="primary" @click="savePassword">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import { getProfile, updateProfile, updatePassword } from '@/api/profile'
export default {
  name: 'PageProfile',
  components: {
    VuePhoneNumberInput
  },
  data () {
    return {
      loading: true,
      dataItems: [],
      formData: {},
      countryCode: 'ID',
      phone: '',
      addData: false,
      readOnlyForm: true,
      editPassword: false,
      dataBackup: {},
      formPassword: {},
      typePassword1: 'password'
    }
  },
  computed: {
    headerTitle () {
      return this.$store.state.user.data_user.name
    }
  },
  mounted () {
    this.getMyProfile()
  },
  methods: {
    getMyProfile () {
      if (this.$route.params.username) {
        getProfile(this.$route.params.username).then(response => {
          this.formData = response.data
          this.phone = this.formData.phone
          this.loading = false
        }).catch((error) => {
          this.$message({
            message: error.errorData.error,
            type: 'error'
          })
          this.$router.push({ name: 'dashboard' })
        })
      } else {
        this.$router.push({ name: 'dashboard' })
      }
    },
    phoneUpdate (payload) {
      this.formData.phone = null
      if (payload.isValid) {
        this.formData.phone = payload
      }
    },
    editableForm () {
      this.readOnlyForm = false
    },
    editablePassword () {
      this.editPassword = true
    },
    cancelEdit () {
      this.loading = true
      getProfile(this.$route.params.username).then(response => {
        this.formData = response.data
        this.phone = this.formData.phone
        this.readOnlyForm = false
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error.errorData.error,
          type: 'error'
        })
        this.$router.push({ name: 'dashboard' })
      })
    },
    resetFormPassword () {
      this.formPassword = {}
      this.editPassword = false
      this.typePassword1 = 'password'
    },
    changePassNew (type) {
      this.typePassword1 = type
    },
    saveData () {
      this.loading = true
      const data = {
        // id: this.formData.id,
        name: this.formData.name,
        username: this.formData.username,
        email: this.formData.email,
        phone: this.formData.phone.formattedNumber,
        birth_date: this.formData.birth_date,
        address: this.formData.address
      }

      updateProfile(data, this.formData.id).then(response => {
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.readOnlyForm = true
        const tokenOld = this.$store.getters.user.token
        let newData = {
          token: tokenOld
        }
        newData = { ...newData, ...response.data }
        this.$store.dispatch('setUser', newData)
        this.getMyProfile()
      }).catch((error) => {
        this.$message({
          message: error.errorData.error,
          type: 'error'
        })
        this.getMyProfile()
      })
    },

    savePassword () {
      this.loading = true
      this.editablePassword = false
      const data = {
        old_password: this.formPassword.old_password,
        new_password: this.formPassword.new_password,
        confirm_password: this.formPassword.confirm_password
      }
      const username = this.formData.username
      const id = this.formData.id
      updatePassword(data, id, username).then(response => {
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.resetFormPassword()
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error.errorData.error,
          type: 'error'
        })
        this.getMyProfile()
      })
    }
  }
}
</script>
