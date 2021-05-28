<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>销售统计</span>
    </div>
    <div ref="main" class="chart-box" />
  </el-card>
</template>
<script>
import Resize from './mixin/resize.js'
import echarts from '@/components/useEcharts.js'
export default {
  name: 'ElMap',
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
        color: ['#5bcbff', '#52d9f5', '#7ea4fd', '#63e6f0'],
        tooltip: {},
        legend: {
          data: ['大米', '大豆', '食用油', '面粉']
        },
        xAxis: {
          data: ['广州市', '广州市', '广州市', '广州市', '广州2市', '广州市']
        },
        yAxis: {},
        series: [{
          name: '大米',
          type: 'bar',
          data: [3000, 20, 4, 235, 235, 234]
        }, {
          name: '大豆',
          type: 'bar',
          data: [5, 233, 36, 235, 235, 20]
        }, {
          name: '食用油',
          type: 'bar',
          data: [5, 20, 234, 5235, 234, 523]
        }, {
          name: '面粉',
          type: 'bar',
          data: [5, 20, 235, 12350, 6236, 234]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
  .chart-box{
    height: 620px;
  }
</style>
