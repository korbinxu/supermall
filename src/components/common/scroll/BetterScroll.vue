<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean
    }
  },
  data() {
    return {
      scroll: null,
      loadMore: true
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 当为3的时候 滑动的惯性也会被监听到 2只会监听滑动
      probeType: this.probeType,
      // 监听上拉加载 注意 这个L是大写
      pullUpLoad: this.pullUpLoad
    });
    // 监听滚动对象
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }
    // 监听上拉加载
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 封装scrollTo方法 外面调用
    scroll_to(x, y, time) {
      // 先判断有没有值
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 封装finsh_pull_up方法 这个方法是可以继续调用pullingUp加载更多数据 外面调用
    finish_pull_up() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新计算可滑动高度
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
</style>