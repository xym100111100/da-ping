<template>
  <div class="header-box">
    <div class="item-box" />
    <div class="item-box" />
    <div class="item-box" />
    <div class="item-box" />
    <div class="item-box" />

  </div>
</template>

<script>
export default {
  name: 'ElHeader'
}
</script>
<style lang="scss" scoped>
.header-box {
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 4px;
    background: #2c93ff;
  }

  > .item-box {
    flex: 1;
    padding: 8px;
    height: 160px;
  }

  > div:first-child ~ div {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 10%;
      left: 0;
      height: 80%;
      width: 1px;
      background: #eaeaea;
    }
  }
}
</style>
