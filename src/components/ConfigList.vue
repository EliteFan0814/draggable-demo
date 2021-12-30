<template>
  <div class="config-list-wrap">
    <!-- 右侧个性化组件 -->
    <aside class="configlist">
      <div class="aside-title">组件个性化设置</div>
      <div class="config-class">
        <div class="division">
          <span>搜索框内容</span>
        </div>
        <div class="input-class">
          <van-cell-group>
            <van-field v-model="value" label="提示文本：" placeholder="请输入提示文本" />
            <van-field v-model="text" label="文本" />
          </van-cell-group>
        </div>
      </div>
      <div class="config-class">
        <div class="division">
          <span>搜索框内容</span>
        </div>
        <div class="input-class">
          <van-cell-group>
            <van-field v-model="value" label="提示文本：" placeholder="请输入提示文本" />
            <van-field v-model="text" label="文本" />
          </van-cell-group>
        </div>
      </div>
    </aside>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      value: '',
      text: '',
    }
  }
}
</script>
<style lang="scss" scoped>
.aside-title {
  padding: 5px 0 20px;
  font-weight: bold;
}
.config-list-wrap {
  width: 340px;
  height: 100%;
  .configlist {
    padding: 0 10px;
    box-sizing: border-box;
    .division {
      padding: 10px 12px;
      background: #e8f0fb40;
      font-size: 14px;
      color: #323233;
      text-align: left;
      span {
        box-sizing: border-box;
        &::before {
          content: ".";
          width: 3px;
          height: 10px;
          margin-right: 8px;
          background: #155bd4;
        }
      }
    }
  }
}
</style>