<template>
  <div class="plateform-desk">
    <div class="platform-desk-wrap">
      <div class="platform">
        <div class="preview">
          <el-tooltip :content="preview ? '关闭预览' : '打开预览'" placement="right" effect="light">
            <el-button
              type="primary"
              icon="el-icon-view"
              circle
              @click="handleShowPreview"
              size="mini"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="wxheader-wrap">
          <div class="wxheader">
            <span>{{ title }}</span>
          </div>
        </div>
        <div class="draggable-wrap inner-drag-wrap" @dragover="handleDragOver" @drop="handleDrop">
          <div class="draggalbe-desk inner-drag-wrap">
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
                @click="handleSelect(element.id, element)"
              >
                <!-- 拖拽 hover 样式 -->
                <div v-if="!preview" class="target-hover inner-drag-item" :data-index="index"></div>
                <!-- 拖拽 点击 样式 -->
                <div
                  v-if="!preview"
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
                    <div v-if="!preview" class="operate">
                      <i
                        v-if="clickedCompId === element.id"
                        class="el-icon-delete-solid"
                        @click.stop="handleDelete(index)"
                      ></i>
                      <span v-else>{{ element.name }}</span>
                    </div>
                    <component :is="element.compName" :configData="element.configData"></component>
                  </div>
                </template>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <div class="config-list-wrap">
      <ConfigListVue :config="selectedCompConfig"></ConfigListVue>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import ConfigListVue from "../components/ConfigList.vue"

export default {
  components: {
    draggable,
    ConfigListVue
  },
  data() {
    return {
      title: '这是header',
      clickedCompId: null,
      selectedCompConfig: null,
      preview: false
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
    ...mapMutations(['setDragStatus', 'setCurrentaddCompIndex', 'getUnSetComp', 'addToCompShowList', 'addToCompShowListIndex', 'deleteComp']),
    //
    handleShowPreview() {
      this.preview = !this.preview
    },
    // 在某元素上方拖动
    handleDragOver(e) {
      e.preventDefault()
      e.stopPropagation()
      // 获取在哪个元素上方拖动
      const targetDiv = e.target.className
      // 如果在包裹器内浮动
      // if (targetDiv === 'draggable-wrap') {
      if (targetDiv.includes('inner-drag-wrap')) {
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
    // 点击某组件进行详细设置
    handleSelect(compId, config) {
      this.clickedCompId = compId
      this.selectedCompConfig = config
    },
    // 删除元素
    handleDelete(index) {
      this.deleteComp(index)
      this.selectedCompConfig = null
    }
  },
}
</script>

<style lang="scss" scoped>
.plateform-desk {
  display: flex;
  height: 100%;
  .platform-desk-wrap {
    background: #f7f8f9;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    .platform {
      // border: 1px solid red;
      position: relative;
      height: 667px;
      background-color: #fff;
      .preview {
        position: absolute;
        top: 0px;
        right: 65px;
      }
      .wxheader-wrap {
        width: 500px;
        background-color: #f7f8f9;
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
      }
      .draggable-wrap {
        width: 500px;
        height: 603px;
        overflow-y: overlay;
        background-color: #f7f8f9;
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
          // border: 1px solid green;
          width: 375px;
          height: 603px;
          background-color: #fff;

          &::-webkit-scrollbar {
            width: 0px;
            background-color: transparent;
          }
          .draggable-item {
            box-sizing: border-box;
            position: relative;
            cursor: grab;
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
                font-size: 14px;
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
                > i {
                  font-size: 20px;
                  color: #969799;
                  &:hover {
                    cursor: pointer;
                    color: #747474;
                  }
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
  .config-list-wrap {
    width: 340px;
    height: 100%;
  }
}
</style>