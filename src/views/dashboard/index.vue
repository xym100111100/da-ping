<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <!-- 顶部 start -->
      <el-col class="col-item" :span="24">
        <elHeader />
      </el-col>
      <!-- 顶部 end -->
      <!-- 中间 start -->
      <el-col class="col-item" :sm="24" :md="12" :lg="6">
        <el-row>
          <el-col class="col-item" :span="24">
            <correlation />
          </el-col>
          <el-col :span="24">
            <tendencyChart />
          </el-col>
        </el-row>
      </el-col>
      <el-col class="col-item" :sm="24" :md="12" :lg="18">
        <el-row :gutter="10">
          <el-col class="col-item" :sm="24" :md="24" :lg="16">
            <consumptionEhcart />
          </el-col>
          <el-col class="col-item" :sm="24" :md="24" :lg="8">
            <el-row>
              <el-col class="col-item" :sm="24" :md="24" :lg="24">
                <classificationChart />
              </el-col>
              <el-col :sm="24" :md="24" :lg="24">
                <shoppingChart />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <sellChart ref="elMap" />
          </el-col>
        </el-row>
      </el-col>
      <!-- 中间 end -->

    </el-row>
  </div>
</template>

<script>
// 销售统计表
import sellChart from './modules/sellChart.vue'

// 购物漏斗模型
import shoppingChart from './modules/shoppingChart.vue'

// 分类销售占比
import classificationChart from './modules/classificationChart.vue'

// 消费人群各项指标汇总
import consumptionEhcart from './modules/consumptionEhcart.vue'

// 相关数据
import correlation from './modules/correlation.vue'

// 实时订单趋势图
import tendencyChart from './modules/tendencyChart.vue'

import elHeader from './modules/header.vue'
export default {
  name: 'Dashboard',
  components: {
    sellChart,
    shoppingChart,
    classificationChart,
    consumptionEhcart,
    correlation,
    tendencyChart,
    elHeader
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
