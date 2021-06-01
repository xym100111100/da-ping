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
        label: '广东省',
        cityCode: 440000,
        level: 1,
        children: [{
          label: '广州市',
          cityCode: 440100,
          level: 2,
          children: [{
            label: 'xxx军供站',
            level: 3
          }]
        }, {
          label: '佛山市',
          cityCode: 440600,
          level: 2,
          children: [{
            label: 'xxx军供站',
            level: 3
          }]
        },
        {
          label: '中山市',
          cityCode: 440400,
          level: 2,
          children: [{
            label: 'xxx军供站',
            level: 3
          }]
        },
        {
          label: '深圳市',
          cityCode: 440300,
          level: 2,
          children: [{
            label: 'xxx军供站',
            level: 3
          }]
        },
        {
          label: '湛江市',
          cityCode: 440800,
          level: 2,
          children: [{
            label: 'xxx军供站',
            level: 3
          }]
        },
        {
          label: '东莞市',
          cityCode: 440900,
          level: 2,
          children: [{
            label: 'xxx军供站',
            level: 3
          }]
        },
        {
          label: '惠州市',
          cityCode: 441300,
          level: 2,
          children: [{
            label: 'xxx军供站',
            level: 3
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
      this.$emit('select', data)
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
