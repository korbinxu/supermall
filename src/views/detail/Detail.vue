<template>
  <div class="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @itemClick="itemClick"></detail-nav-bar>
    <better-scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :swiper-list="topImages" class="detail-set-scroll" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"></detail-images-info>
      <detail-param-info ref="param" :paramInfo="paramsInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="detailCommentInfo"></detail-comment-info>
      <goods-list ref="recomment" :goods_list="getRecommend"></goods-list>
    </better-scroll>
    <detail-botton-bar @addToCart="addToCart"></detail-botton-bar>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./chi_com/DetailNavBar";
import DetailSwiper from "./chi_com/DetailSwiper";
import DetailBaseInfo from "./chi_com/DetailBaseInfo";
import DetailShopInfo from "./chi_com/DetailShopInfo";
import DetailImagesInfo from "./chi_com/DetailImagesInfo";
import DetailParamInfo from "./chi_com/DetailParamInfo";
import DetailCommentInfo from "./chi_com/DetailCommentInfo";
import DetailBottonBar from "./chi_com/DetailBottonBar";

import BetterScroll from "components/common/scroll/BetterScroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/back_top/BackTop";

import {
  get_detail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend
} from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      detailCommentInfo: {},
      getRecommend: [],
      themeTopYs: [],
      isShow: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    DetailImagesInfo,
    DetailCommentInfo,
    DetailBottonBar,
    BetterScroll,
    GoodsList,
    BackTop
  },
  created() {
    // 保存商品id
    this.iid = this.$route.params.iid;
    //根据id请求数据
    get_detail(this.iid).then(res => {
      // console.log(res);
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      // 复杂数据请求利用构造函数new出来的实例保存
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 店铺信息
      this.shop = new Shop(data.shopInfo);
      // 商品的详细信息
      this.detailInfo = data.detailInfo;
      // 尺寸数据
      this.paramsInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule || {}
      );
      if (data.rate.cRate != 0) {
        this.detailCommentInfo = data.rate.list[0];
      }

      // $nextTick 根据最新数据 子组件的模板已经渲染完了 但是不包含图片在内
      // this.$nextTick(() => {});
    });
    // 推荐商品
    getRecommend().then(res => {
      this.getRecommend = res.data.data.list;
    });
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
      // this.themeTopYs = [];
      // 图片加载完成后 获取offsetTop值
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      // console.log(this.themeTopYs);
    },
    itemClick(index) {
      // 这里的y值为负的
      this.$refs.scroll.scroll_to(0, -this.themeTopYs[index], 500);
    },
    // 监听滚动的位置
    contentScroll(position) {
      const positionY = -position.y;
      // if (positionY < this.themeTopYs[1]) {
      //   this.$refs.nav.current_index = 0;
      // } else if (
      //   positionY >= this.themeTopYs[1] &&
      //   positionY < this.themeTopYs[2]
      // ) {
      //   this.$refs.nav.current_index = 1;
      // } else if (
      //   positionY >= this.themeTopYs[2] &&
      //   positionY < this.themeTopYs[3]
      // ) {
      //   this.$refs.nav.current_index = 2;
      // } else if (positionY >= this.themeTopYs[3]) {
      //   this.$refs.nav.current_index = 3;
      // }
      switch (true) {
        case positionY < this.themeTopYs[1]:
          this.$refs.nav.current_index = 0;
          break;
        case positionY >= this.themeTopYs[1] && positionY < this.themeTopYs[2]:
          this.$refs.nav.current_index = 1;
          break;
        case positionY >= this.themeTopYs[2] && positionY < this.themeTopYs[3]:
          this.$refs.nav.current_index = 2;
          break;
        case positionY >= this.themeTopYs[3]:
          this.$refs.nav.current_index = 3;
          break;
      }
      // 判断返回顶部按钮是否显示
      this.isShow = positionY > 1000;
    },
    backTop() {
      // 返回顶部
      this.$refs.scroll.scroll_to(0, 0, 200);
    },
    // 添加到购物车
    addToCart() {
      // 获取商品的信息
      const productInfo = {};
      productInfo.image = this.topImages[0];
      productInfo.title = this.goods.title;
      productInfo.desc = this.goods.desc;
      productInfo.price = this.goods.realPrice;
      productInfo.iid = this.iid;
      // console.log(productInfo);
      // 加入购物车 不建议直接添加  this.$store.cartList.push(productInfo);
      // 调用store的actios
      this.$store.dispatch("addCart", productInfo);
    }
  }
};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 子元素开启绝对定位 父元素一定要有高度 */
  height: 100vh;
  width: 100vw;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>