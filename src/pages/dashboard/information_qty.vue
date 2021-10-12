<template>
  <div>
    <transition name="slide-fade">
      <div v-if="!loading" class="mb-32">
        <el-row :gutter="20">
          <el-col :md="8" style="margin-bottom: 16px;">
            <div class="container p16">
              <el-row type="flex" justify="center" align="middle">
                <el-col style="max-width: 80px;" class="m-null text-left">
                  <el-button
                    type="success"
                    circle
                    style="width: 64px; height: 64px; font-size: 40px;"
                    @click="goTo('sales')">
                    <svg-icon icon-class="sales"/>
                  </el-button>
                </el-col>
                <el-col class="m-null">
                  <el-row type="flex" justify="center" align="middle" class="font-md">
                    <el-col>
                      {{ $t('label.total_sales') }}
                    </el-col>
                    <el-col class="text-right">
                      {{ totalSales }}
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle" class="font-sm color-text-placeholder">
                    <el-col>
                      {{ $t('label.last_sales') }}
                    </el-col>
                    <el-col class="text-right">
                      {{ totalLastSale }}
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle" class="font-xs color-text-placeholder">
                    <el-col>
                      {{ lastSaleUpdate }}
                    </el-col>
                    <el-col class="text-right">
                      {{ totalLastQty }} pcs
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-col>

          <el-col :md="8" style="margin-bottom: 16px;">
            <div class="container p16">
              <el-row type="flex" justify="center" align="middle">
                <el-col style="max-width: 80px;" class="m-null text-left">
                  <el-button
                    type="info"
                    circle
                    style="width: 64px; height: 64px; font-size: 40px;"
                    @click="goTo('inventory')">
                    <svg-icon icon-class="inventory"/>
                  </el-button>
                </el-col>
                <el-col class="m-null">
                  <el-row type="flex" justify="center" align="middle" class="font-md">
                    <el-col>
                      {{ $t('label.total_sales') }}
                    </el-col>
                    <el-col class="text-right">
                      {{ totalInventory }}
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle" class="font-sm color-text-placeholder">
                    <el-col>
                      {{ $t('label.last_in_out') }}
                    </el-col>
                    <el-col class="text-right">
                      <span class="font-xs">
                        {{ lastActivityInventory.last_in }}pcs
                        <span class="color-success"><svg-icon icon-class="arrow-down"/></span>
                      </span>
                      <span class="font-xs">
                        {{ lastActivityInventory.last_out }}pcs
                        <span class="color-danger"><svg-icon icon-class="arrow-up"/></span>
                      </span>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle" class="font-xs color-text-placeholder">
                    <el-col>
                      <div >{{ lastActivityInventory.date }}</div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-col>

          <el-col :md="8" style="margin-bottom: 16px;">
            <div class="container p16">
              <el-row type="flex" justify="center" align="middle">
                <el-col style="max-width: 80px;" class="m-null text-left">
                  <el-button
                    type="warning"
                    circle
                    style="width: 64px; height: 64px; font-size: 40px;"
                    @click="goTo('users')">
                    <svg-icon icon-class="users"/>
                  </el-button>
                </el-col>
                <el-col class="m-null">
                  <el-row type="flex" justify="center" align="middle" class="font-md">
                    <el-col>
                      {{ $t('label.total') }}
                    </el-col>
                    <el-col class="text-right">
                      {{ totalUsers }}
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle" class="font-sm color-text-placeholder">
                    <el-col>
                      {{ $t('label.last_registered') }}
                    </el-col>
                    <el-col class="text-right">
                      {{ lastActivityUser }}
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>

    <transition name="slide-fade-two">
      <div v-if="loading">
        <el-row :gutter="20">
          <el-col v-for="n in 3" :key="n" :md="8" class="mb-16">
            <div class="container p24">
              <el-row type="flex" justify="center" align="middle">
                <el-col style="max-width: 100px;" class="m-null text-left skeleton-circle">
                  <PuSkeleton :count="1" :circle="true" height="80px" width="80px"/>
                </el-col>
                <el-col class="m-null">
                  <el-row :gutter="10" type="flex" justify="center" align="middle" class="mb-8">
                    <el-col :md="16">
                      <PuSkeleton :count="1" :circle="true" height="24px"/>
                    </el-col>
                    <el-col :md="8" class="text-right">
                      <PuSkeleton :count="1" :circle="true" height="24px"/>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" type="flex" justify="center" align="middle" class="mb-8">
                    <el-col :md="16">
                      <PuSkeleton :count="1" :circle="true" height="18px"/>
                    </el-col>
                    <el-col :md="8" class="text-right">
                      <PuSkeleton :count="1" :circle="true" height="18px"/>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" type="flex" justify="center" align="middle">
                    <el-col :md="16">
                      <PuSkeleton :count="1" :circle="true" height="14px"/>
                    </el-col>
                    <el-col :md="8" class="text-right">
                      <PuSkeleton :count="1" :circle="true" height="14px"/>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>
  </div>
</template>
<script>
import moment from '@/utils/moment'
export default {
  name: 'informationQty',
  props: ['loading', 'sales', 'inventory', 'users'],
  data () {
    return {
    }
  },
  computed: {
    totalLastQty () {
      if (this.sales.length) {
        return this.formatCurrency(this.sales[this.sales.length - 1].qty)
      } else {
        return 0
      }
    },
    totalLastSale () {
      if (this.sales.length) {
        return this.formatCurrency(this.sales[this.sales.length - 1].qty * this.sales[this.sales.length - 1].price)
      } else {
        return 0
      }
    },
    totalSales () {
      let total = 0
      this.sales.map(x => {
        total += (x.qty * x.price)
      })
      const formatTotal = this.formatCurrency(total)
      return formatTotal
    },
    lastSaleUpdate () {
      if (this.sales.length) {
        return this.sales[this.sales.length - 1].updated_at
      } else {
        return ''
      }
    },
    totalInventory () {
      let total = 0
      this.inventory.map(x => {
        total += (x.stocks * x.price)
      })
      const formatTotal = this.formatCurrency(total)
      return formatTotal
    },
    lastActivityInventory () {
      if (this.inventory.length) {
        const data = this.inventory
        const results = data.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        return {
          last_in: results[0].last_in,
          last_out: results[0].last_out,
          date: moment(new Date(results[0].updated_at)).format('DD MMM YYYY')
        }
      } else {
        return {
          last_in: 0,
          last_out: 0,
          date: moment(new Date()).format('DD MMM YYYY')
        }
      }
    },
    totalUsers () {
      return this.users.length + ' ' + this.$t('label.users')
    },
    lastActivityUser () {
      if (this.users.length) {
        const data = this.users
        const results = data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        return moment(new Date(results[0].created_at)).format('DD MMM YYYY')
      } else {
        return moment(new Date()).format('DD MMM YYYY')
      }
    }
  },
  methods: {
    formatCurrency (value) {
      let val = (value / 1)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    goTo (names) {
      this.$router.push({ name: names })
    }
  }
}
</script>
