<template>
  <div>
    <transition name="slide-fade">
      <div v-if="!loading" class="container p24">
        <el-row :gutter="20">
          <el-col :md="12" class="mb-8">
            <span class="font-lg">
              {{ $t('label.chart') }} {{ $t('label.sales') }} & {{ $t('label.inventory') }}
            </span>
          </el-col>
          <el-col :md="12" class="mb-8">
            <el-row :gutter="10" type="flex" justify="end" align="right">
              <el-col>
                <div class="label-block">
                  <el-select v-model="typeFilter">
                    <el-option
                      v-for="(option, n) in optionsFilter"
                      :key="n"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </div>
              </el-col>
              <el-col>
                <div v-if="typeFilter === 0" class="label-block">
                  <el-input v-model="yearsInput"/>
                </div>
                <div v-if="typeFilter === 1" class="label-block">
                  <el-select v-model="monthsInput">
                    <el-option
                      v-for="(month, a) in monthOptions"
                      :key="a"
                      :value="a"
                      :label="month"
                    />
                  </el-select>
                </div>
                <div v-if="typeFilter === 2" class="label-block">
                  <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    format="dd MMM yyyy">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="mt-24" style="margin-top: 48px;">
          <ve-line :data="chartData" :settings="chartSettings" :colors="colors" :grid="grid" :resize-delay="0"/>
        </div>
      </div>
    </transition>

    <transition name="slide-fade-two">
      <div v-if="loading" class="container p24">
        <el-row :gutter="20">
          <el-col :md="12" class="mb-8">
            <span class="font-lg">
              <PuSkeleton :count="1" :circle="true" height="48px"/>
            </span>
          </el-col>
          <el-col :md="12" class="mb-8">
            <el-row :gutter="10" type="flex" justify="end" align="right">
              <el-col>
                <PuSkeleton :count="1" :circle="true" height="48px"/>
              </el-col>
              <el-col>
                <PuSkeleton :count="1" :circle="true" height="48px"/>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="mt-24" style="margin-top: 32px;">
          <PuSkeleton :count="1" :circle="true" height="560px"/>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// import VeLine from 'v-charts/lib/line.common'
import moment from '@/utils/moment'
export default {
  name: 'chartDashboard',
  // components: { VeLine },
  props: ['loading', 'sales', 'inventory', 'users'],
  data () {
    return {
      chartSettings: {
        stack: { 'sell': ['Inventory', 'Sales'] },
        area: true
      },
      grid: {
        show: true,
        top: 50,
        left: 24,
        right: 32,
        bottom: 24,
        border: 0
        // backgroundColor: '#ccc',
        // borderColor: '#000'
      },
      colors: ['#40EE95', '#007BFF', 'yellow'],
      optionsFilter: [
        {
          value: 0,
          label: this.$t('label.years')
        },
        {
          value: 1,
          label: this.$t('label.months')
        },
        {
          value: 2,
          label: this.$t('label.dates')
        }
      ],
      typeFilter: 0,
      dataFilter: {
        type: 0,
        date: moment(new Date())
      },
      yearsInput: moment().format('YYYY'),
      monthsInput: 0,
      monthOptions: moment.months(),
      dateRange: ''
    }
  },
  computed: {
    filterDate () {
      const date = {}
      if (this.typeFilter === 0) {
        date.start = moment(new Date()).startOf('years').format('YYYY-MM-DD HH:mm:ss')
        date.end = moment(new Date()).endOf('years').format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.typeFilter === 1) {
        const month = parseInt(this.monthsInput) + 1
        const startDate = moment(this.yearsInput + '-' + month, 'YYYY-MM').startOf('month').format('MM-DD')
        const endDate = moment(this.yearsInput + '-' + month, 'YYYY-MM').endOf('month').format('MM-DD')
        date.start = moment(new Date(this.yearsInput + '-' + startDate)).format('YYYY-MM-DD HH:mm:ss')
        date.end = moment(new Date(this.yearsInput + '-' + endDate)).format('YYYY-MM-DD HH:mm:ss')
      } else if (this.typeFilter === 2) {
        date.start = moment(this.dateRange[0]).format('YYYY-MM-DD HH:mm:ss')
        date.end = moment(this.dateRange[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      return date
    },
    dataSales () {
      const data = []
      let start = moment(this.filterDate.start).format('YYYY-MM-DD')
      let end = moment(this.filterDate.end).format('YYYY-MM-DD')
      this.sales.map(x => {
        const date = moment(x.created_at).format('YYYY-MM-DD')
        if (this.typeFilter === 0) {
          if (moment(date).isBetween(start, end)) {
            data.push(x)
          }
        } else {
          if (moment(date).isSameOrBefore(end) && moment(date).isSameOrAfter(start)) {
            data.push(x)
          }
        }
      })
      return data
    },
    dataInventory () {
      const data = []
      let start = moment(this.filterDate.start).format('YYYY-MM-DD')
      let end = moment(this.filterDate.end).format('YYYY-MM-DD')
      this.inventory.map(x => {
        const date = moment(x.created_at).format('YYYY-MM-DD')
        if (this.typeFilter === 0) {
          if (moment(date).isBetween(start, end)) {
            data.push(x)
          }
        } else {
          if (moment(date).isSameOrBefore(end) && moment(date).isSameOrAfter(start)) {
            data.push(x)
          }
        }
      })
      return data
    },

    chartData () {
      const data = {
        columns: ['Months', 'Sales', 'Inventory'],
        rows: []
      }
      this.monthOptions.map(x => {
        data.rows.push({
          'Months': x,
          'Sales': 0,
          'Inventory': 0
        })
      })
      data.rows.map(x => {
        const date = moment(x.Months, 'MMMM').format('YYYY-MM')
        const sales = this.dataSales.filter(function (y) {
          const compare = moment(y.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM')
          return compare === date
        })
        if (sales.length > 0) {
          sales.map(a => {
            x.Sales += (a.qty * a.price)
          })
        }
      })

      data.rows.map(x => {
        const date = moment(x.Months, 'MMMM').format('YYYY-MM')
        const inventory = this.dataInventory.filter(function (z) {
          const compare2 = moment(z.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM')
          return compare2 === date
        })
        if (inventory.length > 0) {
          inventory.map(a => {
            x.Inventory += (a.stocks * a.price)
          })
        }
      })
      return data
    }
  },
  created () {
    console.log('NOT')
    console.log(this.loading)
  },
  updated () {
    console.log('OK')
    console.log(this.loading)
  },
  methods: {
  }
}
</script>
<style lang="scss">
.label-block{
  .el-select {
    display: block;
  }
}
.data-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .7);
  color: #888;
  font-size: 14px;
}
</style>
