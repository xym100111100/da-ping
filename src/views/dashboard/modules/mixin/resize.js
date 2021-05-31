export default {
  computed: {
    sidebarOpened() {
      return this.$store.state.app.sidebar.opened
    }
  },
  watch: {
    /**
     * @description: 监听sidebar状态
     * @param {*}
     * @return {*}
     */
    sidebarOpened() {
      // 关闭sidebar动画时长为300ms，所以这里延长300ms执行重新渲染
      setTimeout(() => {
        this.resize()
      }, 300)
    }

  },
  methods: {
    /**
     * @description: 重新渲染图表
     * @param {*}
     * @return {*}
     */
    resize() {
      if (!this.chart) return false
      this.chart.resize()
    }
  },
  // 组件挂载后开始监听窗口变化
  mounted() {
    window.addEventListener('resize', this.resize)
  },
  // 组件销毁前移除监听
  deactivated() {
    window.removeEventListener('resize', this.resize)
  }
}
