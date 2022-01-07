<template>
  <div class="comp-goods">
    <!-- 单行列表 -->
    <div class="goods-wrap">
      <div class="good-item">
        <img src="@/assets/imgs/good.jpg" class="good-img" />
        <div class="good-info">
          <div class="name-wrap">
            <span class="name omit-1">心相印聚氨酯心相印聚氨酯心相印聚氨酯</span>
            <span class="sub">商品小标题</span>
          </div>
          <div class="good-price">
            <span class="price">&yen;200</span>
            <span class="source">&yen;500</span>
          </div>
        </div>
        <div class="btn">
          <van-button type="primary" size="small" round>立即购买</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CompGoods',
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
.comp-goods {
  .goods-wrap {
    .good-item {
      padding: 5px;
      display: flex;
      .good-img {
        width: 100px;
      }
      .good-info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 5px;
        .name-wrap {
          span {
            display: block;
            text-align: left;
          }
          .name {
            width: 180px;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .sub {
            font-size: 12px;
          }
        }
        .good-price {
          color: rgb(255, 69, 68);
          font-size: 16px;
          .source {
            margin-left: 10px;
            font-size: 14px;
            color: #ccc;
            text-decoration: line-through;
          }
        }
      }
      .btn {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        width: 70px;
      }
    }
  }
}
</style>