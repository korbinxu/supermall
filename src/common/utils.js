// // 防抖函数 执行最后一次事件
export function debounce(fun, delay) {
	let timer = null;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fun.apply(this, args)
		}, delay);
	};
}



// 节流 事件开始不执行 结束也执行
export function throttle(fun, wait) {
	let tiemr = null
	return function () {
		if (!timer) {
			timer = setTimeout(() => {
				fun.apply(this)
				tiemr = null
			}, wait)
		}
	}
}

// 节流 开始立即执行 结束不执行 
export function throttleNow(fun, wait) {
	let old = 0
	return function () {
		let now = new Date().valueOf()
		if (now - old >= wait) {
			fun.apply(this)
			old = now
		}
	}
}


function padLeftZero(str) {
	return ("00" + str).substr(str.length);
}

// 时间格式化
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	};

	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + "";
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}

	return fmt;
}