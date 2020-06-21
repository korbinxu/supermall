<template>
  <div class="goods">
    <GoodsListItem v-for="(item,index) in goods_list" :item="item" :key="index"></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  components: {
    GoodsListItem
  },
  props: {
    goods_list: {
      type: Array
    }
  }
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>