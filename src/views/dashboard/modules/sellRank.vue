<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>销售排名</span>
    </div>
    <div class="sell-rank-box">
      <el-table header-row-class-name="sell-rank-header" size="small" :data="tableData" style="width: 100%">
        <el-table-column label="排名" width="80">
          <template slot-scope="scope">
            <div class="rank-box" :class="['first','second','thirdly'][scope.$index]">{{ scope.$index+1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodity" label="商品" />
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="salesVolume" label="销量">
          <template slot-scope="scope">
            <span>{{ scope.row.salesVolume }}kg</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="销售金额">
          <template slot-scope="scope">
            <span>{{ scope.row.money.toFixed(2) }}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="剩余库存量">
          <template slot-scope="scope">
            <span>{{ scope.row.inventory }}kg</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'SellRank',
  data() {
    return {
      tableData: [{
        commodity: '大米',
        brand: '稻花香',
        salesVolume: 5000,
        money: 250000,
        inventory: 1000
      }, {
        commodity: '食用油',
        brand: '金龙鱼',
        salesVolume: 1000,
        money: 1000,
        inventory: 1000
      }, {
        commodity: '面粉',
        brand: '金龙鱼',
        salesVolume: 1000,
        money: 1000,
        inventory: 1000
      }, {
        commodity: '生鲜食品',
        brand: '菜老包',
        salesVolume: 1000,
        money: 1000,
        inventory: 1000
      }, {
        commodity: '大米',
        brand: '稻花香',
        salesVolume: 5000,
        money: 250000,
        inventory: 1000
      }, {
        commodity: '食用油',
        brand: '金龙鱼',
        salesVolume: 1000,
        money: 1000,
        inventory: 1000
      }, {
        commodity: '面粉',
        brand: '金龙鱼',
        salesVolume: 1000,
        money: 1000,
        inventory: 1000
      }, {
        commodity: '生鲜食品',
        brand: '菜老包',
        salesVolume: 1000,
        money: 1000,
        inventory: 1000
      }, {
        commodity: '大米',
        brand: '稻花香',
        salesVolume: 5000,
        money: 250000,
        inventory: 1000
      }, {
        commodity: '食用油',
        brand: '金龙鱼',
        salesVolume: 1000,
        money: 1000,
        inventory: 1000
      }]
    }
  },
  methods: {

  }

}
</script>
  <style lang="scss" scoped>
.sell-rank-box {
  padding: 8px;
}
</style>
<style lang="scss">
.sell-rank-box {

  .el-table .el-table__header-wrapper,
  .el-table th,
  .el-table tr.sell-rank-header {
    background: #f0faff;
    color: #525252;
  }

  .el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0;
    .rank-box {
      background: #e4e4e4;
      text-align: center;
      border-radius: 3px;
      width: 22px;
      height: 24px;
      line-height: 24px;
      &.first{
        color: #ffffff;
        background: #e02020;
      }
      &.second{
        color: #ffffff;
        background: #fa6400;
      }
      &.thirdly{
        color: #ffffff;
        background: #f7b300;
      }
    }
  }
}
</style>
