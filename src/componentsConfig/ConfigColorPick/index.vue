<template>
  <div class="config-layout">
    <div class="label">
      <div class="label-name">{{ configInfo.label }}</div>：
    </div>
    <el-color-picker
      v-model="configInfo.value"
      show-alpha
      size="small"
      :disabled="configInfo.disabled"
    ></el-color-picker>
  </div>
</template>

<script>
export default {
  name: 'ConfigColorPick',
  props: ['configInfo'],
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