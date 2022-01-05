<template>
  <div class="comp-swiper">
    <van-swipe
      class="my-swipe"
      :autoplay="autoplay"
      :loop="swiperInfo.loop.value"
      :show-indicators="swiperInfo.indicators.value"
      :indicator-color="swiperInfo.indicatorColor.value"
    >
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  name: 'CompSwiper',
  props: ['configData'],
  computed: {
    autoplay() {
      let { disabled } = this.configData.swiper.children.autoplayTime
      if (disabled) {
        return 0
      } else {
        return this.configData.swiper.children.autoplayTime.value
      }
    },
    swiperInfo() {
      return this.configData.swiper.children
    },
  },
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>