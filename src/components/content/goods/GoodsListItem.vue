<template>
  <div class="goods-item" @click="to_detail">
    <img :src="showImg" @load="img_load" alt />
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    showImg() {
      //image应该在前面
      return this.item.image || this.item.show.img;
    }
  },
  methods: {
    img_load() {
      this.$bus.$emit("img_finish");
    },
    to_detail() {
      // 跳转到商品详细 并把商品id传过去
      this.$router.push("/detail/" + this.item.iid);
    }
  }
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>