// 事件统计

function getName(i) {
	if (i == 'goals') {
		return '进球'
	} else if (i == 'penalty') {
		return '点球'
	} else if (i == 'dribble') {
		return '过人'
	} else if (i == 'dribble_succ') {
		return '过人成功'
	} else if (i == 'clearances') {
		return '解围'
	} else if (i == 'blocked_shots') {
		return '有效阻挡'
	} else if (i == 'interceptions') {
		return '拦截'
	} else if (i == 'tackles') {
		return '抢断'
	} else if (i == 'passes') {
		return '传球'
	} else if (i == 'passes_accuracy') {
		return '传球成功'
	} else if (i == 'key_passes') {
		return '关键传球'
	} else if (i == 'crosses') {
		return '传中球'
	} else if (i == 'crosses_accuracy') {
		return '传中球成功'
	} else if (i == 'long_balls') {
		return '长传'
	} else if (i == 'long_balls_accuracy') {
		return '成功长传'
	} else if (i == 'duels') {
		return '1对1拼抢'
	} else if (i == 'duels_won') {
		return '1对1拼抢成功'
	} else if (i == 'dispossessed') {
		return '丢球'
	} else if (i == 'fouls') {
		return '犯规'
	} else if (i == 'was_fouled') {
		return '被侵犯'
	} else if (i == 'offsides') {
		return '越位'
	} else if (i == 'yellow2red_cards') {
		return '两黄变红'
	} else if (i == 'saves') {
		return '扑救'
	} else if (i == 'punches') {
		return '拳击球'
	} else if (i == 'runs_out') {
		return '守门员出击'
	} else if (i == 'runs_out_succ') {
		return '守门员出击成功'
	} else if (i == 'good_high_claim') {
		return '高空出击'
	}
}

// 篮球
function getBasketName(i) {
	if(i == 'hits'){
		return '命中次数'
	}else if(i == 'shots'){
		return '投篮次数'
	}else if(i == 'three_pointer_shot'){
		return '三分球投篮次数'
	}else if(i == 'three_pointer'){
		return '三分球投篮命中次数'
	}else if(i == 'free_throw'){
		return '罚球命中次数'
	}else if(i == 'free_throw_shots'){
		return '罚球投篮次数'
	}else if(i == 'offensive_rebound'){
		return '进攻篮板'
	}else if(i == 'defensive_rebound'){
		return '防守篮板'
	}else if(i == 'total_rebounds'){
		return '总的篮板'
	}else if(i == 'assists'){
		return '助攻数'
	}else if(i == 'steals'){
		return '抢断数'
	}else if(i == 'blocks'){
		return '盖帽数'
	}else if(i == 'number_of_mistakes'){
		return '失误次数'
	}else if(i == 'individual_fouls'){
		return '个人犯规次数'
	}else if(i == 'score'){
		return '得分'
	}
}
//取值
function get(key,sync = true) {
    try {
		if(sync){
			return uni.getStorageSync(key);
		}else{
			let data = '';
			uni.getStorage({
				key:key,
				success: function (res) {
					data = res.data;
				}
			});
			return data;
		}
    } catch (e) {
        return false;
    }
}

//赋值
function set(key, value, sync = true) {
    try {
		// console.log(key)
        if (sync) {
            return uni.setStorageSync(key, value);
        } else {
            uni.setStorage({
                key: key,
                data: value
            });
        }
    } catch (e) {

    }
}
//移除
function del(key, sync = true){
    try {
        if (sync) {
            return uni.removeStorageSync(key);
        } else {
            uni.removeStorage({
                key: key
            });
        }
    } catch (e) {
        return false;
    }
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

export default {
	del,
	get,
	set,
	getName,
	timeStamp1,
	getBasketName
}
