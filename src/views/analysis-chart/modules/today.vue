<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>今日统计</span>

    </div>
    <div ref="main" class="chart-box">
      <div class="item-box">
        <div class="img-box"><img src="../../../assets/images/i-total.png" alt="" srcset=""></div>
        <div class="item-content">
          <div class="item-value">
            <span>
              454545
            </span>
            公斤
          </div>
          <div class="item-name">
            总库存
          </div>
        </div>
      </div>

      <div class="item-box">
        <div class="img-box"><img src="../../../assets/images/i-sell.png" alt="" srcset=""></div>
        <div class="item-content">
          <div class="item-value">
            <span>
              78463
            </span>
            公斤
          </div>
          <div class="item-name">
            总销售库存
          </div>
        </div>
      </div>

      <div class="item-box">
        <div class="img-box"><img src="../../../assets/images/i-emergency.png" alt="" srcset=""></div>
        <div class="item-content">
          <div class="item-value">
            <span>
              78463
            </span>
            公斤
          </div>
          <div class="item-name">
            总应急库存
          </div>
        </div>
      </div>

      <div class="item-box">
        <div class="img-box"><img src="../../../assets/images/i-transport.png" alt="" srcset=""></div>
        <div class="item-content">
          <div class="item-value">
            <span>
              78488
            </span>
            公斤
          </div>
          <div class="item-name">
            总运力
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<style lang="scss" scoped>
.chart-box {
  height: 160px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .item-box {
    width: calc(50% - 12px);
    margin: 6px;
    border: 1px solid #efefef;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #626262;

    .img-box {
      width: 36px;
      height: 36px;
      > img {
        height: 100%;
        width: 100%;
      }
    }
    .item-content{
        flex: .7;
    }
    .item-value {
      font-size: 12px;
      padding-bottom: 8px;
      > span {
        font-size: 15px;
        font-weight: 700;
      }
    }
    .item-name {
      font-size: 12px;
    }
  }
}
</style>
