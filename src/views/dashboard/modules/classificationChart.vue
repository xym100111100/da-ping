<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>分类销售占比</span>
    </div>
    <div ref="main" class="chart-box" @mouseover="clearAction" @mouseout="dispatchActionChart" />
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
      timeInterval: null,
      chartIndex: 0,
      chart: null
    }
  },
  created() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  // 组件销毁前移除切换动画
  deactivated() {
    this.clearAction()
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
        color: ['#f9798c', '#739ffa', '#38d1d3', '#fbc542', '#52c1f5'],
        legend: {
          top: 'center',
          right: 'right',
          icon: 'circle',
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 16,
          formatter: function(e) {
            return e + '  1510'
          }
        },
        series: [
          {
            name: '分类销售占比',
            type: 'pie',
            right: '60',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              formatter: function(e) {
                console.log()
                return `{a|${e.percent}%}\n\r\n\r${e.data.name}`
              },
              position: 'center',
              rich: {
                a: {
                  color: 'red',
                  lineHeight: 10,
                  fontSize: 18
                }

              }
            },
            emphasis: {
              label: {
                show: true,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '大米' },
              { value: 735, name: '大豆' },
              { value: 580, name: '面' },
              { value: 484, name: '油' },
              { value: 300, name: '其他' }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
      this.dispatchActionChart(0)
    },
    /**
   * @description: 自动切换echart高亮区块
   * @param {*}
   * @return {*}
   */
    dispatchActionChart() {
      this.timeInterval = setInterval(() => {
        this.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.chartIndex
        })

        ++this.chartIndex > 4 && (this.chartIndex = 0)
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.chartIndex
        })
      }, 2000)
    },
    /**
     * @description: 移除自动切换
     * @param {*}
     * @return {*}
     */
    clearAction() {
      window.clearInterval(this.timeInterval)
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.chartIndex
      })
    }

  }
}
</script>
<style lang="scss" scoped>
  .chart-box{
    height: 200px;
  }
  @media screen and (max-width: 1199px) and (min-width:992px) {
    .chart-box{
    height: 342px;
  }
}
</style>
