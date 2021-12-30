<template>
  <!-- 左侧组件列表 -->
  <aside class="complist">
    <div class="aside-title">组件列表</div>
    <ul>
      <li
        v-for="item in compList"
        :key="item.id"
        draggable
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :data-comp-type="item.name"
        :data-text="item.text"
      >
        <div>
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      compList: [
        { name: 'van-search', text: '搜索', icon: 'el-icon-search' },
        { name: 'banner', text: '轮播图', icon: 'el-icon-picture' },
        { name: 'spread', text: '通告', icon: 'el-icon-message-solid' },
        { name: 'goods', text: '商品', icon: 'el-icon-s-goods' }
      ],
    }
  },
  computed: {
    ...mapGetters(['isDragging', 'draggingCompType'])
  },
  methods: {
    ...mapMutations(['changeCompType','handleDragEnd']),
    // 拖动开始
    handleDragStart(e) {
      this.changeCompType(e.target.dataset.compType)
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-title {
  padding: 5px 0 20px;
  font-weight: bold;
}
.complist {
  box-sizing: border-box;
  width: 340px;
  height: 100%;
  color: #323233;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        width: 80px;
        height: 80px;
        // border: 1px solid red;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 6px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background: #efefef;
        }
        i {
          font-size: 35px;
        }
        span {
          display: inline-block;
          padding-top: 8px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>