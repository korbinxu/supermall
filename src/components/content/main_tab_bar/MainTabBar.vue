<template>
  <div>
    <tab-bar>
      <tab-bar-item link="/home" active_color="pink">
        <img slot="item_icon" src="~assets/img/tab_bar/home.svg" alt />
        <img slot="item_icon_active" src="~assets/img/tab_bar/home_active.svg" alt />
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/catagory" active_color="pink">
        <img slot="item_icon" src="~assets/img/tab_bar/category.svg" alt />
        <img slot="item_icon_active" src="~assets/img/tab_bar/category_active.svg" alt />
        <div slot="text">分类</div>
      </tab-bar-item>
      <tab-bar-item link="/shopcart" active_color="pink">
        <img slot="item_icon" src="~assets/img/tab_bar/shopcart.svg" alt />
        <img slot="item_icon_active" src="~assets/img/tab_bar/shopcart_active.svg" alt />
        <div slot="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link="/profile" active_color="pink">
        <img slot="item_icon" src="~assets/img/tab_bar/profile.svg" alt />
        <img slot="item_icon_active" src="~assets/img/tab_bar/profile_active.svg" alt />
        <div slot="text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tab_bar/TabBar";
import TabBarItem from "components/common/tab_bar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>