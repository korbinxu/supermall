<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="image_load" alt />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "HomeSwiper",
  data() {
    return {
      is_load: false
    };
  },
  props: {
    banners: {
      type: Array
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    image_load() {
      if (!this.is_load) {
        this.$emit("swiper_image");
        this.is_load = true;
      }
    }
  }
};
</script>

<style>
</style>