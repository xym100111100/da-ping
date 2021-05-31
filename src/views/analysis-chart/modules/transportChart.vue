<template>
  <el-card class="box-card">
    <div slot="header" class="card-title">
      <span>运力情况</span>
    </div>
    <div class="transport-box">
      <el-table header-row-class-name="transport-header" height="173" size="mini" :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="类型" width="86" />
        <el-table-column prop="carCount" label="数量（辆）" width="86">
          <template slot-scope="scope">
            <span>{{ scope.row.carCount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="车次" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.count }}222</span>
          </template>
        </el-table-column>
        <el-table-column prop="dispatching" label="配送量">
          <template slot-scope="scope">
            <span><el-progress :color="customColors" :percentage="scope.row.dispatching" /></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'TransportChart',
  data() {
    return {
      tableData: [{
        type: '大型车',
        carCount: 5000,
        count: 442,
        dispatching: 80
      },
      {
        type: '中型车',
        carCount: 5000,
        count: 442,
        dispatching: 40
      },
      {
        type: '小型车',
        carCount: 5000,
        count: 442,
        dispatching: 70
      },
      {
        type: '其他',
        carCount: 5000,
        count: 442,
        dispatching: 19
      }
      ],
      customColors: [
        { color: '#65d3ff', percentage: 40 },
        { color: '#68f0d1', percentage: 60 },
        { color: '#fdc838', percentage: 70 },
        { color: '#ffa162', percentage: 80 },
        { color: '#f9798c', percentage: 100 }
      ]
    }
  }

}
</script>
<style lang="scss">
.transport-box {

  .el-table .el-table__header-wrapper,
  .el-table th,
  .el-table tr.transport-header {
    background: #f0faff;
    color: #525252;
  }

  .el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0;
  }
  .el-progress__text{
      font-size: 12px !important;
  }
}
</style>
