<template>
  <div class="operation-wrap">
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
    <!-- 中间组件预览排列 -->
    <main class="platform-wrap">
      <div class="platform">
        <div class="wxheader">
          <span>{{ title }}</span>
        </div>
        <div class="draggable-wrap" @dragover="handleDragOver" @drop="handleDrop">
          <draggable
            v-model="compShowList"
            draggable=".draggable-item"
            :sort="true"
            :forceFallback="true"
            animation="600"
          >
            <div
              class="draggable-item inner-drag-item"
              v-for="(element,index) in compShowList"
              :data-index="index"
              :key="index"
              @click="handleClick(element.id)"
            >
              <!-- 拖拽 hover 样式 -->
              <div class="target-hover inner-drag-item" :data-index="index"></div>
              <!-- 拖拽 点击 样式 -->
              <div
                :class="{ 'target-active': clickedCompId === element.id, 'inner-drag-item': true }"
                :data-index="index"
              ></div>
              <template v-if="element.isMoving">
                <div class="dragging-hover" :data-index="index">
                  <span>组件放置区域</span>
                </div>
              </template>
              <template v-else>
                <component :is="element.name"></component>
              </template>
            </div>
          </draggable>
        </div>
      </div>
    </main>
    <!-- 右侧个性化组件 -->
    <aside class="configlist">
      <div class="aside-title">组件个性化设置</div>
      <div class="config-class">
        <div class="division">
          <span>搜索框内容</span>
        </div>
        <div class="input-class">
          <van-cell-group>
            <van-field v-model="value" label="提示文本：" placeholder="请输入提示文本" />
            <van-field v-model="text" label="文本" />
          </van-cell-group>
        </div>
      </div>
      <div class="config-class">
        <div class="division">
          <span>搜索框内容</span>
        </div>
        <div class="input-class">
          <van-cell-group>
            <van-field v-model="value" label="提示文本：" placeholder="请输入提示文本" />
            <van-field v-model="text" label="文本" />
          </van-cell-group>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Establish',
  components: {
    draggable
  },
  props: {
    msg: String
  },
  data() {
    return {
      compList: [
        { name: 'van-search', text: '搜索', icon: 'el-icon-search' },
        { name: 'banner', text: '轮播图', icon: 'el-icon-picture' },
        { name: 'spread', text: '通告', icon: 'el-icon-message-solid' },
        { name: 'goods', text: '商品', icon: 'el-icon-s-goods' }
      ],
      compShowList: [{ name: 'van-search', text: '轮播图' }],
      title: '这是header',
      clickedCompId: null,
      // 是否正在拖动某元素
      isDragging: false,
      // 正在拖动的元素组件类型
      draggingCompType: null,
      draggingCompText: null,
      // 当前添加的元素在compShowList的角标
      currentaddCompIndex: 0,
      value:'',
      text:'',
    }
  },
  computed: {
    // compShowList: {
    //   get() {
    //     return this.$store.state.compShowList
    //   },
    //   set(value) {
    //     this.$store.commit('updateList', value)
    //   }
    // }
  },
  watch: {
    myArray(newvalue, oldvalue) {
      // console.log(newvalue)
    },
    compShowList() {
      // console.log(this.$store.getters.compShowList)
    }
  },
  methods: {
    // 拖动开始
    handleDragStart(e) {
      this.draggingCompType = e.target.dataset.compType
      this.draggingCompText = e.target.dataset.text
    },
    // 拖动结束
    handleDragEnd() {
      this.compShowList[this.currentaddCompIndex].isMoving = false
      this.compShowList[this.currentaddCompIndex].id = this.$createRandomId()
      this.isDragging = false
      this.draggingCompType = null
    },
    // 在某元素上方拖动
    handleDragOver(e) {
      e.preventDefault()
      e.stopPropagation()
      // 获取在哪个元素上方拖动
      const targetDiv = e.target.className
      // 如果在包裹器内浮动
      if (targetDiv === 'draggable-wrap') {
        const addingComp = { name: this.draggingCompType, isMoving: true, text: this.draggingCompText }
        if (!this.isDragging) {
          this.currentaddCompIndex = this.compShowList.length
          this.isDragging = true
          this.compShowList.push(addingComp)
        }
        // 如果在包裹器内添加的元素上浮动  inner-drag-item
      } else if (targetDiv.includes(' inner-drag-item')) {
        const addingComp = { name: this.draggingCompType, isMoving: true, text: this.draggingCompText }
        // 获取浮动在内部元素的位置信息 距离顶部距离、目标元素高度、目标元素排序
        let [y, overCompHeight, overCompIndex] = [e.offsetY, e.target.offsetHeight, +e.target.dataset.index]
        //  若为 true 放到目标元素上方，否则为下方
        let direction = y < overCompHeight / 2
        // 如果直接拖拽到某目标元素上方
        // 首次拖拽到某目标元素上方，则判断插入元素
        if (!this.isDragging) {
          if (direction) {
            this.compShowList.splice(overCompIndex, 0, addingComp)
          } else {
            overCompIndex += 1
            this.compShowList.splice(overCompIndex, 0, addingComp)
          }
          // 在所有目标元素上方来回拖动，
        } else {
          // 判断是否已经将拖动的元素插入相应位置
          let insertFlag = false,
            preCompIndex = null,
            nextCompIndex = null
          if (direction) {
            preCompIndex = overCompIndex === 0 ? 0 : overCompIndex - 1
            insertFlag = this.compShowList[preCompIndex].isMoving
          } else {
            nextCompIndex = overCompIndex + 1
            insertFlag = this.compShowList.length > nextCompIndex && this.compShowList[nextCompIndex].isMoving
          }
          // 若为 true 则已经插入元素到draggalbe列表
          if (insertFlag) return
          // 否则，执行插入
          // 1 取出未放置完成的元素
          const tempCurrentaddCompList = this.compShowList.splice(this.currentaddCompIndex, 1)
          // 2 将元素放置到指定位置
          this.compShowList.splice(overCompIndex, 0, tempCurrentaddCompList[0])
        }
        this.currentaddCompIndex = overCompIndex
        this.isDragging = true
      } else {
        //
      }
    },
    // 触发在 draggable-wrap 上的放置事件
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragging = false
    },
    handleClick(compId) {
      this.clickedCompId = compId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aside-title {
  padding: 5px 0 20px;
  font-weight: bold;
}
.operation-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 10px;
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
  .platform-wrap {
    background: #f7f8f9;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .platform {
      width: 375px;
      height: 667px;
      background-color: #fff;
      .wxheader {
        height: 64px;
        background-image: url(../assets/imgs/wxheader.png);
        background-repeat: no-repeat;
        background-size: 375px auto;
        position: relative;
        span {
          position: absolute;
          top: 34px;
          font-size: 14px;
          font-weight: bold;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .draggable-wrap {
        height: 603px;
        overflow-y: overlay;
        &::-webkit-scrollbar {
          width: 0px;
          background-color: transparent;
        }
        &:hover {
          overflow-y: overlay;
          &::-webkit-scrollbar {
            width: 5px;
            background-color: transparent;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #ccc;
          }
        }
        .draggable-item {
          // margin: 1px;
          box-sizing: border-box;
          position: relative;
          .target-hover {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 100;
            border: none;
            &:hover {
              border: 1px dotted #155bd4;
            }
          }
          .target-active {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 100;
            border: 1px solid #155bd4;
          }
          .item-content {
            // padding: 50px 0;
          }
        }
        .dragging-hover {
          height: 40px;
          background-image: url("../assets/imgs/draggingbg.jpg");
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            height: 20px;
            display: inline-block;
            font-size: 16px;
            line-height: 20px;
            padding: 5px 10px;
            background-color: #fff;
          }
        }
      }
    }
  }
  .configlist {
    padding: 10px;
    box-sizing: border-box;
    width: 340px;
    height: 100%;
    .division {
      padding: 10px 12px;
      background: #e8f0fb40;
      font-size: 14px;
      color: #323233;
      text-align: left;
      span {
        box-sizing: border-box;
        &::before {
          content: ".";
          width: 3px;
          height: 10px;
          margin-right: 8px;
          background: #155bd4;
        }
      }
    }
  }
}
</style>