<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>库存出入库趋势</span>
    </div>
    <div ref="main" class="chart-box" />
  </el-card>
</template>
<script>
import Resize from '@/mixins/resize.js'
import echarts from '@/components/useEcharts.js'
export default {
  name: 'TrendChart',
  mixins: [Resize],
  data() {
    return {
      chartData: [
        {
          name: '广州市',
          total: 720,
          outCount: 100,
          inCount: 190
        },
        {
          name: '深圳市',
          total: 560,
          outCount: 145,
          inCount: 240
        },
        {
          name: '韶关市',
          total: 680,
          outCount: 152,
          inCount: 323
        },
        {
          name: '湛江市',
          total: 630,
          outCount: 213,
          inCount: 422
        },
        {
          name: '惠州市',
          total: 560,
          outCount: 99,
          inCount: 223
        },
        {
          name: '汕头市',
          total: 700,
          outCount: 186,
          inCount: 340
        },
        {
          name: '汕尾市',
          total: 660,
          outCount: 160,
          inCount: 321
        },
        {
          name: '揭阳市',
          total: 756,
          outCount: 150,
          inCount: 350
        },
        {
          name: '河源市',
          total: 620,
          outCount: 100,
          inCount: 249
        },
        {
          name: '肇庆市',
          total: 680,
          outCount: 180,
          inCount: 402
        },
        {
          name: '茂名市',
          total: 720,
          outCount: 198,
          inCount: 386
        },
        {
          name: '阳江市',
          total: 630,
          outCount: 180,
          inCount: 356
        },
        {
          name: '中山市',
          total: 620,
          outCount: 150,
          inCount: 310
        },
        {
          name: '佛山市',
          total: 520,
          outCount: 56,
          inCount: 215
        },
        {
          name: '珠海市',
          total: 730,
          outCount: 160,
          inCount: 415
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
        color: ['#71a9ed', '#5bdbc2', '#fcd262'],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '1%',
          right: '2%',
          top: '16%',
          bottom: '2%',
          containLabel: true
        },
        legend: {
          data: ['库存总量', '入库量', '出库量'],
          left: 'left'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartData.map(item => item.name),
          axisLabel: {
            color: '#666'
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
            color: '#666'
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
            name: '库存总量',
            type: 'line',
            symbol: 'none',
            areaStyle: {
              // 折线渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#81befd'
              }, {
                offset: 0.4, color: '#e4f2ff'
              }, {
                offset: 1, color: '#fff'
              }]
              )
            },
            data: this.chartData.map(item => item.total)
          },
          {
            name: '入库量',
            type: 'line',
            symbol: 'none',
            areaStyle: {
              // 折线渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#98e2e3'
              }, {
                offset: 0.4, color: '#bbeced'
              }, {
                offset: 1, color: '#fff'
              }]
              )
            },
            data: this.chartData.map(item => item.inCount)
          },
          {
            name: '出库量',
            type: 'line',
            symbol: 'none',
            areaStyle: {
              // 折线渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#fde9af'
              }, {
                offset: 0.4, color: '#f3f5e4'
              }, {
                offset: 1, color: '#fff'
              }]
              )
            },
            data: this.chartData.map(item => item.outCount)
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
  height: 320px;
}
@media screen and (max-width: 600px) {
  .chart-box {
    height: 180px;
  }
}
</style>
