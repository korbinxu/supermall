export default {
	// 增加商品数量
	addGoodCount(state, payload) {
		payload.count++
	},
	// 添加新的商品
	addNewGoods(state, payload) {
		payload.checked = true
		payload.count = 1
		state.cartList.push(payload)
	}
}