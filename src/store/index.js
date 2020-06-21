import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 安装插件
Vue.use(Vuex)
// 抽取仓库
const state = {
	cartList: []
}

// 创建store
const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
// 导出到主要文件注册
export default store 