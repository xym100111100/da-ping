<template>
  <div class="dashboard-container">
    <elHeader />
    <elMap ref="elMap" />
  </div>
</template>

<script>
import elMap from './modules/map.vue'
import elHeader from './modules/header.vue'
export default {
  name: 'Dashboard',
  components: {
    elMap,
    elHeader
  }

}
</script>

<style lang="scss" scoped>
  .dashboard-container{
    background: #f1f3f5;
    padding: 12px 10px;
  }
</style>
