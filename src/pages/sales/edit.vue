<template>
  <div>
    <el-dialog :visible.sync="showDialog" :show-close="false" fullscreen>
      <template slot="title">
        <transition name="slide-fade">
          <div v-if="!loading" class="text-center font-lg bolder">
            <template v-if="!idTittle">
              {{ $t('label.new_sales') }}
            </template>
            <template v-else>
              {{ idTittle }}
            </template>
          </div>
        </transition>
        <loading-skeleton :loading="loading" :type="'text'" :class-name="'font-xl'"/>
      </template>
      <div class="container-680">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-col class="m-null">
              <el-row :gutter="20" type="flex" justify="center" align="middle">
                <el-col>
                  <transition name="slide-fade">
                    <el-form-item v-if="!loading" :label="$t('label.customer')">
                      <el-input v-model="formData.name"/>
                    </el-form-item>
                  </transition>
                  <loading-skeleton :loading="loading" :type="'input'" :class-name="'font-xl'"/>
                </el-col>

                <el-col>
                  <transition name="slide-fade">
                    <el-form-item v-if="!loading" class="label-block">
                      <div slot="label">{{ $t('label.item_code') }}</div>
                      <el-select
                        v-model="formData.item_code"
                        @change="updateCode">
                        <el-option
                          v-for="(item, n) in dataItem"
                          :key="n"
                          :label="item.code + ' - ' + item.name"
                          :value="item.code"
                        />
                      </el-select>
                    </el-form-item>
                  </transition>
                  <loading-skeleton :loading="loading" :type="'input'" :class-name="'font-xl'"/>
                </el-col>
              </el-row>

              <transition name="slide-fade">
                <el-form-item v-if="!loading" :label="$t('label.item_name')">
                  <el-input v-model="formData.item_name" readonly/>
                </el-form-item>
              </transition>
              <loading-skeleton :loading="loading" :type="'input'" :class-name="'font-xl'"/>

              <el-row :gutter="20" type="flex" justify="center" align="middle">
                <el-col :span="16">
                  <transition name="slide-fade">
                    <el-form-item v-if="!loading" :label="$t('label.price')">
                      <money v-model="formData.price" v-bind="money" class="el-input__inner" readonly/>
                    </el-form-item>
                  </transition>
                  <loading-skeleton :loading="loading" :type="'input'" :class-name="'font-xl'"/>
                </el-col>
                <el-col :span="8">
                  <transition name="slide-fade">
                    <el-form-item v-if="!loading" :label="$t('label.qty')" class="label-block">
                      <el-input-number
                        v-model="formData.qty"
                        controls-position="right"
                        @change="updateTotal"
                        :min="1"
                      />
                    </el-form-item>
                  </transition>
                  <loading-skeleton :loading="loading" :type="'input'" :class-name="'font-xl'"/>
                </el-col>
              </el-row>

              <el-row
                :gutter="20"
                type="flex"
                justify="end"
                align="middle"
                class="mb-24">
                <el-col :sm="idTittle ? 16 : 24">
                  <transition name="slide-fade">
                    <el-form-item v-if="!loading" :label="$t('label.total')">
                      <money v-model="formData.total" v-bind="money" class="el-input__inner"/>
                    </el-form-item>
                  </transition>
                  <loading-skeleton :loading="loading" :type="'input'" :class-name="'font-xl'"/>
                </el-col>
                <el-col v-if="idTittle && !loading" :sm="8" class="text-right">
                  <el-popconfirm
                    confirmButtonText='OK'
                    cancelButtonText='No, Thanks'
                    icon="el-icon-info"
                    iconColor="red"
                    title="Are you sure to delete this?"
                    @onConfirm="deletingSale">
                    <el-button slot="reference" type="danger">Delete</el-button>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center" align="middle" class="mt-16">
            <el-col :sm="12">
              <transition name="slide-fade">
                <div v-if="!loading">
                  <el-button v-if="!idTittle" type="success" class="block" @click="save">Save</el-button>
                  <el-button v-else type="info" class="block" @click="update">Update</el-button>
                </div>
              </transition>
              <loading-skeleton :loading="loading" :type="'button'" :class-name="'font-xl'"/>
            </el-col>
            <el-col :sm="12">
              <transition name="slide-fade">
                <div v-if="!loading">
                  <el-button class="block" @click="cancel">Cancel</el-button>
                </div>
              </transition>
              <loading-skeleton :loading="loading" :type="'button'" :class-name="'font-xl'"/>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>

    <my-loading :loading="bigLoading"/>
  </div>
</template>
<script>
import { getSingle, update, create, deleteSales } from '@/api/sale'
import { getAll as getInventory } from '@/api/inventory'
import moment from '@/utils/moment'
export default {
  name: 'salesEdit',
  data () {
    return {
      showDialog: true,
      loading: true,
      formData: {},
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      idTittle: null,
      dataItem: [],
      dataSales: this.$route.params.list,
      lastStock: 0,
      minStock: 0,
      bigLoading: false
    }
  },
  async mounted () {
    if (this.$route.params) {
      if (this.$route.params.id) {
        const idSale = this.$route.params.id
        this.editSales(idSale)
      } else {
        this.newSales()
      }
    } else {
      this.newSales()
    }
  },
  methods: {
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    },

    async newSales () {
      this.loading = true
      getInventory().then(response => {
        this.dataItem = response.data
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error.error.data,
          type: 'error'
        })
        this.loading = false
      })
    },

    async editSales (id) {
      this.loading = true
      getSingle(id).then(response => {
        const data = response.data
        this.formData = data
        this.formData.total = this.formData.qty * this.formData.price
        this.idTittle = '#' + data.id + '_' + data.item_code
        this.showInventory()
      }).catch((error) => {
        this.$message({
          message: error.error.data,
          type: 'error'
        })
        this.loading = false
        this.$router.push({ name: 'sales' })
      })
    },

    showInventory () {
      getInventory().then(response => {
        this.dataItem = response.data
        this.getLastStock(this.dataItem)
      }).catch((error) => {
        this.$message({
          message: error.error.data,
          type: 'error'
        })
        this.loading = false
      })
    },

    async getLastStock (data) {
      await data.map(x => {
        if (x.code === this.formData.item_code) {
          this.lastStock = x.stocks
          this.minStock = x.min_stocks
        }
      })
      this.loading = false
    },

    updateCode (code) {
      let data = {}
      this.dataItem.map(x => {
        if (x.code === code) data = x
      })
      this.formData.item_id = data.id
      this.formData.item_name = data.name
      this.formData.price = data.price
      this.lastStock = data.stocks
      this.formData.total = this.formData.price * this.formData.qty
    },

    updateTotal (qty) {
      this.formData.total = this.formData.price * parseInt(qty)
    },

    checkStocks () {
      let salesQty = 0
      if (this.dataSales) {
        this.dataSales.map(x => {
          if (x.item_code === this.formData.item_code) {
            salesQty += x.qty
          }
        })
        if (salesQty <= this.lastStock) {
          return true
        } else {
          return false
        }
      } else {
        this.$router.push({ name: 'sales' })
      }
    },

    async save () {
      this.bigLoading = true
      const statusStock = this.checkStocks()
      if (!statusStock) {
        this.$message({
          message: 'This item is empty!',
          type: 'error'
        })
        await this.delay(300)
        this.bigLoading = false
        return false
      }

      const data = this.formData

      delete data.total
      delete data.username

      create(data).then(response => {
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.bigLoading = false
        this.$router.push({ name: 'sales' })
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: error.errorData,
          type: 'error'
        })
        this.bigLoading = false
      })
    },

    async update () {
      this.bigLoading = true
      const statusStock = this.checkStocks()
      if (!statusStock) {
        this.$message({
          message: 'This item is empty!',
          type: 'error'
        })
        await this.delay(300)
        this.bigLoading = false
        return false
      }

      const id = this.formData.id
      const data = this.formData
      const updateDate = moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
      // console.log(id)
      data.updated_at = updateDate

      delete data.id
      delete data.user_id
      delete data.created_at
      delete data.total
      delete data.username

      update(data, id).then(response => {
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.bigLoading = false
        this.$router.push({ name: 'sales' })
      }).catch((error) => {
        this.$message({
          message: error.errorData.error,
          type: 'error'
        })
        this.bigLoading = false
      })
    },

    cancel () {
      this.$router.push({ name: 'sales' })
    },

    deletingSale () {
      this.bigLoading = true
      const id = this.formData.id
      deleteSales(id).then(response => {
        this.$message({
          message: 'Success',
          type: 'success'
        })
        this.bigLoading = false
        this.$router.push({ name: 'sales' })
      }).catch((error) => {
        this.$message({
          message: error.errorData.error,
          type: 'error'
        })
        this.bigLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.label-block{
  .el-form-item__label {
    display: block;
    float: unset;
    text-align: left;
  }
  .el-form-item__content {
    .el-select {
      display: block;
    }
    .el-input-number {
      display: block;
      width: 100%;
    }
  }
}
</style>
