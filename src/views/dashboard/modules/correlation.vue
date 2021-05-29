<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>相关数据</span>
    </div>
    <div class="chart-box">
      <!-- 订单增长情况 start -->
      <div class="item-box">
        <div class="title">订单增长情况</div>
        <div class="num">今日新增订单
          <NumberScroll :value="orderSize" />
        </div>
        <div class="scroll-table-box">
          <dv-scroll-board :config="config" />
        </div>
      </div>
      <!-- 订单增长情况 end -->

      <!-- 商品总览 start -->
      <div class="item-box">
        <div class="title">订单增长情况</div>
        <div class="flex-layout">
          <div>
            <div class="data-title">总用户量</div>
            <div class="data-box blue">155120 <span class="down">-29%</span></div>
          </div>
          <div>
            <div class="data-title">总用户量</div>
            <div class="data-box blue">155120 <span class="up">-29%</span></div>
          </div>
        </div>
      </div>
      <!-- 商品总览 end -->
      <!-- 商品总览 start -->
      <div class="item-box">
        <div class="title">订单增长情况</div>
        <div class="flex-layout">
          <div>
            <div class="data-title">总用户量</div>
            <div class="data-box red">155120 <span class="down">-29%</span></div>
          </div>
          <div>
            <div class="data-title">总用户量</div>
            <div class="data-box green">155120 <span class="up">-29%</span></div>
          </div>
        </div>
      </div>
      <!-- 商品总览 end -->
      <!-- 商品总览 start -->
      <div class="item-box">
        <div class="title">订单增长情况</div>
        <div class="flex-layout">
          <div>
            <div class="data-title">总用户量</div>
            <div class="data-box red">155120 <span class="down">-29%</span></div>
          </div>
          <div>
            <div class="data-title">总用户量</div>
            <div class="data-box green">155120 <span class="up">+29%</span></div>
          </div>
        </div>
      </div>
      <!-- 商品总览 end -->
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
      orderSize: 12055,
      config: {
        headerBGC: '#f0faff',
        oddRowBGC: '#ffffff',
        evenRowBGC: '#ffffff',
        rowNum: 3,
        header: ['渠道', '订单数', '同比'],
        columnWidth: [130],
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
      this.orderSize += 56
    }, 3000)
  }

}
</script>
<style lang="scss" scoped>
.chart-box {
  height: 640px;

  .item-box {
    margin-left: 2px;
    padding: 12px 0;
    .flex-layout {
      display: flex;
      flex-wrap: wrap;
      padding: 16px;
      .data-title {
        font-size: 14px;
        padding-bottom: 12px;
        color: #828282;
      }
      .data-box {
        font-size: 18px;
        font-weight: 600;
        &.blue {
          color: #007fff;
        }
        &.red {
          color: #f52a2a;
        }
        &.green {
          color: #18bf9b;
        }
        > span {
          font-size: 14px;
          margin-left: 6px;
          font-weight: normal;
          &.up {
            color: #e43c3c;
          }
          &.down {
            color: #47b842;
          }
        }
      }
      > div {
        width: 50%;
      }
    }
  }
}
.title {
  border-left: 4px solid #3d9dff;
  padding-left: 8px;
  font-size: 14px;
  font-weight: 700;
}
.num {
  height: 44px;
  line-height: 32px;
  padding: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-top: 8px;
  margin-bottom: 2px;
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
