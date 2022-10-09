import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import TIM from 'tim-js-sdk';
import { MessageBox, Message } from 'element-ui'
import { info,imTouristAccount } from '../api/user.js'

import HomedApi from '@/api/home';
// let options = {
//   SDKAppID: 1400699788// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
// };
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
// let tim = TIM.create(options); // SDK 实例通常用 tim 表示
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
	type:1,//2篮球指数或1足球指数
	company_id:1,//sock 指数公司
	item:{},
	infos:{},
	goalItem:[],//进球赛事
	goal:false,//足球socket是否进球
	system:{},//系统配置
	danmakuSystem:{//弹幕配置
		show:true,//是否显示
		area:3,//显示的区域
		size:2,//字体大小
		opacity:100//透明度
	},
	onLine:0,
	shouNum:0,
	game:{
		red:true,
		yellow:true,
		voice:true,
		voice1:false,
	},
	immediately:{//即时比分显示隐藏
		value1:true,
		value2:true,
		value3:false,
		value4:false
	},
	concealNum:0,// 即时比分隐藏的场数
    loading:false,
	messageList:[],
	basketball_exponent:{},
	football_exponent:{},
	newMsg:{showMsg:false},
  },
  modules: {
    app,
    settings,
    user
  },
  mutations:{
	  getSystemNotice(store,event){
		// 深度拷贝维问题
		let obj = JSON.parse(JSON.stringify(event))
		obj.forEach(item=>{
			item.data = JSON.parse(item.payload.data)
		})
		// console.log('喇叭');
		if(store.messageList.length > 0) {
			// store.messageList.push(obj[0])
		}else {
			store.messageList = obj
		}
		// console.log(store.messageList);
		// 判断自定义消息和非自定义消息
		// obj.avatar = event[0].groupProfile.avatar
		// if(obj.type == 'TIMCustomElem'){//自定义消息
		// 	obj.data = JSON.parse(obj.payload.data)
		// }
		// store.item = obj  
	  },
	  
	updateConversationList(store,event){
		// 深度拷贝维问题
		let obj = JSON.parse(JSON.stringify(event[0].lastMessage))
		let groupProfile = JSON.parse(JSON.stringify(event[0].groupProfile))
		// return
		// 判断自定义消息和非自定义消息
		obj.groupProfile = groupProfile
		obj.avatar = event[0].groupProfile.avatar
		if(obj.type == 'TIMCustomElem'){//自定义消息
			obj.data = JSON.parse(obj.payload.data)
		}
		store.item = obj
		// console.log('监听普通消息');
		store.messageList = [...store.messageList,...[obj]]
	},
	setdanmakuShow(store,obj){
		store.item = obj
	},
	kaifazhong(state){
		MessageBox.confirm('开发中...', '提示', {
		  confirmButtonText: '取消',
		  cancelButtonText: '确定',
		  type: 'warning'
		}).then(() => {
			// router.push({path:'/'})
		})
	}
  },
  getters,
  actions:{

	 getImToken({ commit }, params) {
		return HomedApi.getImToken(params).then((res) => {

		 return res
		});
	  },
	  
  sendMessage({ commit }, params) {
    return HomedApi.sendMessage(params).then((res) => {
      return res
    });
  },
  inRoom({ commit }, params) {
    return HomedApi.inRoom(params).then((res) => {
      return res
    });
  },
  leaveRoom({ commit }, params) {
    return HomedApi.leaveRoom(params).then((res) => {
      return res
    });
  },
  getChatHistory({ commit }, params) {
    return HomedApi.getChatHistory(params).then((res) => {
      return res
    });
  },
  deleteMessage({ commit }, params) {
    return HomedApi.deleteMessage(params).then((res) => {
      return res
    });
  },
  mute({ commit }, params) {
    return HomedApi.mute(params).then((res) => {
      return res
    });
  },
  freeze({ commit }, params) {
    return HomedApi.freeze(params).then((res) => {
      return res
    });
  },
  pin({ commit }, params) {
    return HomedApi.pin(params).then((res) => {
      return res
    });
  },
  inviteRoom({ commit }, params) {
    return HomedApi.inviteRoom(params).then((res) => {
      return res
    });
  },
  getQuickReplyList({ commit }, params) {
	return HomedApi.getQuickReplyList(params).then((res) => {
		return res
		});
	},
	getMessageList({ commit }, params) {
		return HomedApi.getMessageList(params).then((res) => {
				return res
		}).catch((err)=>{
			localStorage.clear();
			// window.location.reload()
		})
  },
	addQuickReply({ commit }, params) {
		return HomedApi.addQuickReply(params).then((res) => {
			return res
		});
	},
	delQuickReply({ commit }, params) {
		return HomedApi.delQuickReply(params).then((res) => {
			return res
		});
	},
	  conditionsActions(){
	  },
	  // 接收
	  WS_DATA_ACTIONS(store,res){
		  // 100 == 成功 返回赛事数据 ,101 == 成功 用户连接-登记成功
		  if(res.code == 100 && (res.data.type == 'basketball_exponent' || res.data.type == 'basketball_match')){
			  store.state.basketball_exponent = res.data
		  }
		  if(res.code == 100 && (res.data.type == 'football_exponent' || res.data.type == 'football_match')){
			  store.state.football_exponent = res.data
		  }
	  },
	  succeed(){
	  },
	  unsuccessful(){
	  },
	  
	  getimTouristAccount(){
		  imTouristAccount().then(res=>{
				localStorage.setItem('imTouristAccount',JSON.stringify(res.data))
		  }).catch(res=>{})
	  },
	  // 用户信息
	  getUserInfo(state){
		  info().then(res=>{
				if(res === undefined){
					localStorage.clear();
					// window.location.reload()
				}
			  state.state.infos = res.data
			  // this.updateMyProfile(res.data)
		  }).catch(res=>{})
	  },
	  
	  // 登录腾讯im 
	  loginTim(state,data) {
		 let obj = {
			  userID:'',
			  userSig:''
		 }
		 
		 let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
		 let im = localStorage.getItem('imTouristAccount') || {}
		 // this.loginTim(userInfo.id,userInfo.userSig)
		 if(JSON.stringify(userInfo) !== '{}'){
			 obj.userID = userInfo.id.toString()
			 obj.userSig = userInfo.userSig
		 } else {
			 im = JSON.parse(im)
			 obj.userID = im.id
			 obj.userSig = im.sig
		 }
		 let promise = tim.login(obj)
		promise.then(function(imResponse) {
			//获取会话列表
			// console.log('登录成功');
		})
		.catch(function(imError) {
			console.warn("login error:", imError); // 登录失败的相关信息
		});
	  },
	  // 创建房间 （由php后台添加 ，前端不需要）
	  createGroup(state,data){
		  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
		  let {name,id} = data;
		  return;
		  let promise = tim.createGroup({
			type: TIM.TYPES.GRP_AVCHATROOM,
			name: name,
			groupID: userInfo.id.toString(),
			memberList: [{
				userID: userInfo.id.toString(),
			}] // 如果填写了 memberList，则必须填写 userID
		  });
		  promise.then(function(imResponse) { // 创建成功
			// 创建群时指定了成员列表，但是成员中存在超过了“单个用户可加入群组数”限制的情况
			// 一个用户 userX 最多允许加入 N 个群，如果已经加入了 N 个群，此时创建群再指定 userX 为群成员，则 userX 不能正常加群
			// SDK 将 userX 的信息放入 overLimitUserIDList，供接入侧处理
		  }).catch(function(imError) {
			//console.warn('createGroup error:', imError); // 创建群组失败的相关信息
		  });
	  },
	  // 进入房间
	  joinGroup(state,data) {
		let _this = this
		// data.typeof()
		
		// console.log(typeof(data));
		let id = null
		if('string' == typeof(data)){
			id = data
			// console.log(id);
		}else if(typeof(data) == 'object') {
			id = data.id
		}
		return;
		// console.log(data.String());
	  	let promise = tim.joinGroup({
	  		groupID: id,
	  		type: TIM.TYPES.GRP_AVCHATROOM
	  	});
	  	promise.then(function(imResponse) {
			// console.log(imResponse);
	  		switch (imResponse.data.status) {
	  			
	  			case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
	  				break;
	  			case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
	  				
	  		// 		setTimeout(res=>{
	  				// 	let promise1 = tim.getMessageList({conversationID: 'C2C' + data.id.toString(), count: 20});
	  				// 	promise1.then(function(imResponse1) {
	  				// 	  const messageList = imResponse1.data.messageList; // 消息列表。
	  				// 	});
	  				// },500)
	  				break;
	  			case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
	  				break;
	  			default:
	  				break;
	  		}
	  		
	  	}).catch(function(imError) {
			// Vue.prototype.$message.error(imError)
	  	});
	  },
	  // 获取在线人数
	  getGroupOnlineMemberCount(state,data){
		//  let promise1 = tim.getGroupOnlineMemberCount(data.roomId);
		//  promise1.then(function(imResponse) {
		//  	state.state.onLine = imResponse.data.memberCount
		//  }).catch(function(imError) {
		//    console.warn('getGroupOnlineMemberCount error:', imError); // 获取直播群在线人数失败的相关信息
		//  }); 
	  },
	 
	  
	  // 修改腾讯Im用户信息
	  updateMyProfile(state,data){
		  // let {} = data
		//   let userInfo = state.state.infos;
		//   let promise = tim.updateMyProfile({
		//     nick: userInfo.user_nickname,
		//     avatar: userInfo.avatar,
		//     gender: TIM.TYPES.GENDER_MALE,
		//     selfSignature: '',
		//     allowType: TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
		//   });
		//   promise.then(function(imResponse) {
		//   }).catch(function(imError) {
		//    // console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
		//   });
	  }
  }
})

export default store

