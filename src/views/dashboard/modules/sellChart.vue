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
      legendData: ['大米', '大豆', '食用油', '面粉'],
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
          data: this.legendData
        },
        grid: {
          left: '1%',
          right: '2%',
          top: '15%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['广州市', '汕头市', '揭阳市', '潮州市', '汕尾市', '梅州市', '梅州市', '河源市', '清远市'],
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
        series: [{
          name: '大米',
          type: 'bar',
          data: [3000, 2220, 3323, 2235, 2235, 5234, 6220, 2323, 5235]
        }, {
          name: '大豆',
          type: 'bar',
          data: [3533, 2433, 4242, 4235, 4235, 2230, 2220, 7323, 3235]
        }, {
          name: '食用油',
          type: 'bar',
          data: [5444, 4220, 2234, 5235, 5234, 2523, 4220, 2323, 5235]
        }, {
          name: '面粉',
          type: 'bar',
          data: [5234, 5220, 4235, 12350, 6236, 2234, 6220, 5323, 8335]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-box {
  height: 340px;
}
</style>
