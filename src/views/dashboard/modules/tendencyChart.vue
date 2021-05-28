<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>实时订单趋势图</span>
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
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '1%',
          right: '5%',
          top: '6%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '订单量',
            type: 'line',
            smooth: true,
            areaStyle: { normal: {
              // 折线渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#81befd'
              }, {
                offset: 0.4, color: '#e4f2ff'
              }, {
                offset: 1, color: '#fff'
              }]
              )
            }},
            data: [100, 140, 132, 170, 210, 140, 180, 130]
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
  .chart-box{
    height: 280px;
  }
</style>
