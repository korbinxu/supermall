<template>
  <div class="tab_control">
    <div
      class="tab_control_item"
      v-for="(item,index) in titles"
      :key="index"
      :class="{active:index===current_index}"
      @click="item_click(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_index: 0
    };
  },
  methods: {
    item_click(index) {
      this.current_index = index;
      this.$emit("tab_click", index);
    }
  },
  props: {
    titles: {
      type: Array
    }
  }
};
</script>

<style scoped>
.tab_control {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  /* 不设置line-height文字不会居中 */
  line-height: 40px;
  /* 设置背景颜色 */
  background: #fff;
}
.tab_control_item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>