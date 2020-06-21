<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <img :src="item" alt />
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "DetailSwiper",
  props: ["swiperList"],
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>
<style scoped>
.detail-swiper {
  height: 250px;
  overflow: hidden;
}
</style>