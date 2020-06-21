<template>
  <div id="home" class="wrapper">
    <nav-bar class="home_nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control
      v-show="is_tab_fixed"
      class="tab_control"
      :titles="['流行','新款','精选']"
      @tab_click="tab_click"
      ref="tab_control_fixed"
    ></tab-control>
    <better-scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="content_scroll"
      @pullingUp="load_more"
    >
      <!-- 上面的pullingUp要和子组件发出的名字一致 -->
      <HomeSwiper :banners="banners" @swiper_image="swiper_image"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <tab-control :titles="['流行','新款','精选']" @tab_click="tab_click" ref="tab_control"></tab-control>
      <GoodsList :goods_list="show_goods"></GoodsList>
    </better-scroll>
    <!-- 监听组件要用属性native -->
    <back-top @click.native="back_click" v-show="is_show"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./home_components/HomeSwiper.vue";
import RecommendView from "./home_components/RecommendView.vue";
import FeatureView from "./home_components/FeatureView";

import NavBar from "components/common/navigationbar/NavBar.vue";
import TabControl from "components/content/tab_control/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BetterScroll from "components/common/scroll/BetterScroll";
import BackTop from "components/content/back_top/BackTop";

import { get_home_multidata, get_home_goods } from "network/home.js";
import { debounce } from "common/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      current_type: "pop",
      is_show: false,
      tab_off_set_top: 0,
      is_tab_fixed: false,
      save_y: 0,
      loadMore: true
    };
  },
  computed: {
    // 自动切换需要转换的商品
    show_goods() {
      return this.goods[this.current_type].list;
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    BetterScroll,
    BackTop
  },
  //请求多个数据 这里只调用 逻辑处理在methods
  created() {
    this.get_home_multidata();
    this.get_home_goods("pop");
    this.get_home_goods("new");
    this.get_home_goods("sell");
  },
  mounted() {
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("img_finish", () => {
      refresh();
    });
  },
  activated() {
    // 先刷新在回到原来位置
    this.$refs.scroll.refresh();
    this.$refs.scroll.scroll_to(0, this.save_y, 0);
  },
  deactivated() {
    this.save_y = this.$refs.scroll.scroll.y;
    this.$bus.$off("img_finish");
  },
  methods: {
    // 网络请求方法 具体逻辑放这里
    get_home_multidata() {
      get_home_multidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    get_home_goods(type) {
      const page = this.goods[type].page + 1;
      get_home_goods(type, page).then(res => {
        // 也可以用for循环和concat 最好用...rest语法
        this.goods[type].list.push(...res.data.data.list);

        // this.goods[type].list = this.goods[type].list.concat(
        //   res.data.data.list
        // );
        this.goods[type].page += 1;
        // 可以再次上拉加载更多
        this.$refs.scroll.finish_pull_up();
      });
    },
    back_click() {
      this.$refs.scroll.scroll_to(0, 0, 200);
    },
    // 监听BetterScroll子组件的滚动事件
    content_scroll(position) {
      // 确定返回按钮是否显示
      this.is_show = -position.y > 1000;
      this.is_tab_fixed = -position.y > this.tab_off_set_top;
    },
    // 监听子组件发来的上来加载更多数据 这里再次发送网路请求
    load_more() {
      this.get_home_goods(this.current_type);
    },
    // 子传父 监听tab_control点击了事件
    tab_click(index) {
      switch (index) {
        case 0:
          this.current_type = "pop";
          break;
        case 1:
          this.current_type = "new";
          break;
        case 2:
          this.current_type = "sell";
          break;
      }
      this.$refs.tab_control_fixed.current_index = index;
      this.$refs.tab_control.current_index = index;
    },
    swiper_image() {
      this.tab_off_set_top = this.$refs.tab_control.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home_nav {
  background: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab_control {
  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>