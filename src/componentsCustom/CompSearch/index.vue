<template>
  <div class="comp-serach">
    <van-search></van-search>
  </div>
</template>

<script>
export default {
  name: 'CompSearch',
  props: {
    configData: {
      type: Object,
      required: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-serach {
  position: relative;
}
</style>