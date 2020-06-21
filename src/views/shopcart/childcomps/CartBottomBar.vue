<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button :value="chooseAllStatus" @click.native="chooseBtn"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{totalPrice}}</div>
    <div class="calculate">结账：{{checkLength}}</div>
  </div>
</template>
<script>
import CheckButton from "./CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((previous, item) => {
            return previous + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    chooseAllStatus() {
      // if (this.cartList.length === 0) return false;
      // return this.cartList.length === this.checkLength;
      return (
        this.cartList.length != 0 && this.cartList.length === this.checkLength
      );
    }
  },
  methods: {
    chooseBtn() {
      if (this.chooseAllStatus) {
        for (let item of this.cartList) {
          item.checked = false;
        }
      } else {
        for (let item of this.cartList) {
          item.checked = true;
        }
      }
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  background-color: rgb(230, 212, 212);
  position: absolute;
  height: 40px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.check-all {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50px;
  height: 100%;
  font-size: 12px;
}

.total-price {
  margin-left: 60px;
  flex: 1;
}

.calculate {
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: hotpink;
  font-weight: 600;
}
</style>