<script>
export default {

}
</script>

<style>

</style> */
<script>
export default {
  computed: {
    sidebarOpened() {
      return this.$store.state.app.sidebar.opened
    }
  },
  watch: {
    sidebarOpened(e) {
      setTimeout(() => {
        this.chart.resize()
      }, 300)
    }
  },
  created() {
    this.$nextTick(() => {
      this.initChart()
    })
    window.addEventListener('resize', () => {
      this.chart.resize()
    })
  }
}
</script>
