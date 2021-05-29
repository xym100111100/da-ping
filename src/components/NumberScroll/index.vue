<template>
  <span class="number-scroll-box">
    <transition-group class="list-box" name="list" tag="span">
      <span v-for="(item,index) in String(value)" :key="item + index" class="number-item">
        <span class="number-box">
          {{ item }}
        </span>

      </span>
    </transition-group>
    <transition enter-active-class="animate__bounceInUp">
      <img v-show="showImg" class="up-img" src="../../assets/images/up.png" alt="">
    </transition>
  </span>
</template>
<script>

export default {
  name: 'NumberScroll',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showImg: false
    }
  },
  watch: {
    /**
     * @description: 监听数值是否改变，改变则刷新图标状态
     * @param {*}
     * @return {*}
     */
    value() {
      this.showImg = false
      setTimeout(() => {
        this.showImg = true
      }, 1)
    }

  }

}
</script>
<style lang="scss" scoped>
.number-scroll-box {
  height: 32px;
  line-height: 32px;
}
.list-box {
  display: inline-block;
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin: 0 3px;
}
.number-item {
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
}
.list-enter-active,
.list-leave-active {
  transition: all 0.8s;
}

.list-leave-active {
  position: absolute;
  transition: all 0.8s;
  z-index: -1;
}

.list-enter {
  transform: translateY(100%);
}

.list-leave-to {
  transform: translateY(-100%);
}

.up-img {
  transform: translateY(-40%);
}
@keyframes bounceInUp {
  from {
    transform: translate3d(0, 60%, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, -40%, 0);
  }
}
.animate__bounceInUp {
  animation: 0.8s;
  animation-name: bounceInUp;
}
</style>
