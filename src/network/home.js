import { request } from "./request.js"

export function get_home_multidata() {
	return request({
		url: "/home/multidata"
	})
}

export function get_home_goods(type, page) {
	return request({
		url: "/home/data",
		params: {
			type,
			page
		}
	})
}