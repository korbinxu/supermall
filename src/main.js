import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import store from "store/index.js"

Vue.config.productionTip = false
//添加事件总线对象 给$bus赋值一个vue实例 不然 是undefined
Vue.prototype.$bus = new Vue()

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
