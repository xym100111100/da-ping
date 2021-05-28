<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>相关数据</span>
    </div>
    <div class="chart-box" />
  </el-card>
</template>
<script>

export default {
  name: 'ElMap',
  data() {
    return {
    }
  }

}
</script>
<style lang="scss" scoped>
  .chart-box{
    height: 620px;
  }
</style>
