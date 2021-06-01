<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>购物漏斗模型</span>
    </div>
    <div class="chart-box">
      <div ref="main" class="funnel-box" />
      <div class="probability-box">
        <div>
          <el-progress :width="70" type="circle" color="#6fb0fe" :percentage="60" />
          <p>用户增长率</p>
        </div>
        <div>
          <el-progress :width="70" type="circle" color="#8ce247" :percentage="52" />
          <p>用户转化率</p>
        </div>
        <div>
          <el-progress :width="70" type="circle" color="#fecf51" :percentage="80" />
          <p>用户流失率</p>
        </div>
      </div>
    </div>

  </el-card>
</template>
<script>
import Resize from '@/mixins/resize.js'
import echarts from '@/components/useEcharts.js'
export default {
  name: 'ShoppingChart',
  mixins: [Resize],
  data() {
    return {
      chart: null
    }
  },
  created() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    /**
     * @description: 初始化图表
     * @param {*}
     * @return {*}
     */
    initChart() {
      this.chart = echarts.init(this.$refs.main)
      // 指定图表的配置项和数据
      var option = {
        color: ['#fe8724', '#fdcc47', '#bd81ff', '#3f8eee', '#6cbb2c'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}%'
        },
        series: [
          {
            name: '预期',
            type: 'funnel',
            left: '8%',
            top: '6%',
            width: '50%',
            height: '94%',
            label: {
              formatter: '{b} {c}%',
              color: '#222'
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              opacity: 0.9
            },
            data: [
              { value: 50, name: '浏览网站' },
              { value: 40, name: '加入购物车' },
              { value: 30, name: '生成订单' },
              { value: 20, name: '支付订单' },
              { value: 10, name: '完成订单' }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-box {
  height: 300px;
}

.funnel-box {
  height: 170px;
}

.probability-box {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;

  > div {
    flex: 1;
    text-align: center;
    p{
      margin: 6px 0;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 1199px) and (min-width:992px) {
    .chart-box{
    height: 342px;
  }
}
</style>
