<template>
  <div class="operation-wrap">
    <div class="comp-list-wrap">
      <CompListVue></CompListVue>
    </div>
    <div class="platform-wrap">
      <PlatformDeskVue></PlatformDeskVue>
    </div>
    <div class="config-list-wrap">
      <ConfigListVue></ConfigListVue>
    </div>
  </div>
</template>

<script>
import CompListVue from "../components/CompList.vue"
import PlatformDeskVue from "../components/PlatformDesk.vue"
import ConfigListVue from "../components/ConfigList.vue"
export default {
  components: {
    CompListVue,
    PlatformDeskVue,
    ConfigListVue
  }
}
</script>

<style lang="scss" scoped>
.operation-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 10px;
  .comp-list-wrap {
    width: 340px;
    height: 100%;
  }
  .platform-wrap {
    flex-grow: 1;
    height: 100%;
  }
  .config-list-wrap {
    width: 340px;
    height: 100%;
  }
}
</style>