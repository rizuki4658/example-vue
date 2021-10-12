<template>
  <transition name="slide-fade">
    <div v-if="loading">
      <template v-if="type === 'text'">
        <div :class="className" class="text-skeleton">
          <PuSkeleton :count="1"/>
        </div>
      </template>
      <template v-if="type === 'input'">
        <div class="mb-4" style="margin-bottom: 2px; max-width: 300px;">
          <PuSkeleton :count="1" height="16px"/>
        </div>
        <div class="mb-16" style="margin-bottom: 24px;">
          <PuSkeleton :count="1" height="40px"/>
        </div>
      </template>
      <template v-if="type === 'button'">
        <div class="mb-16">
          <PuSkeleton :count="1" height="40px"/>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'skeletonLoading',
  props: ['loading', 'type', 'className'],
  computed: {
    loadingActive () {
      return this.loading
    }
  }
}
</script>

<style lang="scss">
  .text-skeleton {
    max-width: 300px;
    margin: 0px auto;
    &.font-sm {
      .pu-skeleton {
        height: 14px;
      }
    }
    &.font-md {
      .pu-skeleton {
        height: 16px;
      }
    }
    &.font-lg {
      .pu-skeleton {
        height: 24px;
      }
    }
    &.font-xl {
      .pu-skeleton {
        height: 32px;
      }
    }
    &.font-xxl {
      .pu-skeleton {
        height: 48px;
      }
    }
    .pu-skeleton {
      border-radius: 10px;
      height: 13px;
    }
  }
  .pu-skeleton {
    border-radius: 10px;
  }
</style>
