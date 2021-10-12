<template>
  <div id="app">
    <div v-if="activeNav" :class="$store.state.app.main_class" class="main-frame">
      <sidebar/>
      <div class="child-frame">
        <router-view/>
      </div>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    activeNav () {
      if (this.$route.meta.layout) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
