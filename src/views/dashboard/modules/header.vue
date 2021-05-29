<template>
  <el-row class="header-box">
    <div class="item-box">
      <div class="item-title">订单数据（笔）</div>
      <div class="item-info">{{ 2000 | splitFormat }} <span class="up">15.9%</span><img src="../../../assets/images/up.png"></div>
      <div class="item-chart">
        <orderChart />
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">订单总额（元）</div>
      <div class="item-info">{{ 54232.78 | splitFormat }} <span class="down">2.9%</span><img src="../../../assets/images/down.png"></div>
      <div class="item-chart">
        <orderTotalChart />
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">成交额（元）</div>
      <div class="item-info">{{ 2000 | splitFormat }} <span class="up">15.9%</span><img src="../../../assets/images/up.png"></div>
      <div class="item-chart">
        <turnoverChart />
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">退货量（笔）</div>
      <div class="item-info">{{ 2000 | splitFormat }} <span class="up">15.9%</span><img src="../../../assets/images/up.png"></div>
      <div class="item-chart">
        <returnChart />
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">消费者数量</div>
      <div class="item-info">{{ 2000 | splitFormat }} <span class="up">15.9%</span><img src="../../../assets/images/up.png"></div>
      <div class="item-chart">
        <consumerChart />
      </div>
    </div>

  </el-row>
</template>

<script>
// 订单数据图表
import orderChart from './headerModules/orderChart.vue'

// 订单总额图表
import orderTotalChart from './headerModules/orderTotalChart.vue'

// 成交额图表
import turnoverChart from './headerModules/turnoverChart.vue'

// 成交额图表
import returnChart from './headerModules/returnChart.vue'

// 消费者数量图表
import consumerChart from './headerModules/consumerChart.vue'

export default {
  name: 'ElHeader',
  components: {
    orderChart,
    orderTotalChart,
    turnoverChart,
    returnChart,
    consumerChart
  },
  filters: {
    /**
     * @description: 为数字添加千位分隔符
     * @param {*} e
     * @return {*}
     */
    splitFormat(e) {
      return Number(e).toLocaleString()
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box {
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 5px;
    background: #2c93ff;
  }

  > .item-box {
    flex: 1;
    padding: 24px 0 0;
    height: 190px;
    text-align: center;
    .item-title {
      font-size: 14px;
      color: #929292;
    }
    .item-info {
      padding: 10px 0;
      color: #222222;
      font-weight: 600;
      > span {
        font-size: 14px;
        margin: 0 6px 0 10px;
        font-weight: normal;
        &.up {
          color: #e43c3c;
        }
        &.down {
          color: #47b842;
        }
      }
      > img {
        width: 12px;
      }
    }

    .item-chart {
      height: 110px;
    }
  }

  > div:first-child ~ div {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 10%;
      left: 0;
      height: 80%;
      width: 1px;
      background: #eaeaea;
    }
  }
}
</style>
