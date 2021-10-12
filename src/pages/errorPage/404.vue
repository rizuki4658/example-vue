<template>
  <transition name="el-fade-in">
    <div v-if="loading" class="wrapper-error-page">
      <div class="font-xxl content">
        <svg-icon icon-class="cloud-computing" class="one"/>
        <svg-icon icon-class="full-moon" class="two"/>
      </div>
      <div class="content text">
        <div class="font-xxl text-alfa">404! OOps Sorry</div>
        <div>the page you are looking for does not exist</div>
        <br>
        <div>
          <el-button type="info" class="font-xl" round @click="handleBack">Back</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'noPageComponent',
  data () {
    return {
      loading: false
    }
  },
  async mounted () {
    this.loading = false
    this.delay(500)
    this.loading = true
  },
  methods: {
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    },
    handleBack () {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
