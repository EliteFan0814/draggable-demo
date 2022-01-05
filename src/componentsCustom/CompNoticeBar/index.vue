<template>
  <div class="comp-notice">
    <van-notice-bar
      left-icon="volume-o"
      :color="noticeInfo.textColor.value"
      :background="noticeInfo.backgroundColor.value"
      :scrollable="noticeInfo.scrollable.value"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />
  </div>
</template>

<script>

export default {
  name: 'CompNoticeBar',
  props: ['configData'],
  computed: {
    noticeInfo() {
      return this.configData.notice.children
    },
  },
}
</script>

<style lang="scss" scoped>
.comp-notice {
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>