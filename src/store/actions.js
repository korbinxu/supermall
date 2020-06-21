export default {
	addCart({ state, commit }, payload) {
		let oldProduct = state.cartList.find(item => { return item.iid === payload.iid })
		if (oldProduct) {
			commit("addGoodCount", oldProduct)
		} else {
			// 加1添加进购物车
			commit("addNewGoods", payload)
		}
	}
}