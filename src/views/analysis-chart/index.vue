<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col class="col-item" :sm="24" :md="24" :lg="16">
        <distributionMap />
      </el-col>
      <el-col class="col-item" :sm="24" :md="12" :lg="8">
        <today />
      </el-col>
      <el-col class="col-item" :sm="24" :md="12" :lg="8">
        <classificationChart />
      </el-col>
      <el-col class="col-item" :sm="24" :md="24" :lg="8">
        <transportChart />
      </el-col>

      <el-col class="col-item" :span="24">
        <trendChart />
      </el-col>
      <el-col class="col-item" :span="24">
        <sellChart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 销售统计表
import sellChart from './modules/sellChart.vue'

// 运力情况
import transportChart from './modules/transportChart.vue'

// 分类销售占比
import classificationChart from './modules/classificationChart.vue'

// 库存分布情况
import distributionMap from './modules/distributionMap.vue'

// 今日统计
import today from './modules/today.vue'

// 库存出入库趋势图表
import trendChart from './modules/trendChart.vue'
export default {
  name: 'Dashboard',
  components: {
    sellChart,
    transportChart,
    classificationChart,
    distributionMap,
    today,
    trendChart
  }

}
</script>

<style lang="scss" scoped>
.dashboard-container {
  background: #f1f3f5;
  padding: 12px 10px;
}

.col-item {
  margin-bottom: 12px;
}
</style>

