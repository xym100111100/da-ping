<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>广州市消费人群各项指标汇总</span>
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
      chart: null,
      districtExplorer: null
    }
  },
  async created() {
    await this.initAmap()
    this.$nextTick(() => {
      this.initChart()
      this.loadAreaNode(100000).then(res => {
        console.log(res)
      })
    })
  },
  methods: {
    /**
     * @description: 查询行政边界
     * @param {number} adcode 可参考城市编码表 https://lbs.amap.com/api/webservice/download
     * @return {*}
     */
    loadAreaNode(adcode) {
      return new Promise((resolve, reject) => {
        this.districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            return reject(error)
          }
          resolve(areaNode)
        })
      })
    },

    /**
     * @description: 初始化高德实例
     * @param {*}
     * @return {*}
     */
    initAmap() {
      return new Promise((resolve, reject) => {
        try {
          window.AMapUI.load(
            ['ui/geo/DistrictExplorer', 'lib/$'],
            (DistrictExplorer, $) => {
              // 创建一个实例
              this.districtExplorer = (window.districtExplorer =
            new DistrictExplorer({
              eventSupport: true // 打开事件支持
            }))
              resolve()
            }
          )
        } catch (error) {
          reject(error)
        }
      })
    },
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
    height: 578px;
  }
</style>
