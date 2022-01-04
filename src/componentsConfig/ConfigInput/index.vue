<template>
  <div class="config-layout">
    <div>{{ configInfo.label }}</div>
    <van-field v-model="configInfo.value" :placeholder="configInfo.placeholder" clearable />
  </div>
</template>

<script>
export default {
  name: 'ConfigInput',
  props: ['configInfo'],
}
</script>

<style lang="scss" scoped>
.config-layout {
  display: flex;
  align-items: center;
  padding: 10px 0;
  div {
    padding-right: 15px;
    font-size: 14px;
    color: #646566;
  }
  .van-field {
    padding: 0;
    width: 200px;
  }
}
</style>