<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>广东省成品粮库分布情况</span>
      <div>
        <el-icon class="el-icon-full-screen" />
      </div>
    </div>
    <div class="container">
      <div class="tree-query-box">
        <TreeQuery @select="selectTree" />
      </div>
      <div class="chart-box">

        <div v-show="level !== 3" ref="main" />
      </div>
    </div>

  </el-card>
</template>
<script>
import Resize from './mixin/resize.js'
import echarts from '@/components/useEcharts.js'
import TreeQuery from '@/components/TreeQuery/index.vue'
export default {
  name: 'DistributionMap',
  components: {
    TreeQuery
  },
  mixins: [Resize],
  data() {
    return {
      date: '全部',
      chart: null,
      districtExplorer: null
    }
  },
  computed: {
    level() {
      return this.$route.query.level || 1
    }
  },
  async created() {
    await this.initAmap()
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs.main)
      this.setChartOption(440000)
      this.chart.on('click', this.echartsMapClick)
    })
  },
  methods: {
    /**
     * @description: 切换路由
     * @param {*}
     * @return {*}
     */
    to(level, cityCode) {
      this.$router.push({
        path: '/inventory/analysis-chart',
        query: {
          level,
          cityCode
        }
      })
    },
    selectTree(data) {
      if (data.cityCode) {
        this.echartsMapClick(data.cityCode)
        return
      }
      this.to(3)
    },
    /**
     * @description: 地图切换
     * @param {*} params
     * @return {*}
     */
    echartsMapClick(params) {
      if (typeof params === 'number') {
        this.setChartOption(params)
      }
      if (params.data && params.data.cityCode) {
        this.setChartOption(params.data.cityCode)
      }
    },

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
     * @description: 配置图表option
     * @param {number} adcode 可参考城市编码表 https://lbs.amap.com/api/webservice/download
     * @return {*}
     */
    async setChartOption(adcode) {
      this.to(2, adcode)

      // 获取区域节点对象440000
      const AreaNode = await this.loadAreaNode(adcode)
      // 获取区域名称
      const mapName = AreaNode.getName()

      const geoJson = {}
      // 获取区域节点的子集边界
      geoJson.features = AreaNode.getSubFeatures()
      // 设置类型为FeatureCollection
      geoJson.type = 'FeatureCollection'

      // 地理信息注册，option中的mapType需要与注册的mapName值一样
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
          show: false,
          min: 0,
          max: 5000,
          splitNumber: 5,
          // realtime: false,
          // calculable: true,
          // color: ['#8cbb2c', 'yellow', 'orangered']
          color: ['#f9892c', '#aa74e6', '#8cbb2c', '#f6cc58', '#628fea']
        },
        series: [
          {
            name: '数据展示',
            type: 'map',
            mapType: mapName,
            label: {
              show: true
            },
            data: [
              { name: '肇庆市', cityCode: 440100, value: 0 },
              { name: '清远市', cityCode: 440100, value: 1200 },
              { name: '韶关市', cityCode: 440100, value: 2001 },
              { name: '广州市', cityCode: 440100, value: 4800 },
              { name: '惠州市', cityCode: 440100, value: 1100 },
              { name: '河源市', cityCode: 440100, value: 1120 },
              { name: '梅州市', cityCode: 440100, value: 3000 },
              { name: '潮州市', cityCode: 440100, value: 1620 },
              { name: '云浮市', cityCode: 440100, value: 1500 },
              { name: '江门市', cityCode: 440100, value: 1800 },
              { name: '中山市', cityCode: 440100, value: 1200 },
              { name: '珠海市', cityCode: 440100, value: 1000 },
              { name: '佛山市', cityCode: 440100, value: 2227 },
              { name: '茂名市', cityCode: 440100, value: 1001 },
              { name: '湛江市', cityCode: 440100, value: 10 },
              { name: '阳江市', cityCode: 440100, value: 2800 },
              { name: '深圳市', cityCode: 440100, value: 1980 },
              { name: '揭阳市', cityCode: 440100, value: 1540 },
              { name: '汕头市', cityCode: 440100, value: 1620 },
              { name: '汕尾市', cityCode: 440100, value: 0 },
              { name: '东莞市', cityCode: 440100, value: 1320 }
            ]

          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
      this.chart.resize()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 656px;
  display: flex;
  .tree-query-box {
    width: 220px;
    border-right: 1px solid #efefef;
  }
}
.chart-box {
  flex: 1;
  height: 100%;
  > div {
    height: 100%;
  }
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
}

// 屏幕小于992px时，调整盒子高度，以正常的比例展示
@media screen and (max-width: 992px) {
  .container {
    height: 342px;
  }
}

@media screen and (max-width: 630px) {
  .container {
  height: 560px;
  flex-direction: column;
  .tree-query-box {
    width: 100%;
    height: 200px;
    overflow: auto;
    border: 1px solid #efefef;

    border-bottom: 0;
  }
  .chart-box {
  flex: 1;
  > div {
    border: 1px solid #efefef;
    height: 100%;
  }
}
  }
}
</style>
