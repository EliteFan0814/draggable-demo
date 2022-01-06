<template>
  <div>
    <div class="config-layout">
      <div class="label">
        <div class="label-name">{{ configInfo.label }}</div>：
      </div>
      <van-switch v-model="configInfo.value" size="20px" @change="handleChange" />
    </div>
    <!-- <template v-if="configInfo.haveChildren">
      <div
        class="config-item"
        v-for="(configItem,configItemName) in configInfo.children"
        :key="configItemName"
      >
        <component :is="configItem.component" :configInfo="configItem"></component>
      </div>
    </template>-->
  </div>
</template>

<script>
export default {
  name: 'ConfigSwitch',
  props: ['configInfo', 'configInfoParent'],
  methods: {
    handleChange(value) {
      // 打开状态且有联动属性
      if (value && this.configInfo.linkageKey) {
        this.configInfoParent.children[this.configInfo.linkageKey].disabled = false
      } else {
        if (this.configInfo.linkageKey) {
          this.configInfoParent.children[this.configInfo.linkageKey].disabled = true
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.config-layout {
  .van-field {
    padding: 0;
    width: 200px;
  }
}
</style>