<template>
  <transition name="el-fade-in">
    <div v-if="loading" class="wrapper-loading">
      <div class="font-xxl" style="font-size: 64px; height: 80px; width: 100px; position: relative; overflow: hidden;">
        <svg-icon icon-class="cloud" class="one"/>
        <svg-icon icon-class="water" class="two"/>
        <svg-icon icon-class="water" class="three"/>
        <svg-icon icon-class="water" class="four"/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'componentLoading',
  props: ['loading'],
  computed: {
    loadingActive () {
      return this.loading
    }
  }
}
</script>
