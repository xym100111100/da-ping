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
      chartData: [
        {
          time: '08:00',
          value: 100
        },
        {
          time: '09:00',
          value: 140
        },
        {
          time: '10:00',
          value: 132
        },
        {
          time: '11:00',
          value: 170
        },
        {
          time: '12:00',
          value: 210
        },
        {
          time: '13:00',
          value: 140
        },
        {
          time: '14:00',
          value: 180
        },
        {
          time: '15:00',
          value: 130
        }
      ],
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
        color: ['#71a9ed'],
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
          data: this.chartData.map(item => item.time),
          axisLabel: {
            textStyle: {
              color: '#666'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#666'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              width: 1
            }
          }
        },
        series: [
          {
            name: '订单量',
            type: 'line',
            smooth: true,
            symbol: 'none',
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
            data: this.chartData.map(item => item.value)
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
    height: 284px;
  }

</style>
