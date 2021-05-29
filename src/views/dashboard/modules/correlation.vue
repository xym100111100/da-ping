<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>相关数据</span>
    </div>
    <div class="chart-box">
      <div class="title">订单增长情况</div>
      <div class="num">今日新增订单
        <NumberScroll :value="orderSize" />个
      </div>
      <div class="scroll-table-box">
        <dv-scroll-board :config="config" />
      </div>
    </div>
  </el-card>
</template>
<script>
import NumberScroll from '@/components/NumberScroll/index.vue'
export default {
  name: 'Correlation',
  components: {
    NumberScroll
  },
  data() {
    return {
      orderSize: 1200,
      config: {
        headerBGC: '#f0faff',
        oddRowBGC: '#ffffff',
        evenRowBGC: '#ffffff',
        rowNum: 3,
        header: ['渠道', '订单数', '同比'],
        columnWidth: [100],
        data: [
          ['区域门店', '500', '<span style="color:red;">+ 5%</span>'],
          ['区域代理', '85', '<span style="color:red;">+ 5%</span>'],
          ['电商小程序', '2900', '<span style="color:red;">+ 5%</span>'],
          ['直播', '585', '<span style="color:red;">+ 5%</span>']

        ]
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.orderSize += 100
    }, 2000)
  }

}
</script>
<style lang="scss" scoped>
.chart-box {
  height: 620px;
}
.num {
  padding: 6px;
}

.scroll-table-box {
  border: 1px solid #efefef;
  height: 180px;
}
</style>
<style lang="scss">
.scroll-table-box {
  .header-item {
    color: #333333;
    font-size: 14px;
    font-weight: 600;
  }
  .row-item {
    color: #666666;
  }
}
</style>
