<template>
  <div class="layout-container">
    <app-header />
    <div class="main">
      <!-- 主区域渲染出口 -->
      <router-view></router-view>
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'
export default {
  name: 'Layout',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped>
.main {
  min-height: 800px;
}
</style>
