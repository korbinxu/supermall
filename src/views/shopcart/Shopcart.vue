<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navigationbar/NavBar";

import CartList from "./childcomps/CartList";
import CartBottomBar from "./childcomps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  computed: {
    ...mapGetters(["cartLength"])
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
};
</script>

<style scoped>
.shop-cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>