<template>
  <el-card class="box-card map-card" :class="{'full-box':fullscreen}">
    <div slot="header" class="card-title">
      <span>广东省成品粮库分布情况</span>
      <div>
        <img v-show="Number(level) !== 1" class="back-img" src="../../../assets/images/d-back.png" @click="backRouter">
        <img class="full-img" src="../../../assets/images/d-full.png" @click="toggleFull">
      </div>
    </div>
    <div class="container">
      <div class="tree-query-box">
        <TreeQuery @select="selectTree" />
      </div>
      <div class="chart-box">
        <div class="parent-drag-box" @mousedown="startDrag" @mousemove="drag" @mouseleave="stopDrag" @mouseup="stopDrag">
          <div class="action-box">
            <div class="plus" @click="zoomIn" />
            <div class="mini" @click="zoomOut" />
          </div>
          <div ref="drag" class="drag-box">
            <div v-show="level !== 3" ref="main" class="map-box" />
          </div>

        </div>

        <div v-show="level === 3">当前站点：{{ siteName }}</div>
      </div>
    </div>

  </el-card>
</template>
<script>
import Resize from '@/mixins/resize.js'
import echarts from '@/components/useEcharts.js'
import TreeQuery from '@/components/TreeQuery/index.vue'
import Zoom from '@/mixins/zoom'
export default {
  name: 'DistributionMap',
  components: {
    TreeQuery
  },
  mixins: [Resize, Zoom],
  data() {
    return {
      chartData: [
        { name: '肇庆市', value: 0, volume: 63, sum: 452, rate: 51, cityCode: 441200 },
        { name: '清远市', value: 1200, volume: 51, sum: 215, rate: 76, cityCode: 441800 },
        { name: '韶关市', value: 2001, volume: 12121, sum: 12521, rate: 21, cityCode: 440200 },
        { name: '广州市', value: 4800, volume: 234, sum: 123123, rate: 12, cityCode: 440100 },
        { name: '惠州市', value: 1100, volume: 12121, sum: 421, rate: 44, cityCode: 441300 },
        { name: '河源市', value: 1120, volume: 235, sum: 51251, rate: 22, cityCode: 441600 },
        { name: '梅州市', value: 3000, volume: 12121, sum: 1251, rate: 33, cityCode: 441400 },
        { name: '潮州市', value: 1620, volume: 1245, sum: 123, rate: 11, cityCode: 445100 },
        { name: '云浮市', value: 1500, volume: 12121, sum: 5124, rate: 62, cityCode: 445300 },
        { name: '江门市', value: 1800, volume: 5213, sum: 123, rate: 53, cityCode: 440700 },
        { name: '中山市', value: 1200, volume: 12121, sum: 45213, rate: 24, cityCode: 442000 },
        { name: '珠海市', value: 1000, volume: 123, sum: 123, rate: 52, cityCode: 440400 },
        { name: '佛山市', value: 2227, volume: 513, sum: 1245, rate: 23, cityCode: 440600 },
        { name: '茂名市', value: 1001, volume: 562, sum: 124, rate: 52, cityCode: 440900 },
        { name: '湛江市', value: 10, volume: 1233, sum: 5123, rate: 63, cityCode: 440800 },
        { name: '阳江市', value: 2800, volume: 56232, sum: 523, rate: 23, cityCode: 441700 },
        { name: '深圳市', value: 1980, volume: 7553, sum: 12512, rate: 52, cityCode: 440300 },
        { name: '揭阳市', value: 1540, volume: 236, sum: 123, rate: 12, cityCode: 445200 },
        { name: '汕头市', value: 1620, volume: 123, sum: 51231, rate: 52, cityCode: 440500 },
        { name: '汕尾市', value: 0, volume: 5123, sum: 5121, rate: 25, cityCode: 441500 },
        { name: '花都区', value: 0, volume: 5123, sum: 5121, rate: 25 },
        { name: '东莞市', value: 1320, volume: 5236, sum: 5612, rate: 45, cityCode: 441900 }
      ],
      date: '全部',
      chart: null,
      districtExplorer: null
    }
  },
  computed: {
    level() {
      return this.$route.query.level || 1
    },
    cityCode() {
      return this.$route.query.cityCode || 440000
    },
    siteName() {
      return this.$route.query.siteName
    }
  },
  watch: {
    cityCode(e) {
      if (e && !this.siteName) {
        this.setChartOption(e)
        this.zoomReset()
        this.locationReset()
      }
    }
  },
  async created() {
    await this.initAmap()
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs.main)
      // 首次初始化地图配置
      this.setChartOption(440000)
      // 监听地图点击事件
      this.chart.on('click', this.echartsMapClick)
    })
  },
  methods: {

    /**
     * @description: 切换路由
     * @param {*}
     * @return {*}
     */
    to(level, cityCode, siteName) {
      this.$router.push({
        path: this.$route.path,
        query: {
          level,
          cityCode,
          siteName
        }
      })
    },
    selectTree(data) {
      if (data.cityCode) {
        // this.echartsMapClick(data.cityCode)
        this.to(data.level, data.cityCode)
        return
      }

      // 切换到站点
      this.to(data.level, undefined, data.label)
    },
    /**
     * @description: 点击地图触发该函数
     * @param {*} params
     * @return {*}
     */
    echartsMapClick(params) {
      if (params.data && params.data.cityCode) {
        this.to(2, params.data.cityCode)
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
      // 获取区域节点对象440000
      const AreaNode = await this.loadAreaNode(adcode)
      // 获取区域名称
      const mapName = AreaNode.getName()

      const geoJson = {}
      // 获取区域节点的子集边界
      geoJson.features = AreaNode.getSubFeatures()
      // 设置类型为FeatureCollection
      geoJson.type = 'FeatureCollection'

      // 地理信息注册，option中的map需要与注册的mapName值一样
      echarts.registerMap(mapName, geoJson)

      // 指定图表的配置项和数据
      var option = {

        tooltip: {
          trigger: 'item',
          formatter: (item) => {
            if (!item.data) {
              return `暂无数据`
            }
            return `
          <div style="padding:2px 6px">
            <div style="font-weight:700;padding-bottom:6px;color:#333333;font-size:15px;">
              ${item.name}
            </div>
            <div style="padding-bottom:2px;">
              · 客户数<span style="color:#333333;margin-left:6px;">${item.data.value}人</span>
            </div>
            <div style="padding-bottom:2px;">
              · 交易数<span style="color:#333333;margin-left:6px;">${item.data.volume}笔</span>
            </div>
            <div style="padding-bottom:2px;">
              · 交易额<span style="color:#333333;margin-left:6px;">${item.data.sum}元</span>
            </div>
            <div style="padding-bottom:2px;">
              · 客户浓度<span style="color:#333333;margin-left:6px;">${item.data.rate}%</span>
            </div>  
          </div>
          `
          }
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
            map: mapName,
            label: {
              show: true
            },
            data: this.chartData

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
  .box-card {
  height: 725px;
}
.container {
  height: 100%;
  display: flex;
  .tree-query-box {
    width: 220px;
    border-right: 1px solid #efefef;
  }
}
.chart-box {
  flex: 1;
  height: 100%;
  overflow: hidden;
  .parent-drag-box {
    height: 100%;
    width: 100%;
    position: relative;
    .drag-box {
      height: 100%;
      width: 100%;
      position: relative;
      > .map-box {
      height: 100%;
      transition: all 0.3s;
    }
    }

    .action-box {
      position: absolute;
      right: 8px;
      bottom: 52px;
      width: 36px;
      height: 72px;
      background: #ffffff;
      z-index: 99;

      .plus,
      .mini {
        width: 36px;
        height: 36px;
        position: relative;
        z-index: 99;
      }
      .plus {
        background: url("../../../assets/images/map-plus.png");
      }

      .plus:active {
        background: url("../../../assets/images/map-plus-active.png");
      }
      .mini {
        background: url("../../../assets/images/map-mini.png");
      }
      .mini:active {
        background: url("../../../assets/images/map-mini-active.png");
      }
    }
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
  .box-card {
    height: 600px;
  }
}

@media screen and (max-width: 630px) {
  .box-card {
    height: 600px;
  }
  .container {
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

.back-img {
  margin-right: 12px;
}
</style>
<style lang="scss">
.box-card.map-card {
  .el-card__body {
    height: 100%;
  }
}
</style>
