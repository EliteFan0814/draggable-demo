<template>
  <div class="config-layout">
    <div class="label">
      <div class="label-name">{{ configInfo.label }}</div>：
    </div>
    <van-field
      v-model="configInfo.value"
      :placeholder="configInfo.placeholder"
      :type="configInfo.inputType"
      :disabled="configInfo.disabled"
      input-align="right"
    />
  </div>
</template>

<script>
export default {
  name: 'ConfigInput',
  props: ['configInfo'],
  methods: {
    handleClear() {
      this.configInfo.value = ''
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.config-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  .van-field {
    padding: 0;
    width: 200px;
  }
}
</style>