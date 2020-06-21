<template>
  <div class="recommend">
    <div class="recommend_item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array
    }
  }
};
</script>

<style>
.recommend {
  display: flex;
  width: 100vw;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 15px;
  border-bottom: 10px solid #eee;
}
.recommend_item {
  flex: 1;
}
.recommend_item img {
  width: 90%;
  height: 70px;
  margin-bottom: 10px;
}
</style>