<template>
  <div class="comp-serach">
    <van-search
      v-model="value"
      :placeholder="holderInfo.value"
      :input-align="alignment.value"
      :shape="shape.value"
      :background="background.value"
    ></van-search>
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
  },
  data() {
    return {
      value: '',
    }
  },
  computed: {
    holderInfo() {
      return this.configData.holder.children.holderInfo
    },
    alignment() {
      return this.configData.holder.children.alignment
    },
    shape() {
      return this.configData.holder.children.shape
    },
    background() {
      return this.configData.holder.children.background
    },
  },
}
</script>

<style lang="scss" scoped>
.comp-serach {
  position: relative;
}
</style>