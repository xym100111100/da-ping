<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>销售统计</span>
      <span>
        <el-radio-group v-model="date" size="small" @change="clearRangeDate">
          <el-radio-button label="本周">本周</el-radio-button>
          <el-radio-button label="本月">本月</el-radio-button>
          <el-radio-button label="本年">本年</el-radio-button>
        </el-radio-group>
        <el-date-picker v-model="rangeDate" class="range-date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" @change="clearDate" />
      </span>
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
      date: '本周',
      rangeDate: null,
      chartData: [
        { name: '肇庆市', rice: 670, soya: 763, edibleOil: 452, flour: 521 },
        { name: '清远市', rice: 1200, soya: 51, edibleOil: 215, flour: 756 },
        { name: '韶关市', rice: 2001, soya: 1121, edibleOil: 1221, flour: 521 },
        { name: '广州市', rice: 4800, soya: 234, edibleOil: 1223, flour: 162 },
        { name: '惠州市', rice: 1100, soya: 1211, edibleOil: 5421, flour: 434 },
        { name: '河源市', rice: 1120, soya: 235, edibleOil: 3121, flour: 252 },
        { name: '梅州市', rice: 3000, soya: 3623, edibleOil: 1251, flour: 2333 },
        { name: '潮州市', rice: 1620, soya: 1245, edibleOil: 1253, flour: 511 },
        { name: '云浮市', rice: 1500, soya: 3533, edibleOil: 5124, flour: 652 },
        { name: '江门市', rice: 1800, soya: 3213, edibleOil: 1223, flour: 533 },
        { name: '中山市', rice: 1200, soya: 623, edibleOil: 2513, flour: 254 },
        { name: '珠海市', rice: 1000, soya: 123, edibleOil: 1523, flour: 522 },
        { name: '佛山市', rice: 2227, soya: 513, edibleOil: 1245, flour: 233 },
        { name: '茂名市', rice: 1001, soya: 562, edibleOil: 1524, flour: 552 },
        { name: '湛江市', rice: 10, soya: 1233, edibleOil: 1685, flour: 623 },
        { name: '阳江市', rice: 2800, soya: 1632, edibleOil: 523, flour: 263 },
        { name: '深圳市', rice: 1980, soya: 2553, edibleOil: 1251, flour: 252 },
        { name: '揭阳市', rice: 1540, soya: 236, edibleOil: 3123, flour: 612 },
        { name: '汕头市', rice: 1620, soya: 123, edibleOil: 1231, flour: 352 },
        { name: '汕尾市', rice: 0, soya: 2123, edibleOil: 5121, flour: 275 },
        { name: '东莞市', rice: 1320, soya: 5236, edibleOil: 5612, flour: 845 }
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
     * @description: 清除时间范围值
     */
    clearRangeDate() {
      this.rangeDate = null
    },

    /**
     * @description: 清除时间值
     */
    clearDate() {
      this.date = null
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
        color: ['#5bcbff', '#46ebbf', '#7ea4fd', '#63e6f0'],
        tooltip: {
          trigger: 'item',
          formatter: ({ name }) => {
            let data = 0
            this.chartData.forEach(item => {
              if (item.name === name) {
                data = item
              }
            })
            if (!data) {
              return `暂无数据`
            }
            return `
          <div style="padding:2px 6px">
            <div style="font-weight:700;padding-bottom:6px;color:#333333;font-size:15px;">
              ${name}
            </div>
            <div style="padding-bottom:2px;">
              · 大米<span style="color:#323232;margin-left:6px;">${data.rice}吨</span>
            </div>
            <div style="padding-bottom:2px;">
              · 大豆<span style="color:#323232;margin-left:6px;">${data.soya}吨</span>
            </div>
            <div style="padding-bottom:2px;">
              · 食用油<span style="color:#323232;margin-left:6px;">${data.edibleOil}元</span>
            </div>
            <div style="padding-bottom:2px;">
              · 面粉<span style="color:#323232;margin-left:6px;">${data.flour}吨</span>
            </div>  
          </div>
          `
          }
        },
        legend: {
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
          data: this.chartData.map(item => item.name),
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
          data: this.chartData.map(item => item.rice)
        }, {
          name: '大豆',
          type: 'bar',
          data: this.chartData.map(item => item.soya)
        }, {
          name: '食用油',
          type: 'bar',
          data: this.chartData.map(item => item.edibleOil)
        }, {
          name: '面粉',
          type: 'bar',
          data: this.chartData.map(item => item.flour)
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
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  .range-date {
    margin-left: 8px;
    transform: translateY(1px);
  }
}

// 屏幕小于800px时隐藏时间范围选择
@media screen and (max-width: 800px) {
  .range-date {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .chart-box {
    height: 240px;
  }
}
</style>
