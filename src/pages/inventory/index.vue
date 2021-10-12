<template>
  <div>
    <div v-if="!loading" class="container">
      <div style="padding: 16px; background-color: #FFFFFF; border-radius: 10px; overflow: auto hidden;">
        <div style="width: 1366px;">
          <el-table
            :data="dataItems"
            style="width: 100%;"
            @row-click="showingDetail">
            <el-table-column prop="code" :label="$t('label.code')" width="200"/>
            <el-table-column prop="name" :label="$t('label.nameUp')">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="brands" :label="$t('label.brand')">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">{{ scope.row.brands }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="min_stocks" :label="$t('label.min_stock')">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">{{ scope.row.min_stocks }} pcs</div>
              </template>
            </el-table-column>
            <el-table-column prop="max_stocks" :label="$t('label.max_stock')">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">{{ scope.row.max_stocks }} pcs</div>
              </template>
            </el-table-column>
            <el-table-column prop="stocks" :label="$t('label.stock')">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">{{ scope.row.stocks }} pcs</div>
              </template>
            </el-table-column>
            <el-table-column prop="updated_at" :label="$t('label.last_update')"/>
            <el-table-column prop="username" :label="$t('label.created_by')">
              <template slot-scope="scope">
                {{ scope.row.username }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="Status">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status === 1" type="success">
                  Safe
                </el-button>
                <el-button v-if="scope.row.status === 2" type="info">
                  Low
                </el-button>
                <el-button v-if="scope.row.status === 3" type="warning">
                  Very Low
                </el-button>
                <el-button v-if="scope.row.status === 0" type="danger">
                  Empty
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <el-button type="info" class="mt-16 font-md" round @click="showingForm">
        <svg-icon icon-class="items-add"/> <span class="font-md">{{ 'Add Item' }}</span>
      </el-button>
    </div>

    <my-loading :loading="loading"/>

    <detail-items
      :data="formData"
      :active="addData"
      @cancel="cancelForm"
      @save="submitForm"
      @delete="deleteForm"
    />
  </div>
</template>
<script>
import { getAll, create, update, deleteInventory } from '@/api/inventory'
import moment from '@/utils/moment'
import detailItems from './detail'
export default {
  name: 'PageInventory',
  components: {
    detailItems
  },
  data () {
    return {
      loading: false,
      dataItems: [],
      formData: {},
      addData: false
    }
  },
  mounted () {
    this.getAllData()
  },
  methods: {
    getAllData () {
      this.dataItems = []
      this.loading = true
      getAll().then(response => {
        response.data.map(x => {
          x.updated_at = moment(x.updated_at).format('DD MMM, YY')
          this.dataItems.push(x)
        })
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error.errorData.error,
          type: 'error'
        })
        this.dataItems = []
        this.loading = false
      })
    },
    showingForm () {
      this.addData = true
    },
    showingDetail (row) {
      if (this.$store.getters.user.status !== 1) {
        this.$message({
          message: this.$t('message.not_authority_user'),
          type: 'error'
        })
      } else {
        this.formData = row
        this.addData = true
      }
    },
    cancelForm (type) {
      if (type !== 0) {
        this.getAllData()
      }
      this.formData = {}
      this.addData = false
    },
    submitForm (type) {
      if (!this.formData.id) {
        this.saveForm()
      } else {
        this.updateForm()
      }
    },
    saveForm () {
      this.loading = true
      let data = {
        stocks: this.formData.last_in,
        status: 0,
        last_out: 0
      }
      let status = 0
      const percentage = (data.stocks / (this.formData.min_stocks + this.formData.max_stocks)) * 100
      if (percentage > 75) { status = 1 }
      if (percentage > 50 && percentage <= 75) { status = 2 }
      if (percentage > 25 && percentage <= 50) { status = 3 }
      if (percentage <= 25) { status = 0 }
      data.status = status
      data = { ...data, ...this.formData }
      create(data).then(response => {
        this.addData = false
        this.formData = {}
        this.loading = false
        this.getAllData()
        this.$message({
          message: 'Success',
          type: 'success'
        })
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: 'Error',
          type: 'error'
        })
        this.addData = false
        this.formData = {}
        this.loading = false
      })
    },
    updateForm () {
      this.loading = true
      let data = this.formData
      const id = data.id
      delete data.code
      delete data.id
      delete data.user_id
      delete data.username
      delete data.created_at
      delete data.updated_at
      delete data.username
      let status = 0
      data.stocks += data.new_in
      data.last_in = data.new_in
      delete data.new_in
      const percentage = (data.stocks / (this.formData.min_stocks + this.formData.max_stocks)) * 100
      if (percentage > 75) { status = 1 }
      if (percentage > 50 && percentage <= 75) { status = 2 }
      if (percentage > 25 && percentage <= 50) { status = 3 }
      if (percentage <= 25) { status = 0 }
      data.status = status
      update(data, id).then(response => {
        this.addData = false
        this.formData = {}
        this.loading = false
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.getAllData()
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: 'Error',
          type: 'error'
        })
        this.addData = false
        this.formData = {}
        this.loading = false
      })
    },
    deleteForm (id) {
      this.loading = true
      deleteInventory(id).then(response => {
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.addData = false
        this.formData = {}
        this.loading = false
        this.getAllData()
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: 'Error',
          type: 'error'
        })
        this.addData = false
        this.formData = {}
        this.loading = false
      })
    }
  }
}
</script>
