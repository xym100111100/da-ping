<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>粮油分类统计</span>
    </div>
    <div ref="main" class="chart-box" />
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
        color: ['#f9798c', '#739ffa', '#38d1d3', '#fbc542', '#52c1f5'],
        tooltip: {
          trigger: 'item'
        },
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
            name: '访问来源',
            type: 'pie',
            right: '60',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .chart-box{
    height: 160px;
  }

</style>
