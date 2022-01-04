<template>
  <div class="config-list-wrap">
    <!-- 右侧个性化组件 -->
    <aside class="configlist">
      <div class="aside-title">组件个性化设置</div>
      <template v-if="configData">
        <div v-for="(item,name) in configData" :key="name" class="config-class">
          <div class="division">
            <span>{{ item.label }}</span>
          </div>
          <div
            v-for="(configItem,configItemName) in item.children"
            :key="configItemName"
            class="input-class"
          >
            <div class="config-item">
              <component :is="configItem.component" :configInfo="configItem"></component>
            </div>
          </div>
        </div>
      </template>
    </aside>
  </div>
</template>
 <script>
export default {
  props: ['config'],
  data() {
    return {
      value: '',
      text: '',
      configData: null
    }
  },
  watch: {
    config(newValue) {
      console.log(newValue)
      this.configData = newValue ? newValue.configData : null
    }
  },
}
</script>
<style lang="scss" scoped>
.aside-title {
  padding: 5px 0 20px;
  font-weight: bold;
}
.config-list-wrap {
  width: 340px;
  height: 100%;
  .configlist {
    padding: 0 10px;
    box-sizing: border-box;
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
    .config-item {
      margin: 0 6px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>