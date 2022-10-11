import userApi from '@/api/user.js'
import HomedApi from '@/api/home.js';
import postApi from "@/api/post.js";
import { setCookie } from '@/utils/auth'
import { getDomain } from '@/utils/config'
import Router from '@/router/index'
import SparkMD5 from 'spark-md5'
export default {
    // socket预留使用
    getWsurl({ commit }) {
        return userApi.getWsurl().then((res) => {
            if (res.status == 200) {
                commit('SET_SOCKETURL', res.data.ws)
            }
            return res
        })
    },
    getGiftList ({commit}) {
        return userApi.getGiftList().then((res)=>{
            if (res.status == 200) {
                commit('SET_GIFT_LIST', res.data)
            }
            return res
        })
    },
    getChatList ({commit}) {
        return userApi.getChatList().then((res)=>{
            if (res.status == 200) {
                commit('SET_CHAT_LIST', res.data)
            }
            return res
        })
    },
    getProfile({ commit }) {
        return userApi.getProfile().then((res) => {
            if (res.status == 200) {
                commit('SET_USER_INFO', res.data)
                // 存储用户类型
                let list = [1, 3, 2];
                // // console.log(res.data)
                commit('SET_USER_TYPE', list[res.data.mcn_data.usertype]);
                // 获取账户金额
                commit('SET_USER_AMOUNT', res.data.count.extcredits3.count);
            }
            return res
        })
    },
    // 修改用户资料
    putProfile({ dispatch, commit }, params) {
        return userApi.putProfile(params).then((res) => {
            // if(res.status == 200) {
            //     dispatch('getProfile')
            // }
            return res
        })
    },
    // 清除用户缓存
    delProfileCache({ dispatch, commit }, params) {
        return userApi.delProfileCache(params).then((res) => {
            if (res.status == 200) {
                dispatch('getProfile')
            }
            return res
        })
    },
    // 修改用户账号
    putUsername({ dispatch, commit }) {
        return userApi.putUsername().then((res) => {
            // if(res.status == 200) {
            //     dispatch('getProfile')
            // }
            return res
        })
    },
    fastRegister({ dispatch, state, commit }, params) {
        return userApi.fastRegister(params).then((res) => {
            const { status, message, data } = res
            if (status == 200) {

                setCookie('token', data.token)
                setCookie('password', data.password)
                localStorage.setItem('token', data.token)
                commit('SETUSERINFO', data)
                dispatch('getProfile')
                // dispatch("setStateName")
                Router.push('home')
            }
            return res
        })
    },
    // 第三方登录
    thirdLogin({ dispatch, state, commit }, params) {
        let arg = {
            access_token: params.access_token
        }
        return userApi.thirdLogin(arg, params.type).then((res) => {
            const { status, message, data } = res
            if (status == 200) {
                setCookie('token', data.token)
                localStorage.setItem('token', data.token)
                commit('SET_LOGIN', data)
                dispatch('getProfile')
                // dispatch("setStateName")
                Router.push('home')
            }
            return res
        })
    },
    //登录
    login({ dispatch, state, commit }, params) {
        return userApi.login(params).then((res) => {
            const { status, message, data } = res
            if (status == 200) {

                setCookie('token', data.token)
                localStorage.setItem('token', data.token)
                commit('SET_LOGIN', data)
                dispatch('getProfile')
                dispatch('getInsertList')
                // dispatch("setStateName")
                Router.push('home')
            }
            return res
        })
    },

    //邮箱注册
    emailRegister({ dispatch, state, commit }, params) {
        return userApi.emailRegister(params).then((res) => {
            const { status, message, data } = res
            if (status == 200||status == 501) {

                setCookie('token', data.token)
                localStorage.setItem('token', data.token)
                commit('SET_LOGIN', data)
                dispatch('getProfile')
                // Router.push('home')
            }
            return res
        })
    },
    // 获取粉丝数量
    getFansCount({ }, params) {
        return userApi.getFansCount(params).then((res) => {
            return res
        })
    },
    // 获取他人粉丝数量
    getOtherFansCount({ }, params) {
        return userApi.getOtherFansCount(params).then((res) => {
            return res
        })
    },
    // 获取他人用户信息
    getOtherProfile({ }, params) {
        return userApi.getOtherProfile(params).then((res) => {
            let { status, data } = res
            // console.log(data)
            if (status == 200) {
                let list = [1, 3, 2];
                data.forEach((ele,idx) => {
                    ele.mcn_data.usertype = list[ele.mcn_data.usertype]
                });
            }
            return data
        })
    },
    // 获取粉丝列表
    getFansList({ }, params) {
        return userApi.getFansList(params).then((res) => {
            return res
        })
    },
    // 删除粉丝
    delFans({ }, params) {
        return userApi.delFans(params).then((res) => {
            return res
        })
    },
    // 获取关注列表
    getAttentionList({ commit }, params) {
        return userApi.getAttentionList(params).then((res) => {
            const { status, data } = res
            if (status == 200) {
                commit('SET_ATT_LIST', data.models)
            }
            return res
        })
    },
    //修改头像等信息
    async editProfile({ state, dispatch }, params) {
        const res =  await userApi.editProfile(params)

        const { status } = res
        if (status == 200) {
            // await dispatch('delProfileCache')
            // baseApi.upLoadVideoPost(params)
            await postApi.clearCatch({name: "img"})
            await postApi.clearCatch({name: "video"})
            await dispatch('getProfile')
            return res
        }
        // try {
        //   const { status } = await this.$axios.$put(apiLists.URI.memberProfile, json)
        //   if (status === 200) {
        //     await dispatch('profile')
        //     if (checkValid(state.profile)) dispatch('behavior', 5)
        //     return true
        //   } else {
        //     return false
        //   }
        // } catch {}
    },


    // 获取关注数量
    getAttentionCount({ }, params) {
        return userApi.getAttentionCount(params).then((res) => {
            return res
        })
    },
    // 获取他人关注数量
    getOtherAttentionCount({ }, params) {
        return userApi.getOtherAttentionCount(params).then((res) => {
            return res
        })
    },
    // 获取关注列表
    addAttention({ }, params) {
        return userApi.addAttention(params).then((res) => {
            return res
        })
    },
    // 获取关注列表
    delAttention({ }, params) {
        return userApi.delAttention(params).then((res) => {
            return res
        })
    },
    // 获取贴文收藏列表
    getInsertList({ }, params) {
        return userApi.getInsertList(params).then((res) => {
            return res
        })
    },
    // 贴文收藏
    favoriteInsert({ }, params) {
        return userApi.favoriteInsert(params).then((res) => {
            return res
        })
    },
    // 贴文取消收藏
    delFavoriteInsert({ }, params) {
        return userApi.delFavoriteInsert(params).then((res) => {
            return res
        })
    },
    // 成为模特
    useModel({ }, params) {
        return userApi.useModel(params).then((res) => {
            return res
        })
    },
    //上传图文后应该要请求的接口
    async behavior({ state, commit, getters }, action) {
        try {
            if (state.profile.is_proven || !getters.hasLogin) return
            const { uid, pro_user: proUid } = state.profile
            await this.$axios.$post(
                `${VIEWMODEL.getMissionDomain(this.$axios)}/promote/user/action`,
                { uid, proUid, action }
            )
            const { data } = await this.$axios.$get('v1/member/profile')
            commit('SET_USER', data)
        } catch {

        }
    },
    setStateName({ commit }, params) {
        return HomedApi.getUserAddress(params).then((res) => {
            // console.log('通过ip获取定位', res)
            if (res.data.code == 100) {
                commit('SET_STATE_NAME', res.data.current_city);
            }
            return res
        });
    },
    getImToken({ commit }, params) {
        return HomedApi.getImToken(params).then((res) => {
            return res
        });
    },
    getMessageList({ commit }, params) {
        return HomedApi.getMessageList(params).then((res) => {
            return res
        })
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
    chatInOut({ commit }, params) {
        return userApi.chatInOut(params).then((res) => {
            return res
        })
    },

    getUnReadMsgNum({ commit }){
        return userApi.getUnReadMsgNum().then((res) => {
            commit('SET_UNREAD_MSG_NUM', res.data.count);
        })
    }
}