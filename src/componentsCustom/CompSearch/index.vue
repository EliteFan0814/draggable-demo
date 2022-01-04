<template>
  <div class="comp-serach">
    <van-search
      v-model="value"
      :placeholder="configData.holder.children.holderInfo.value"
      :input-align="configData.holder.children.alignment.value"
    ></van-search>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

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
      value: ''
    }
  },
  computed: {
    ...mapGetters(['compShowList'])
  }
}
</script>

<style lang="scss" scoped>
.comp-serach {
  position: relative;
}
</style>