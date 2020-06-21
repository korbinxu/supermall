<template>
  <div class="tab_bar_item" @click="item_click">
    <div v-if="!is_active">
      <slot name="item_icon"></slot>
    </div>
    <div v-else>
      <slot name="item_icon_active"></slot>
    </div>

    <div :style="active_style">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    active_color: {
      type: String,
      dafault: "red"
    }
  },
  computed: {
    is_active() {
      return this.$route.path.includes(this.link);
    },
    active_style() {
      return this.is_active ? { color: this.active_color } : {};
    }
  },
  methods: {
    item_click() {
      if (this.$route.path === this.link) {
        return;
      }
      this.$router.push(this.link);
    }
  }
};
</script>

<style>
.tab_bar_item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab_bar_item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
.active {
  color: rgb(rgb(49, 41, 41), green, blue);
}
</style>