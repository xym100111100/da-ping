<template>
  <div class="tree-query-main">
    <div class="filter-input-box">
      <el-input v-model="filterText" placeholder="请输入关键词" size="small" suffix-icon="el-icon-search" />
    </div>
    <el-tree ref="tree" :data="data" :props="defaultProps" :filter-node-method="filterNode" accordion @node-click="handleNodeClick" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: null,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-query-main {
  padding-right: 10px;
  .filter-input-box {
    padding-bottom: 10px;
  }
}
</style>
