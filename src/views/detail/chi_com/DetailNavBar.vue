<template>
  <div>
    <nav-bar class="detail-nav-bar">
      <div slot="left" class="back" @click="back_click">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="titles">
        <div
          @click="btn_click(index)"
          class="title_item"
          :class="{active:current_index===index}"
          v-for="(item,index) in titles"
          :key="index"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navigationbar/NavBar";
export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      current_index: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    btn_click(index) {
      this.current_index = index;
      this.$emit("itemClick", index);
    },
    back_click() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.titles {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title_item {
  flex: 1;
  font-size: 14px;
}

.active {
  color: #ff5777;
  /* color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint); */
}

.back {
  text-align: center;
}
.back img {
  /* margin-top: 11px; */
  vertical-align: middle;
}
</style>