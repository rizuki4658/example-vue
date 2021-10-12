<template>
  <div>
    <div v-if="!loading" class="container">
      <div style="padding: 16px; background-color: #FFFFFF; border-radius: 10px;">
        <el-table
          :data="dataUsers"
          style="width: 100%"
          @row-click="showingDetail">
          <el-table-column
            prop="name"
            label="Name">
          </el-table-column>
          <el-table-column
            prop="email"
            label="Email">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="Phone">
          </el-table-column>
          <el-table-column prop="address" label="Address">
            <template slot="header">
              <div>{{ $t('label.address') }}</div>
            </template>
            <template slot-scope="scope">
              <div style="white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis;">
                {{ scope.row.address }}
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="$store.getters.user.status === 1" prop="status" label="status" class-name="status-column">
            <template slot="header">
              <div style="text-align: center;">Status</div>
            </template>
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === 1" type="success" class="block" round>
                Active
              </el-button>
              <el-button v-if="scope.row.status === 2" type="danger" class="block" round>
                Block
              </el-button>
              <el-badge v-if="scope.row.status === 0" is-dot class="item">
                <el-button class="block" type="info" round>
                  Confirmation
                </el-button>
              </el-badge>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-button type="info" class="font-lg" style="padding: 8px; line-height: normal;" @click="addingUser">
        <svg-icon icon-class="user-plus"/> <span class="font-md">{{ $t('label.add_user') }}</span>
      </el-button>

      <page-add-user
        :active="addUser"
        :data="formData"
        @cancel="cancelDetail"
        @save="confrimationSubmit"
        @delete="deletingUser"
      />
    </div>

    <my-loading :loading="loading"/>
  </div>
</template>
<script>
import { getAllUser, addNewUser, updateUser, updateStatus, deleteUser } from '@/api/user'
import PageAddUser from './detail'
import moment from '@/utils/moment'
export default {
  name: 'PageUsers',
  components: {
    PageAddUser
  },
  data () {
    return {
      loading: false,
      dataUsers: [],
      addUser: false,
      formData: null
    }
  },
  mounted () {
    this.showingAll()
  },
  methods: {
    apiGetAll () {
      getAllUser().then(response => {
        this.dataUsers = response.data
        this.$store.dispatch('setListUser', this.dataUsers)
        this.loading = false
      }).catch((error) => {
        this.dataUsers = []
        console.log(error)
        this.loading = false
      })
    },
    async showingAll () {
      this.loading = true
      if (!this.$store.getters.list_user) {
        this.apiGetAll()
      } else {
        this.dataUsers = this.$store.getters.list_user
        await this.delay(300)
        this.loading = false
      }
    },
    cancelDetail (type) {
      this.addUser = false
      this.formData = null
      if (type !== 0) {
        this.loading = true
        this.apiGetAll()
      }
    },
    showingDetail (row, col) {
      if (col.label !== 'status') {
        this.formData = row
        this.addUser = true
      } else {
        if (row.status === 2) {
          this.$confirm(this.$t('confirm.update_confrim_user') + row.name + '\n' + row.email, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: this.$t('label.cancel'),
            type: 'Warning'
          }).then(() => {
            const data = {
              status: 1
            }
            this.updatingStatus(row, data)
          }).catch(() => {
            // Cancel
          })
        } else if (row.status === 0) {
          this.$confirm(this.$t('confirm.confrim_user') + row.name + '\n' + row.email, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: this.$t('label.cancel'),
            type: 'Warning'
          }).then(() => {
            const data = {
              status: 1
            }
            this.updatingStatus(row, data)
          }).catch(() => {
            // Cancel
          })
        }
      }
    },
    addingUser () {
      this.addUser = true
      this.formData = {}
    },
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    },
    confrimationSubmit (type) {
      this.addUser = false
      if (!this.formData.status) {
        this.formData.status = 1
      }
      const data = {
        name: this.formData.name,
        username: this.formData.username,
        email: this.formData.email,
        phone: this.formData.phone.e164,
        birth_date: moment(this.formData.birth_date).format('YYYY-MM-DD'),
        address: this.formData.address,
        status: this.formData.status,
        status_editor: this.$store.getters.user.status
      }
      if (type === 0) {
        this.save(data)
      } else if (type === 1) {
        data.id = this.formData.id
        this.update(data, data.id)
      }
    },
    save (data) {
      this.loading = true
      addNewUser(data).then(response => {
        this.apiGetAll()
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.loading = false
        this.formData = {}
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
        this.loading = false
        this.formData = {}
      })
    },
    update (data, id) {
      delete data.username
      delete data.email
      delete data.phone
      delete data.id
      updateUser(data, id).then(response => {
        this.$message({
          message: 'Updated',
          type: 'success'
        })
        this.apiGetAll()
        this.loading = false
        this.formData = {}
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
        this.loading = false
        this.formData = {}
      })
    },
    updatingStatus (row, data) {
      this.loading = true
      const newData = {
        status_editor: this.$store.getters.user.status,
        status: data.status
      }
      updateStatus(newData, row.id).then(response => {
        this.apiGetAll()
        this.$message({
          message: row.email + ' was Activated',
          type: 'success'
        })
        this.$store.dispatch('setNotification')
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
        this.loading = false
      })
    },
    deletingUser (id) {
      this.addUser = false
      this.loading = true
      deleteUser(id).then(response => {
        this.apiGetAll()
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
        this.loading = false
      })
    }
  }
}
</script>
