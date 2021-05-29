<template>
  <transition-group class="list-box" name="list" tag="span">
    <span v-for="(item,index) in String(value)" :key="item + index" class="number-item">
      <span class="number-box">
        {{ item }}
      </span>

    </span>
  </transition-group>
</template>
<script>

export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  }

}
</script>
<style lang="scss" scoped>
.list-box {
  display: inline-block;
  overflow: hidden;
  height: 32px;
  position: relative;
  z-index: 1;

}
.number-item {
  height: 32px;
  line-height: 32px;
  width: 24px;
  text-align: center;
  display: inline-block;
  position: relative;
  color: #4398eb;
  margin: 0 3px;
  font-size: 15px;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background-image: linear-gradient(-30deg, #3a9cfe, #61f1ee);
  }
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 2px;
    background: #f4fcff;
  }
}

// 过渡动画
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all .8s;
}

.list-leave-active {
  position: absolute;
  transition: all .8s;
  z-index: -1;
}

.list-enter {
  transform: translateY(100%);
}

.list-leave-to {
  transform: translateY(-100%);
}
</style>
