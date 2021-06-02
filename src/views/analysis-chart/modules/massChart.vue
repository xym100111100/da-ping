<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>库存质量检验汇总</span>
      <span>
        <el-radio-group v-model="date" size="small">
          <el-radio-button label="本周">本周</el-radio-button>
          <el-radio-button label="本月">本月</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div ref="main" class="chart-box" />
  </el-card>
</template>
<script>
import Resize from '@/mixins/resize.js'
import echarts from '@/components/useEcharts.js'
export default {
  name: 'ElMap',
  mixins: [Resize],
  data() {
    return {
      date: '本周',
      chartData: [
        {
          name: '广州市',
          qualifiedCount: 950,
          disqualifiedCount: 163
        },
        {
          name: '深圳市',
          qualifiedCount: 240,
          disqualifiedCount: 150
        },
        {
          name: '韶关市',
          qualifiedCount: 300,
          disqualifiedCount: 210
        },
        {
          name: '湛江市',
          qualifiedCount: 500,
          disqualifiedCount: 300
        },
        {
          name: '惠州市',
          qualifiedCount: 180,
          disqualifiedCount: 240
        },
        {
          name: '汕头市',
          qualifiedCount: 190,
          disqualifiedCount: 200
        },
        {
          name: '汕尾市',
          qualifiedCount: 300,
          disqualifiedCount: 180
        },
        {
          name: '揭阳市',
          qualifiedCount: 120,
          disqualifiedCount: 250
        },
        {
          name: '河源市',
          qualifiedCount: 240,
          disqualifiedCount: 150
        },
        {
          name: '肇庆市',
          qualifiedCount: 350,
          disqualifiedCount: 100
        },
        {
          name: '茂名市',
          qualifiedCount: 500,
          disqualifiedCount: 130
        },
        {
          name: '阳江市',
          qualifiedCount: 450,
          disqualifiedCount: 220
        },
        {
          name: '中山市',
          qualifiedCount: 550,
          disqualifiedCount: 115
        },
        {
          name: '佛山市',
          qualifiedCount: 160,
          disqualifiedCount: 240
        },
        {
          name: '珠海市',
          qualifiedCount: 120,
          disqualifiedCount: 60
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
        color: ['#32c5ff', '#facc4d'],
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let data = 0
            console.log(params)
            this.chartData.forEach(item => {
              if (item.name === params.name) {
                data = item
              }
            })
            if (!data) {
              return `暂无数据`
            }
            return `
          <div style="padding:2px 6px">
            <div style="font-weight:700;padding-bottom:6px;color:#333333;font-size:15px;">
              ${params.name}
            </div>
            <div style="padding-bottom:2px;">
              <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#32c5ff;"></span> 达标<span style="color:#323232;margin-left:6px;">${data.qualifiedCount}</span>
            </div>
            <div style="padding-bottom:2px;">
              <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#facc4d;"></span> 不达标<span style="color:#323232;margin-left:6px;">${data.disqualifiedCount}</span>
            </div>  
          </div>
          `
          }
        },
        legend: {
          data: ['达标', '不达标']
        },
        grid: {
          left: '1%',
          right: '2%',
          top: '18%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.chartData.map(item => item.name),
          axisLabel: {
            color: '#666'
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
            color: '#666'
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
          name: '达标',
          type: 'bar',
          data: this.chartData.map(item => item.qualifiedCount)
        }, {
          name: '不达标',
          type: 'bar',
          data: this.chartData.map(item => item.disqualifiedCount)
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
  height: 320px;
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
}
@media screen and (max-width: 600px) {
 .chart-box {
    height: 180px;
  }
}
</style>
