<template>
  <div>
    <div v-if="!loading" class="container">
      <div style="padding: 16px; background-color: #FFFFFF; border-radius: 10px; overflow: auto hidden;">
        <div style="width: 1366px;">
          <el-table
            :data="dataSales"
            style="width: 100%;"
            @row-click="rowClick">
            <el-table-column prop="name" :label="$t('label.customer')">
              <template slot-scope="scope">
                <div class="overflow-ellipsis">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="item_code" :label="$t('label.item_code')"/>
            <el-table-column prop="item_name" :label="$t('label.item_name')">
              <template slot-scope="scope">
                <div class="overflow-ellipsis">{{ scope.row.item_name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="price" :label="$t('label.price')">
              <template slot-scope="scope">
                <div class="overflow-ellipsis">
                  {{ formatCurrency(scope.row.price) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qty" :label="$t('label.qty')">
              <template slot-scope="scope">
                <div class="overflow-ellipsis">
                  {{ scope.row.qty }} pcs
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="price" :label="$t('label.total')">
              <template slot-scope="scope">
                <div class="overflow-ellipsis">
                  {{ getTotal(scope.row.price, scope.row.qty) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="username" :label="$t('label.created_by')">
              <template slot-scope="scope">
                <div class="overflow-ellipsis">{{ scope.row.username }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <el-button type="info" class="mt-16 font-md" round @click="addSales">
        <svg-icon icon-class="items-add"/> <span class="font-md">{{ 'Add Sales' }}</span>
      </el-button>
    </div>

    <my-loading :loading="loading"/>
  </div>
</template>
<script>
import { getAll } from '@/api/sale'
export default {
  name: 'PageSales',
  data () {
    return {
      loading: false,
      dataSales: []
    }
  },
  mounted () {
    this.getAllData()
  },
  methods: {
    getAllData () {
      this.loading = true
      getAll().then(response => {
        this.dataSales = response.data
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error.error.data,
          type: 'error'
        })
        this.dataSales = []
        this.loading = false
      })
    },
    rowClick (row) {
      this.$router.push({ name: 'sales-detail', params: { id: row.id, list: this.dataSales } })
    },
    addSales () {
      this.$router.push({ name: 'sales-add', params: { list: this.dataSales } })
    },
    getTotal (price, qty) {
      const value = price * qty
      const formatValue = this.formatCurrency(value)
      return formatValue
    },
    formatCurrency (value) {
      // to precision let val = (value/1).toFixed(2).replace('.', ',')
      let val = (value / 1)
      // thousand sperator val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>
