<template>
  <div class="platform-desk-wrap">
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
          <div class="draggalbe-desk">
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
                <div class="comp-operation">
                  <div class="operate">删dddd除</div>
                  <!-- <div style="width: 375px;height:200px;border:1px solid red"></div> -->
                  <component :is="element.compName"></component>
                </div>
              </template>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import CompSearchVue from '../componentsCustom/CompSearch/index.vue'

export default {
  components: {
    draggable,
    CompSearchVue
  },
  data() {
    return {
      title: '这是header',
      clickedCompId: null,
    }
  },
  computed: {
    compShowList: {
      get() {
        return this.$store.getters.compShowList
      },
      set(value) {
        this.$store.commit('updateCompShowList', value)
      }
    },
    ...mapGetters(['isDragging', 'draggingCompType', 'draggingComp', 'currentaddCompIndex', 'tempCurrentaddCompList'])
  },
  methods: {
    ...mapMutations(['setDragStatus', 'setCurrentaddCompIndex', 'getUnSetComp', 'addToCompShowList', 'addToCompShowListIndex']),
    // 在某元素上方拖动
    handleDragOver(e) {
      e.preventDefault()
      e.stopPropagation()
      // 获取在哪个元素上方拖动
      const targetDiv = e.target.className
      // 如果在包裹器内浮动
      if (targetDiv === 'draggable-wrap') {
        if (!this.isDragging) {
          this.setCurrentaddCompIndex(this.compShowList.length)
          this.setDragStatus(true)
          this.addToCompShowList(this.draggingComp)
        }
        // 如果在包裹器内添加的元素上浮动  inner-drag-item
      } else if (targetDiv.includes(' inner-drag-item')) {
        // 获取浮动在内部元素的位置信息 距离顶部距离、目标元素高度、目标元素排序
        let [y, overCompHeight, overCompIndex] = [e.offsetY, e.target.offsetHeight, +e.target.dataset.index]
        //  若为 true 放到目标元素上方，否则为下方
        let direction = y < overCompHeight / 2
        // 如果直接拖拽到某目标元素上方
        // 首次拖拽到某目标元素上方，则判断插入元素
        if (!this.isDragging) {
          if (direction) {
            this.addToCompShowListIndex({ overCompIndex, index: 0, addingComp: this.draggingComp })
          } else {
            overCompIndex += 1
            this.addToCompShowListIndex({ overCompIndex, index: 0, addingComp: this.draggingComp })
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
          this.getUnSetComp()
          // 2 将元素放置到指定位置
          this.addToCompShowListIndex({ overCompIndex, index: 0, addingComp: this.tempCurrentaddCompList[0] })
        }
        this.setCurrentaddCompIndex(overCompIndex)
        this.setDragStatus(true)
      } else {
        //
      }
    },
    // 触发在 draggable-wrap 上的放置事件
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.setDragStatus(false)
    },
    handleClick(compId) {
      this.clickedCompId = compId
    }
  },
}
</script>

<style lang="scss" scoped>
.platform-desk-wrap {
  background: #f7f8f9;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  .platform {
    height: 667px;
    background-color: #fff;
    .wxheader {
      width: 375px;
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
      // overflow-y: overlay;
      &::-webkit-scrollbar {
        width: 0px;
        background-color: transparent;
      }
      &:hover {
        // overflow-y: overlay;
        &::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #ccc;
        }
      }
      .draggalbe-desk {
        border: 1px solid red;
        width: 575px;
        overflow-y: overlay;
        background-color: #f7f8f9;

        &::-webkit-scrollbar {
          width: 0px;
          background-color: transparent;
        }
        .draggable-item {
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
          .comp-operation {
            position: relative;
            .operate {
              position: absolute;
              right: -86px;
              top: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 80px;
              height: 24px;
              font-size: 12px;
              color: #333;
              background: #ffffff;
              box-shadow: 0 0.05333333rem 0.10666667rem rgb(0 0 0 / 10%);
              &::after {
                content: "";
                position: absolute;
                right: 100%; /*no*/
                top: 7px; /*no*/
                width: 0; /*no*/
                height: 0; /*no*/
                border-width: 5px; /*no*/
                border-style: solid;
                border-color: transparent;
                margin-bottom: -1px; /*no*/
                border-right-width: 5px; /*no*/
                border-right-color: currentColor;
                color: #fff;
              }
            }
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
}
</style>