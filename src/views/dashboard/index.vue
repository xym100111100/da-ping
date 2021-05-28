<template>
  <div class="dashboard-container">
    <elMap ref="elMap" />
  </div>
</template>

<script>
import elMap from './modules/map.vue'
export default {
  name: 'Dashboard',
  components: {
    elMap
  }

}
</script>

<style lang="scss" scoped>

</style>
