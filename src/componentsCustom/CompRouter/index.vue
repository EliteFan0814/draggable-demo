<template>
  <div class="comp-router">
    <!-- 固定布局 -->
    <div v-if="routerMode === 'fixed'" class="fixed-wrap">
      <div
        v-for="item in routerListData"
        :key="item.label"
        class="item-wrap"
        :style="`width:${singleNum}`"
      >
        <div class="item">
          <div
            v-if="showInfo.showImg"
            :class="{ 'img-wrap': true, 'simgle-img': showInfo.showImg }"
          >
            <img :src="item.iconUrl" alt />
          </div>
          <div v-if="showInfo.showText" class="text-wrap">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <!-- 单行滑动布局 -->
    <div v-if="routerMode === 'slideSingle'" class="slide-single-wrap">
      <div class="slide-single" ref="slideSingle" @scroll="getScrollPosition">
        <div
          v-for="item in routerListData"
          :key="item.label"
          class="item-wrap"
          :style="`width:${singleNum}`"
        >
          <div class="item">
            <div
              v-if="showInfo.showImg"
              :class="{ 'img-wrap': true, 'simgle-img': showInfo.showImg }"
            >
              <img :src="item.iconUrl" alt />
            </div>
            <div v-if="showInfo.showText" class="text-wrap">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="dot-wrap">
        <div class="dot" ref="dot">
          <div class="slider" ref="slider" :style="`left:${positionLeft}px;`"></div>
        </div>
      </div>
    </div>
    <!-- <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>-->
  </div>
</template>

<script>

export default {
  name: 'CompRouter',
  props: ['configData'],
  data() {
    return {
      routerListData: [
        { label: '生活用品', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '生活用用用用用品', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '生活用生活品', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '生活活用品', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '酒水香烟', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '烟', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '酒香烟', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '水香烟', iconUrl: require('@/assets/imgs/icon1.png') },
      ],
      positionLeft: 0
    }
  },
  computed: {
    noticeInfo() {
      return this.configData.notice.children
    },
    showInfo() {
      const flag = this.configData.notice.children.routerForm.value
      let showImg = false, showText = false
      if (flag === 'all') {
        showImg = true
        showText = true
      } else if (flag === 'img') {
        showImg = true
        showText = false
      } else if (flag === 'text') {
        showImg = false
        showText = true
      }
      return { showImg, showText }
    },
    routerMode() {
      return this.configData.notice.children.routerMode.value
    },
    singleNum() {
      return this.configData.notice.children.singleNum.value
    }
  },
  methods: {
    getScrollPosition() {
      const scrollWidth = this.$refs.slideSingle.scrollWidth
      const clientWidth = this.$refs.slideSingle.clientWidth
      // 已滑动长度
      const scrollLeft = this.$refs.slideSingle.scrollLeft
      // 可滑动总长度
      const scrollLength = scrollWidth - clientWidth
      const percent = (scrollLeft / scrollLength).toFixed(3)
      const dotWidth = this.$refs.dot.offsetWidth
      const sliderWidth = this.$refs.slider.offsetWidth
      // 滑块可滑动总长度
      const sliderScrollLength = dotWidth - sliderWidth
      // 滑块已滑动长度
      const sliderLength = (sliderScrollLength * percent).toFixed(3)
      this.positionLeft = sliderLength
    }
  },
}
</script>

<style lang="scss" scoped>
.comp-router {
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  background-color: #39a9ed;
}
.fixed-wrap {
  display: flex;
  flex-wrap: wrap;
}
.slide-single-wrap {
  .slide-single {
    overflow-x: scroll;
    display: flex;
    &::-webkit-scrollbar {
      display: none;
      height: 3px;
      background-color: rgb(226, 226, 226);
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
    }
  }
  .dot-wrap {
    .dot {
      margin: 0 auto;
      width: 30px;
      height: 2px;
      background-color: #ccc;
      border-radius: 20px;
      position: relative;
      .slider {
        position: absolute;
        left: 5px;
        width: 10px;
        height: 100%;
        border-radius: 20px;
        background-color: red;
      }
    }
  }
}
.item-wrap {
  width: 16.67%;
  flex-shrink: 0;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-wrap {
      width: 80%;
      display: flex;
      justify-content: center;
      img {
        display: block;
        width: 40px;
      }
    }
    .simgle-img {
      margin: 5px 0;
    }
    .text-wrap {
      width: 90%;
      padding: 8px 0 8px;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>