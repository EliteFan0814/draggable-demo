<template>
  <div class="comp-router">
    <!-- 固定布局 -->
    <div v-if="configInfo.routerMode === 'fixed'" class="fixed-wrap">
      <div
        v-for="item in configInfo.multiRouterList"
        :key="item.label"
        class="item-wrap"
        :style="`width:${configInfo.singleNum}%`"
      >
        <div class="item">
          <div
            v-if="configInfo.showInfo.showImg"
            :class="{ 'img-wrap': true, 'simgle-img': configInfo.showInfo.showImg }"
          >
            <img :src="item.iconUrl" alt />
          </div>
          <div v-if="configInfo.showInfo.showText" class="text-wrap">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <!-- 滑动布局 -->
    <div class="slide-single-wrap">
      <!-- 单行滑动 -->
      <div
        v-if="configInfo.routerMode === 'slideSingle'"
        class="slide-single"
        ref="slideSingle"
        @scroll="getScrollPosition"
      >
        <div
          v-for="item in  configInfo.multiRouterList"
          :key="item.label"
          class="item-wrap"
          :style="`width:${configInfo.singleNum}%`"
        >
          <div class="item">
            <div
              v-if="configInfo.showInfo.showImg"
              :class="{ 'img-wrap': true, 'simgle-img': configInfo.showInfo.showImg }"
            >
              <img :src="item.iconUrl" alt />
            </div>
            <div v-if="configInfo.showInfo.showText" class="text-wrap">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <!-- 多行滑动 -->
      <div
        v-if="configInfo.routerMode === 'slideMultify'"
        class="slide-single"
        ref="slideSingle"
        @scroll="getScrollPosition"
      >
        <div
          v-for="(page,index) in  configInfo.multiRouterList"
          :key="index"
          class="single-page-wrap"
        >
          <div
            v-for="item in page"
            :key="item.label"
            class="item-wrap"
            :style="`width:${configInfo.singleNum}%`"
          >
            <div class="item">
              <div
                v-if="configInfo.showInfo.showImg"
                :class="{ 'img-wrap': true, 'simgle-img': configInfo.showInfo.showImg }"
              >
                <img :src="item.iconUrl" alt />
              </div>
              <div v-if="configInfo.showInfo.showText" class="text-wrap">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 指示器 -->
      <div v-if="configInfo.showDot" class="dot-wrap">
        <div class="dot" ref="dot">
          <div class="slider" ref="slider" :style="`left:${positionLeft}px;`"></div>
        </div>
      </div>
    </div>
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
        { label: '分', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '分分分', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '饿饿饿', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '日日日', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '哇哇哇哇', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '钱钱钱', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '也一样', iconUrl: require('@/assets/imgs/icon1.png') },
        { label: '个人发', iconUrl: require('@/assets/imgs/icon1.png') },
      ],
      positionLeft: 0
    }
  },
  computed: {
    configInfo() {
      const allSettingInfo = this.configData.settings.children
      // 展示样式信息
      const flag = allSettingInfo.routerForm.value
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
      // 每行个数
      const singleNum = allSettingInfo.singleNum.value
      // 每页行数
      const pageRowNum = allSettingInfo.routerMode.children.pageRowNum.value
      // 模式 固定，单行滑动，多行滑动
      const routerMode = allSettingInfo.routerMode.value
      // 多行滑动时生成分页数据
      // 每页多少个
      const pageNum = (100 / singleNum).toFixed() * pageRowNum
      let multiRouterList, showDot
      if (routerMode === 'slideMultify') {
        multiRouterList = this.$sliceArray(this.routerListData, pageNum)
      } else {
        multiRouterList = this.routerListData
      }
      if (multiRouterList.length > 1) {
        showDot = true
      } else {
        showDot = false
      }
      return {
        noticeInfo: allSettingInfo,// 所有信息
        showInfo: { showImg, showText },// 展示样式信息
        routerMode, // 模式
        singleNum,// 每行个数
        multiRouterList,// 处理过后的路由数据
        showDot// 是否显示导航点
      }
    },
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
// 固定模式
.fixed-wrap {
  display: flex;
  flex-wrap: wrap;
}
// 单行滑动
.slide-single-wrap {
  .slide-single {
    // border: 1px solid blue;
    overflow-x: scroll;
    display: flex;
    &::-webkit-scrollbar {
      display: none;
    }
    .single-page-wrap {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .dot-wrap {
    padding-bottom: 5px;
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
// 内部单个元素样式
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