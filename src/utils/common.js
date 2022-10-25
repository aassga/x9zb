import router from '../router'
// 时间戳转时间
function timeStamp(value) {
	var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var sdate = ("0" + date.getDate()).slice(-2);
	var hour = ("0" + date.getHours()).slice(-2);
	var minute = ("0" + date.getMinutes()).slice(-2);
	var second = ("0" + date.getSeconds()).slice(-2);
	// 拼接
	var result = hour + ":" + minute; //+ ":" + second;
	// 返回
	return result;
}

// 时间戳转时间 年月日
function timeStamp1(value) {
	var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var sdate = ("0" + date.getDate()).slice(-2);
	var hour = ("0" + date.getHours()).slice(-2);
	var minute = ("0" + date.getMinutes()).slice(-2);
	var second = ("0" + date.getSeconds()).slice(-2);
	// 拼接
	var result = year + '-' + month + '-' + sdate + ' ' + hour + ":" + minute; //+ ":" + second;
	// 返回
	return result;
}


// 随机数
function rand(min = 1000, max = 9999) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function gotDown() {
	return router.push({
		path: '/downLoad',
		name: 'downLoad'
	})
}

/**
 * 分享QQ好友
 * @param  {[type]} title [分享标题]
 * @param  {[type]} url   [分享url链接，默认当前页面链接]
 * @param  {[type]} pic   [分享图片]
 * @return {[type]}       [description]
 */
function shareQQ(url, title, pic) {
	var param = {
		url: url || window.location.href,
		desc: '',
		/*分享理由*/
		title: title || '',
		/*分享标题(可选)*/
		summary: '',
		/*分享描述(可选)*/
		pics: pic || '',
		/*分享图片(可选)*/
		flash: '',
		/*视频地址(可选)*/
		site: '' /*分享来源 (可选) */
	};
	var s = [];
	for (var i in param) {
		s.push(i + '=' + encodeURIComponent(param[i] || ''));
	}
	var targetUrl = "http://connect.qq.com/widget/shareqq/iframe_index.html?" + s.join('&');
	window.open(targetUrl, 'qq', 'height=520, width=720');
}

/**
 * 微信分享
 * @return {[type]} [description]
 */
function weixin() {
	var url = window.location.href,
		encodePath = encodeURIComponent(url),
		targetUrl = 'http://qr.liantu.com/api.php?text=' + encodePath;
	window.open(targetUrl, 'weixin', 'height=320, width=320');
}

/**
 * 分享新浪微博
 * @param  {[type]} title [分享标题]
 * @param  {[type]} url   [分享url链接，默认当前页面]
 * @param  {[type]} pic   [分享图片]
 * @return {[type]}       [description]
 */
function sinaWeiBo(title, url, pic) {
	var param = {
		url: url || window.location.href,
		type: '3',
		count: '1',
		/** 是否显示分享数，1显示(可选)*/
		appkey: '',
		/** 您申请的应用appkey,显示分享来源(可选)*/
		title: '',
		/** 分享的文字内容(可选，默认为所在页面的title)*/
		pic: pic || '',
		/**分享图片的路径(可选)*/
		ralateUid: '',
		/**关联用户的UID，分享微博会@该用户(可选)*/
		rnd: new Date().valueOf()
	}
	var temp = [];
	for (var p in param) {
		temp.push(p + '=' + encodeURIComponent(param[p] || ''))
	}
	var targetUrl = 'http://service.weibo.com/share/share.php?' + temp.join('&');
	window.open(targetUrl, 'sinaweibo', 'height=430, width=400');
}
//深度合并对象
function assignDeep() {
	const args = Array.from(arguments);
	if (args.length < 2) return args[0];
	let result = args[0];
	args.shift();
	args.forEach(item => {
		if (isPlainObject(item)) {
			if (!isPlainObject(result)) result = {}
			for (let key in item) {
				if (result[key] && isPlainObject(item[key])) {
					result[key] = assignDeep(result[key], item[key])
				} else {
					result[key] = item[key]
				}
			}
		} else if (item instanceof Array) {
			if (!(result instanceof Array)) result = []
			item.forEach((arrItem, arrIndex) => {
				if (isPlainObject(arrItem)) {
					result[arrIndex] = assignDeep(result[arrIndex])
				} else {
					result[arrIndex] = arrItem
				}
			})
		}
	})
	return result;
}
const isPlainObject = obj => {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

function shareToQq(title, url, picurl) {

	var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' +
		url + '&pics=' + picurl;

	window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');

}

export {
	timeStamp,
	rand,
	timeStamp1,
	gotDown,
	shareQQ,
	weixin,
	sinaWeiBo,
	shareToQq,
	assignDeep
}
