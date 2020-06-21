import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Home = () => import("../views/home/Home.vue")
const Catagory = () => import("../views/catagory/Catagory.vue")
const Shopcart = () => import("../views/shopcart/Shopcart.vue")
const Profile = () => import("../views/profile/Profile.vue")
const Detail = () => import("views/detail/Detail.vue")

const routes = [
	{
		path: "",
		redirect: "/home"
	},
	{
		path: "/home",
		component: Home
	},
	{
		path: "/catagory",
		component: Catagory
	},
	{
		path: "/shopcart",
		component: Shopcart
	},
	{
		path: "/Profile",
		component: Profile
	},
	{
		path: "/detail/:iid",
		component: Detail
	}
]

const router = new VueRouter({
	routes,
	mode: "history"
})
export default router