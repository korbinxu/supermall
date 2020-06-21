<template>
  <div class="cart-list">
    <better-scroll class="content" ref="scroll">
      <div>
        <cart-list-item :itemInfo="item" v-for="(item,index) in cartList" :key="index"></cart-list-item>
      </div>
    </better-scroll>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import BetterScroll from "components/common/scroll/BetterScroll";

import CartListItem from "./CartListItem";

export default {
  name: "cartList",
  data() {
    return {};
  },
  components: {
    CartListItem,
    BetterScroll
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
/* calc括号需要符号需要2个空格 */
/* .cart-list {
	position: relative;
	2号方案 父元素设置高度 百分比只和父元素映射 父元素多少px字元素多少px
  height: calc(100% - 44px - 49px);
} */

.content {
  /* 1号方案 用定位做 不必考虑父元素高度 只需要给自己一个固定高度就可以  */
  /* 1号方案 如果父元素开启了相对定位 第一要给父元素高度不然塌陷第二子元素设置top和bottom可以设置和父元素相同
	也可以根据情况自行设置 */
  /* position: absolute; */
  /* top: 0;
	bottom: 0; */
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow: hidden;
  /* 2号方案  子元素百分百表示和父元素高度一模一样*/
  /* height: 100%; */
}
</style>