<template>
  <div class="config-layout-wrap">
    <div class="config-layout">
      <div class="label">
        <div class="label-name">{{ configInfo.label }}</div>：
      </div>
      <div class="btn-list">
        <div
          v-for="(item) in configInfo.selectList"
          :key="item.label"
          :class="{ btn: true, clicked: configInfo.value === item.value }"
          @click="handleSelect(item.value)"
        >{{ item.label }}</div>
      </div>
    </div>
    <!-- 如果有联动配置 -->
    <template v-if="configInfo.haveChildren">
      <div
        class="config-item"
        v-for="(configItem,configItemName) in configInfo.children"
        :key="configItemName"
      >
        <component
          v-if="!configItem.disabled"
          :is="configItem.component"
          :configInfo="configItem"
          :configInfoParent="configItemName"
        ></component>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ConfigSelect',
  props: ['configInfo'],
  methods: {
    handleSelect(value) {
      this.configInfo.value = value
      // 所关联的子元素的key值
      const linkageKey = this.configInfo.linkageKey || false
      if (linkageKey) {
        // 获取关联的子对象信息
        const linkChildObj = this.configInfo.children[linkageKey]
        // 根据子元素的显示值判断是否显示此子元素配置项
        if (linkChildObj.showValueList.includes(this.configInfo.value)) {
          linkChildObj.disabled = false
        } else {
          linkChildObj.disabled = true
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.config-layout {
  .btn-list {
    display: flex;
    font-size: 14px;
    .btn {
      // margin-right: 2px;
      padding: 5px;
      border: 1px solid #dcdee0;
      min-width: 40px;
      max-width: 60px;
      &:hover {
        cursor: pointer;
      }
    }
    .clicked {
      color: #155bd4;
      border: 1px solid #155bd4;
      background-color: #e0edff;
    }
  }
}
</style>