<template>
  <div class="comp-goods">
    <!-- 单行列表 -->
    <div class="goods-wrap">
      <div v-for="item in goodsList" :key="item.id" class="good-item">
        <img :src="item.src" class="good-img" />
        <div class="good-info">
          <div class="name-wrap">
            <span class="name omit-1">{{ item.name }}</span>
            <span class="sub omit-1">{{ item.subName }}</span>
          </div>
          <div class="good-price">
            <span class="price">&yen;{{ item.price }}</span>
            <span class="source">&yen;{{ item.source }}</span>
          </div>
        </div>
        <div class="btn">
          <van-button type="primary" size="mini" round>立即购买</van-button>
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
      goodsList: [
        { src: require('@/assets/imgs/good.jpg'), name: '心相心相印抽纸心相印抽纸印抽纸', subName: '心相印抽纸3折促销', price: '29.00', source: '59.99', id: '1' },
        { src: require('@/assets/imgs/good.jpg'), name: '心相印抽纸', subName: '心相印抽纸3折促销', price: '29.00', source: '59.99', id: '2' },
        { src: require('@/assets/imgs/good.jpg'), name: '心相印抽纸', subName: '心相印抽纸3折促销', price: '29.00', source: '59.99', id: '3' },
        { src: require('@/assets/imgs/good.jpg'), name: '心相印抽纸', subName: '心相印心相印抽纸心相印抽纸心相印抽纸抽纸3折促销', price: '29.00', source: '59.99', id: '4' },
        { src: require('@/assets/imgs/good.jpg'), name: '心相印抽纸', subName: '心相印抽纸3折促销', price: '29.00', source: '59.99', id: '5' },
        { src: require('@/assets/imgs/good.jpg'), name: '心相印抽纸', subName: '心相印抽纸3折促销', price: '29.00', source: '59.99', id: '6' },
        { src: require('@/assets/imgs/good.jpg'), name: '心相印抽纸', subName: '心相印抽纸3折促销', price: '29.00', source: '59.99', id: '7' },
      ]
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
            width: 180px;
          }
          .name {
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