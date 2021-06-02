<template>
  <div ref="main" class="chart-box" />
</template>
<script>
import Resize from '@/mixins/resize.js'
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
          value: 233
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
          value: 422
        },
        {
          time: '14:00',
          value: 333
        },
        {
          time: '15:00',
          value: 122
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
        color: ['#8cdc31'],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '6',
          right: '0',
          top: '6',
          bottom: '2%',
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: this.chartData.map(item => item.time),
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            name: '退货量（笔）',
            type: 'line',
            smooth: true,
            symbol: 'none',
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
.chart-box {
  height: 100%;
}
</style>
