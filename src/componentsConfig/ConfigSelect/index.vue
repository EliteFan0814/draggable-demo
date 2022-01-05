<template>
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
</template>

<script>
export default {
  name: 'ConfigSelect',
  props: ['configInfo'],
  methods: {
    handleSelect(value) {
      this.configInfo.value = value
      console.log(this.$store.getters.compShowList)
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/common.scss';
.config-layout {
  .btn-list {
    display: flex;
    font-size: 14px;
    .btn {
      // margin-right: 2px;
      padding: 5px;
      border: 1px solid #dcdee0;
      width: 60px;
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