import Vue from 'vue'
import Vuex from 'vuex'
// import TIM from 'tim-js-sdk';
let options = {
  SDKAppID: 1400699788// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
// let tim = TIM.create(options); // SDK 实例通常用 tim 表示
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		info: {}, //用户信息
		system: {
			CountryCode: []
		},
		show:true,
		timMessage:[],
		unRead:{}
	},
	modules: {},
	getters:{
		unReadInfo:(state,getters)=>{
			return state.unRead
		}
	},
	mutations: {
		getSystemNotice(store, event) {
			// 处理消息
			event.payload = JSON.parse(event.payload.data)
			event.normal = event.payload.normal
			event.type1 = event.payload.type
			store.timMessage.push(event)
		},
		/* 处理历史消息 */
		getHistory(store, event) {
			// 处理消息
			// console.log('触发历史消息');
			// console.log(event)
			if(event.length > 3) {
				event.forEach(item=>{
					item.payload = JSON.parse(item.payload.data)
					item.normal = item.payload.normal
					item.type1 = item.payload.type
					store.timMessage.push(item)
				})
				// console.log(store.timMessage);
				// store.timMessage = event
			}
			
			// event.payload = JSON.parse(event.payload.data)
			// event.normal = event.payload.normal
			// event.type1 = event.payload.type
			// store.timMessage.push(event)
		},
		UPDATE_MSG(state,data){
			state.unRead = data;
		},
	},
	actions: {
		// getabc(e){
		// 	console.log('查看触发次数');
		// },
		updateMsg({commit},data){
			commit('UPDATE_MSG', data)
		},
		getInfo(store, http) {
			http.get('api/Member/info', {}).then(res => {
				store.state.info = res
			}).catch(res => {
				localStorage.removeItem("userInfo");
				let userid = 10000000 + Math.random().toString().slice(-6);
				localStorage.setItem("userid", userid);
			})
		},
		// 退出登录
		logout(){
			// let promise = tim.logout();
			// promise.then(function(imResponse) {
				
			// }).catch(function(imError) {
			//   console.warn('logout error:', imError);
			// });
		},
		// 退出群组
		quitGroup(store, groupID){
			console.log(groupID);
			// let promise = tim.quitGroup(groupID.groupID);
			// promise.then(function(imResponse) {
			// 	console.log(imResponse);
			// }).catch(function(imError) {
			//     console.log(imError);
			// });
		},
		
		// 登录腾讯im
		loginTim(state, data) {
			let userInfo = {}
			uni.getStorage({
				key:'information',
				success:function(res){
					userInfo = res.data
				}
			})
			let obj = {
				  userID:'',
				  userSig:''
			}
			// this.loginTim(userInfo.id,userInfo.userSig)
			// if (userInfo == null) return
			if(JSON.stringify(userInfo) == '{}'){
				// uni.getStorage({
				// 	key:'imTouristAccount',
				// 	success(res) {
				// 		obj.userID = res.data.id
				// 		obj.userSig = res.data.sig
				// 	}
				// })
			}else {
				// obj.userID = userInfo.id.toString()
				// obj.userSig = userInfo.userSig
			}
			console.log(obj);
			setTimeout(res=>{
				// var promise = tim.login(obj);
				// promise.then(function(imResponse) {
				// 	//获取会话列表
				// })
				// .catch(function(imError) {
				// 	console.warn("login error:", imError); // 登录失败的相关信息
				// });
			},500)
		},
		// 进入房间
		joinGroup(state, data) {
			
			// let promise = tim.joinGroup({
			// 	groupID: data.id.toString(),
			// 	type: TIM.TYPES.GRP_AVCHATROOM
			// });
			// promise.then(function(imResponse) {
			// 	console.log('进入房间');
			// 	console.log(imResponse);
			// 	// switch (imResponse.data.status) {
			// 	// 	case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
			// 	// 		break;
			// 	// 	case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
			// 	// 		break;
			// 	// 	case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
			// 	// 		break;
			// 	// 	default:
			// 	// 		break;
			// 	// }
			// }).catch(function(imError) {
			// 	console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
			// });
		},

		// 修改腾讯Im用户信息
		updateMyProfile(state, data) {
			// let {} = data
			// let promise = tim.updateMyProfile({
			// 	nick: data.user_nickname,
			// 	avatar: data.avatar,
			// 	gender: TIM.TYPES.GENDER_MALE,
			// 	selfSignature: '',
			// 	allowType: TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
			// });
			// promise.then(function(imResponse) {
			// }).catch(function(imError) {
			// 	console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
			// });
		}
	}
})

export default store
