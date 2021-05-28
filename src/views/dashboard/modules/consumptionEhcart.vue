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
            ['ui/geo/DistrictExplorer'],
            (DistrictExplorer) => {
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
    async initChart() {
      const AreaNode = await this.loadAreaNode(440000)
      const mapName = AreaNode.getName()
      const geoJson = {}
      geoJson.features = AreaNode.getSubFeatures()
      geoJson.type = 'FeatureCollection'

      this.chart = echarts.init(this.$refs.main)

      echarts.registerMap(mapName, geoJson)
      // 指定图表的配置项和数据
      var option = {

        tooltip: {
          trigger: 'item',
          formatter: `
          {b}
          <br/>
          客户数 2315人
          <br/>
          交易数 452笔
          <br/>
          交易额 4854575元
          <br/>
          客户浓度 56%
          `
        },

        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: '数据展示',
            type: 'map',
            mapType: mapName, // 自定义扩展图表类型
            label: {
              show: true
            },
            data: [
              { name: '肇庆市', value: 20057.34 },
              { name: '清远市', value: 15477.48 },
              { name: '韶关市', value: 31686.1 },
              { name: '广州市', value: 6992.6 },
              { name: '油尖旺', value: 44045.49 },
              { name: '深水埗', value: 40689.64 },
              { name: '九龙城', value: 37659.78 },
              { name: '黄大仙', value: 45180.97 },
              { name: '观塘', value: 55204.26 },
              { name: '葵青', value: 21900.9 },
              { name: '荃湾', value: 4918.26 },
              { name: '屯门', value: 5881.84 },
              { name: '元朗', value: 4178.01 },
              { name: '北区', value: 2227.92 },
              { name: '大埔', value: 2180.98 },
              { name: '沙田', value: 9172.94 },
              { name: '西贡', value: 3368 },
              { name: '离岛', value: 806.98 }
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
.chart-box {
  height: 578px;
}
</style>
