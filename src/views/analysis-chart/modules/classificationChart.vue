<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>分类销售统计</span>
    </div>
    <div class="container-box">
      <div ref="main" class="chart-box" @mouseover="clearAction" @mouseout="dispatchActionChart" />
      <div class="t-title">
        <div>粮油类型</div>
        <div>库存量</div>
        <div>占比</div>
      </div>
    </div>
  </el-card>
</template>
<script>
import Resize from './mixin/resize.js'
import echarts from '@/components/useEcharts.js'
export default {
  name: 'ClassificationChart',
  mixins: [Resize],
  data() {
    return {
      timeInterval: null,
      chartIndex: 0,
      chartData: [
        { value: 1048, name: '大米' },
        { value: 735, name: '大豆' },
        { value: 580, name: '面' },
        { value: 484, name: '油' },
        { value: 300, name: '其他' }
      ],
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
          top: '26',
          right: 'right',
          icon: 'circle',
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 16,
          formatter: (name) => {
            let itemValue = 0
            let total = 0
            this.chartData.forEach(item => {
              total += item.value
              if (item.name === name) {
                itemValue = item.value
              }
            })

            return `{a|${name}}{b|${itemValue}}{b|${((itemValue / total) * 100).toFixed(2)}%}`
          },
          textStyle: {
            rich: {
              a: {
                width: 20
              },
              b: {
                width: 28,
                padding: [0, 0, 0, 24]
              }
            }
          }
        },
        series: [
          {
            name: '分类销售占比',
            type: 'pie',
            right: '130',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              formatter: function(e) {
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
            data: this.chartData
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
  .container-box{
    height: 160px;
    position: relative;
    .t-title{
      position: absolute;
      top: 2px;
      right: 0px;
      font-size: 12px;
      display: flex;
      >div{
        width: 56px;
        text-align: center;
      }
    }
  }

  .chart-box{
    height: 100%;

  }

</style>
