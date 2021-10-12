<template>
  <div>
    <information-qty
      :loading="loading"
      :sales="dataSales"
      :inventory="dataInventory"
      :users="dataUsers"
    />

    <!-- <chart-dashboard :loading="loading" :sales="dataSales" :inventory="dataInventory"/> -->
  </div>
</template>
<script>
import { getAll as getAllSales } from '@/api/sale'
import { getAll as getAllInventory } from '@/api/inventory'
import { getAllUser } from '@/api/user'
import informationQty from './information_qty'
// import chartDashboard from './chart_dashboard'
import moment from '@/utils/moment'
export default {
  name: 'PageDashboard',
  components: {
    informationQty
    // chartDashboard
  },
  props: ['statusNavbar'],
  data () {
    return {
      loading: true,
      dataSales: [],
      dataInventory: [],
      dataUsers: []
    }
  },
  mounted () {
    this.getSales()
  },
  methods: {
    async getSales () {
      this.loading = true
      await getAllSales().then(response => {
        const data = response.data
        data.map(x => {
          const date = moment(x.updated_at).format('DD MMM YYYY')
          x.updated_at = date
        })
        this.dataSales = data
      }).catch((error) => {
        this.$message({
          message: error.errorData,
          type: 'error'
        })
      })
      this.getInventory()
    },
    async getInventory () {
      await getAllInventory().then(response => {
        this.dataInventory = response.data
      }).catch((error) => {
        this.$message({
          message: error.errorData,
          type: 'error'
        })
      })
      this.getAllUser()
    },
    getAllUser () {
      getAllUser().then(response => {
        this.dataUsers = response.data
        this.loading = false
      }).catch((error) => {
        this.$message({
          message: error.errorData,
          type: 'error'
        })
        this.loading = false
      })
    }
  }
}
</script>
