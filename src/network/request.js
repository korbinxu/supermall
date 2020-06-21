import axios from "axios"

export function request(config) {
	// 创造axios实例
	const instance = axios.create({
		// 本接口为测试接口,真实接口请联系微信coderwhy001
		baseURL: "http://127.0.0.1:8000/api",
		timeout: 5000
	})
	// 拦截器 interceptors 
	// 发送请求时候被拦截 拦截后一定记得返回 不然不能发送请求
	instance.interceptors.request.use(config => {
		return config
	}, err => {
		err
	})
	instance.interceptors.response.use(result => {
		return result
	}, err => {
		err
	})

	//axios实例有then catch方法 只需要把实例返回就行 
	return instance(config)
}