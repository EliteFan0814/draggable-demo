<template>
  <div class="hello">
    <!-- 左侧组件列表 -->
    <aside>
      <ul>
        <li v-for="item in compList" :key="item.id" draggable @dragstart="handleDragStart" @dragend="handleDragEnd"
          :data-comp-type="item.name" :data-text="item.text">
          {{item.text}}
        </li>
      </ul>
    </aside>
    <!-- 中间组件预览排列 -->
    <main class="draggable-wrap" @dragover="handleDragOver" @drop="handleDrop">
      <draggable v-model="compShowList" draggable=".draggable-item" :sort="true" chosen-class="chosen"
        :forceFallback="true" animation="600">
        <div class="draggable-item" v-for="(element,index) in compShowList" :data-index="index" :key="index">
          <template v-if="element.isMoving">
            <div class="dragging-hover" :data-index="index">移动中</div>
          </template>
          <template v-else>
            <div class="item-content" :data-index="index"> {{element.text}}</div>
          </template>
        </div>
      </draggable>
    </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HelloWorld',
  components: {
    draggable
  },
  props: {
    msg: String
  },
  data() {
    return {
      compList: [
        { name: 'banner', text: '轮播图' },
        { name: 'goods', text: '商品' },
        { name: 'spread', text: '通告' }
      ],
      compShowList: [],
      // 是否正在拖动某元素
      isDragging: false,
      // 正在拖动的元素组件类型
      draggingCompType: null,
      draggingCompText: null,
      // 当前添加的元素在compShowList的角标
      currentaddCompIndex: 0
    }
  },
  // computed: {
  //   compShowList: {
  //     get() {
  //       return this.$store.state.compShowList
  //     },
  //     set(value) {
  //       this.$store.commit('updateList', value)
  //     }
  //   }
  // },
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
      // e.dataTransfer.setData('comp', e.target.dataset.compType)
    },
    // 拖动结束
    handleDragEnd() {
      this.compShowList[this.currentaddCompIndex].isMoving = false
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
        console.log(1)
        const addingComp = { name: this.draggingCompType, isMoving: true, text: this.draggingCompText }
        if (!this.isDragging) {
          console.log(2)
          this.currentaddCompIndex = this.compShowList.length
          this.isDragging = true
          this.compShowList.push(addingComp)
        }
        // 如果在包裹器内添加的元素上浮动 [draggable-item, dragging-hover, item-content]
        // } else if (targetDiv === 'draggable-item') {
      } else if (['draggable-item', 'dragging-hover', 'item-content'].includes(targetDiv)) {
        console.log(e.target.className)
        const addingComp = { name: this.draggingCompType, isMoving: true, text: this.draggingCompText }
        // 获取浮动在内部元素的位置信息 距离顶部距离、目标元素高度、目标元素排序
        let [y, overCompHeight, overCompIndex] = [e.offsetY, e.target.offsetHeight, +e.target.dataset.index]
        //  若为 true 放到目标元素上方，否则为下方
        let direction = y < overCompHeight / 2
        // 如果直接拖拽到某目标元素上方
        if (!this.isDragging) {
          if (direction) {
            this.compShowList.splice(overCompIndex, 0, addingComp)
          } else {
            overCompIndex +=1
            this.compShowList.splice(overCompIndex, 0, addingComp)
          }
        } else {
          // 是否已经将拖动的元素插入相应位置
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
          const tempCurrentaddCompList = this.compShowList.splice(this.currentaddCompIndex, 1)
          this.compShowList.splice(overCompIndex, 0, tempCurrentaddCompList[0])
        }
        this.currentaddCompIndex = overCompIndex
        this.isDragging = true
      }
    },
    // 触发在 draggable-wrap 上的放置事件
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragging = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  display: flex;
  height: 100vh;
  aside {
    border: 1px solid red;
    width: 180px;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        padding: 20px;
        border: 1px solid;
        margin: 0;
        list-style: none;
      }
    }
  }
  main {
    border: 1px solid green;
    width: 50%;
    .draggable-item {
      .item-content {
        padding: 50px 0;
        border: 1px solid rgba(166, 255, 0, 0.959);
      }
    }
    .dragging-hover,
    .chosen {
      border: solid 2px #3089dc !important;
    }
  }
}
</style>
