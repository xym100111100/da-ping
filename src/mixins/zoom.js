export default {
  data() {
    return {
      dragStart: false,
      dragX: 0,
      dragY: 0,
      domX: 0,
      domY: 0,
      fullscreen: false
    }
  },
  methods: {
    // 放大元素
    zoomIn() {
      const t = this.$refs.main.style.transform
      if (!t) {
        this.$refs.main.style.transform = 'scale(1.1)'
        return false
      }
      const num = t.replace(/[^0-9.]/ig, '')
      this.$refs.main.style.transform = `scale(${Number(num) + 0.2})`
    },
    // 缩小元素
    zoomOut() {
      const t = this.$refs.main.style.transform
      if (!t) {
        this.$refs.main.style.transform = 'scale(0.9)'
        return false
      }
      const num = t.replace(/[^0-9.]/ig, '')
      this.$refs.main.style.transform = `scale(${Number(num) - 0.2})`
    },
    // 缩放重置
    zoomReset() {
      this.$refs.main.style.transform = `scale(1)`
    },
    // 位置重置
    locationReset() {
      this.$refs.drag.style.top = '0px'
      this.$refs.drag.style.left = '0px'
    },
    // 拖拽开始
    startDrag(e) {
      e.preventDefault()
      this.dragStart = true
      // 拖放元素的y轴坐标
      this.dragX = e.clientX
      this.dragY = e.clientY
      this.domX = parseInt(this.$refs.drag.style.left || 0)
      this.domY = parseInt(this.$refs.drag.style.top || 0)
    },
    // 拖拽中
    drag(e) {
      e.preventDefault()
      if (this.dragStart) {
        this.$refs.drag.style.top = (this.domY + e.clientY - this.dragY) + 'px'
        this.$refs.drag.style.left = (this.domX + e.clientX - this.dragX) + 'px'
      }
    },
    // 拖拽结束
    stopDrag(e) {
      e.preventDefault()
      this.dragStart = false
    },
    backRouter() {
      this.$router.back()
    },
    toggleFull() {
      this.fullscreen = !this.fullscreen

      // 全屏显示时，则隐藏掉body的滚动条，防止滚动穿透
      if (this.fullscreen) {
        document.querySelector('body').style = 'overflow-y: hidden;'
      } else {
        document.querySelector('body').style = 'overflow-y: auto;'
      }

      // 延时刷新图表
      setTimeout(() => {
        this.chart.resize()
      }, 280)
    }

  }
}
