<template>
  <!--:before-close="reset"  @close="cancel"-->
  <el-dialog :visible.sync="showForm" :show-close="false" fullscreen>
    <div slot="title">
      <el-row type="flex">
        <el-col class="text-center">
          <span class="font-xl">
            <template v-if="data.id">
              {{ formData.code }}# {{ formData.name }}
            </template>
            <template v-else>
              {{ $t('label.new_item') }}
            </template>
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="container-680">
      <el-form :model="formData" ref="formItem">
        <el-row :gutter="20" style="margin-bottom: 0px;">
          <el-col>
            <el-form-item
              v-if="!formData.id"
              prop="code"
              :label="$t('label.code')"
              readonly>
              <el-input v-model="formData.code" placeholder="ex:CD0001"/>
            </el-form-item>

            <el-form-item
              prop="name"
              :label="$t('label.nameUp')">
              <el-input v-model="formData.name" placeholder="Item Name"/>
            </el-form-item>

            <el-form-item
              prop="brand"
              :label="$t('label.brand')">
              <el-input v-model="formData.brands" placeholder="Brands Name"/>
            </el-form-item>

            <el-row :gutter="20" type="flex">
              <el-col>
                <el-form-item
                  prop="min"
                  :label="$t('label.min_stock')">
                  <el-input
                    v-model.number="formData.min_stocks"
                    placeholder="Min Stock"/>
                  <transition name="el-fade-in">
                    <div
                      v-if="error.min"
                      style="line-height: normal; font-size: 12px;"
                      class="color-danger">
                      {{ $t('message.min_error') }}
                    </div>
                  </transition>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item
                  prop="max"
                  :label="$t('label.max_stock')">
                  <el-input
                    v-model.number="formData.max_stocks"
                    placeholder="Max Stock"/>
                    <transition name="el-fade-in">
                      <div
                        v-if="error.max"
                        style="line-height: normal; font-size: 12px;"
                        class="color-danger">
                        {{ $t('message.max_error') }}
                      </div>
                    </transition>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              v-if="!formData.id"
              prop="stock"
              :label="$t('label.stock')">
              <el-input
                v-model.number="formData.last_in"
                placeholder="Stock"/>
            </el-form-item>

            <el-form-item
              prop="stock"
              :label="$t('label.update') + ' ' + $t('label.stock')">
              <el-input
                v-model.number="formData.new_in"
                placeholder="Stock"/>
            </el-form-item>

            <el-form-item
              prop="price"
              :label="$t('label.price')">
              <div class="el-input">
                <money v-model="formData.price" v-bind="money" class="el-input__inner"/>
              </div>
            </el-form-item>

            <el-row v-if="formData.id" type="flex" justify="end" align="middle" class="mb-24">
              <el-col :sm="12" class="text-right">
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

            <el-row :gutter="20">
              <el-col :sm="12">
                <el-form-item v-if="formData.id">
                  <el-button type="info" @click="submitForm(1)" class="block">
                    <span class="font-md">{{ $t('label.update') }}</span>
                  </el-button>
                </el-form-item>
                <el-form-item v-else>
                  <el-button type="success" @click="submitForm(0)" class="block">
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
          </el-col>
        </el-row>
        <el-input
          v-model="formData.price"
          placeholder="ex: 10.000"
          type="hidden"/>

        <el-input
          v-if="formData.id"
          v-model="formData.stocks"
          placeholder="ex: 10.000"
          type="hidden"/>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'detailItems',
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
      formData: null,
      showForm: false,
      error: {
        max: false,
        min: false,
        stock: false
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      priceFormatted: ''
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
        this.formData = data
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    cancel () {
      this.$refs['formItem'].resetFields()
      if (this.formData.id) {
        this.$emit('cancel', 1)
      } else {
        this.$emit('cancel', 0)
      }
    },
    errorForm (name) {
      this.$message({
        message: this.$t('message.' + name),
        type: 'error'
      })
      return false
    },
    submitForm (type) {
      this.confirmItems(type)
    },
    confirmItems (type) {
      this.$emit('save', type)
    },
    deleteUser () {
      this.$emit('delete', this.formData.id)
    }
  }
}
</script>
