<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
    <div ref="main" style="width: 100%;height:400px;" />
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
          data: [5, 20, 4, 10, 10, 20]
        }, {
          name: '大豆',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: '食用油',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: '面粉',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
    }
  }
}
</script>
