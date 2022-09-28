import baseApi from '@/api/base.js'
import { setCookie } from '@/utils/auth'
import { getDomain } from '@/utils/config'
import Router from '@/router/index'
import SparkMD5 from 'spark-md5'
import { editProfile } from '../user/actions'
import { clearCatch } from '../post/actions'
import postApi from '@/api/post'
import userApi from '@/api/user'
export default {
  // 信息提示框
  /*
   **massage
   */
  openToast ({ commit }, Text, type, iconClass, className, settime) {},

  // 上传图片websoket
  async useWebSocket ({ state, dispatch, commit }, file) {
    console.log('postfile')
    console.log(file)

    const spark = new SparkMD5.ArrayBuffer()
    // console.log(spark);
    spark.append(file.result)
    // console.log(spark);
    const id = spark.end()
    console.log(id)

    let imgName = ''
    // console.log(state.pictype);
    const type = state.pictype.split('/')
    const postData = {
      action: 'startUpload',
      data: {
        fileName: state.picname,
        fileType: type[type.length - 1],
        fileId: id,
        fileSize: file.result.byteLength,
        fileIndex: 1,
        fileCount: 1,
        fileTotalCount: 1,
        taskId: 1
      }
    }
    // get ws URL  目前test环境写死
    let wwsdomain = null
    // if(process.env.NODE_ENV == 'development'){
    //   wwsdomain = getDomain('imgupload')

    // }else{
    // const domain = VIEWMODEL.getIMDomain(this.$axios)
    const { data } = await baseApi.getImgSeveiceUrl() // this.$axios.$get(domain + '/v5/chatroom/init')
    console.log(data)
    wwsdomain = data.imgupload
    // }

    wwsdomain = `${wwsdomain}/upload`
    console.log(wwsdomain, 'wwsdomain=====')
    const ws = new WebSocket(wwsdomain)
    console.log(ws)
    ws.onopen = () => {
      ws.send(JSON.stringify(postData))
    }
    ws.onmessage = evt => {
      const data = JSON.parse(evt.data)
      console.log(data)
      if (data.status !== 200) {
        commit('SET_ISUPLOADED', {
          key: 'fail',
          val: false
        })
      }
      // startUpload
      if (data.status === 200 && data.data.action === 'startUpload') {
        console.log('startUpload-----------')
        console.log(data.data.uploadTask.fileId)
        // 保存图片到路径
        commit('SET_IMAGE', data.data.uploadTask.fileId + '.jpeg')
        ws.send(file.result)
      }
      // saveBinary
      if (data.status === 200 && data.data.action === 'saveBinary') {
        if (data.data.isFinish === 1) {
          ws.send(
            JSON.stringify({
              action: 'mergeFile'
            })
          )
        }
      }
      // mergeFile
      if (data.status === 200 && data.data.action === 'mergeFile') {
        imgName = data.data.fileResult
        ws.close()
      }
    }

    ws.onclose = async () => {
      if (state.pageName == 'my') {
        const type = state.pictype.split('/')
        const fileName = imgName + '.' + type[type.length - 1]
        const bool = await dispatch('editProfile', {
          avatar: fileName
        })
        commit('SET_ISUPLOADED', {
          key: 'suc',
          val: bool,
          avatar: fileName
        })
      }
    }
    ws.onerror = error => {
      console.log(error)
    }
  },
  setUploadPic ({ commit }, params) {
    console.log(params)
    commit('SETUPLOADPIC', params)
  },
  setIsUpload ({ commit }, val) {
    commit('SET_ISUPLOADED', val)
  },
  // 获取视频websocket以及key等信息
  disk ({ commit }) {
    // 目前是写死的upload_url  后期应该需要根据某个api返回服务器地址
    // let params={
    //   upload_url:[getDomain('vedioUpload')],
    //   upload_key: "59e88b04e67c18196bede0689f6e1c23"
    // }
    return postApi
      .getVideoService()
      .then(res => {
        const { status, data } = res
        if (status == 200) {
          console.log(data)
          const params = {
            upload_url: data.up_api,
            upload_key: data.up_code
          }
          commit('SET_VIDEO_INFO', params)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 上传影片文字内容草稿等信息
  async upLoadVideoInfo ({ dispatch, state, commit }, params) {
    return postApi
      .upLoadVideoInfo(params)
      .then(res => {
        const { status } = res
        console.log(res)
        if (status == 200) {
          return res
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 发布视频贴文
  async upLoadVideoPost ({ dispatch, state, commit }, params) {
    const result = await postApi.upLoadVideoPost(params)
    const { status, data } = result
    if (status == 200) {
      const result = dispatch('clearCatch', { name: 'video' })
      return result
    }
  },
  // 订阅套餐设置
  setSubCombo ({ dispatch, state, commit }, params) {
    return baseApi.setSubCombo(params).then(res => {
      const { status, message, data } = res
      if (status == 200) {
        userApi.delProfileCache()
        return res
      }
    })
  },
  // 购买订阅套餐
  async buySubCombo ({ dispatch, state, commit }, params) {
    const res = await baseApi.buySubCombo(params)
    const { status, message, data } = res
    // 在订阅套餐成功之后  请求订阅套餐下的所有帖文，并且把帖文ID传入已购买的帖文列表中
    if (status == 200 && res.data && res.data.models) {
      console.log('购买订阅套餐的params')
      console.log(params)
      const rep = await baseApi.getOtherSubPosts({ sub_id: params.sub_id })
      if (rep.status == 200) {
        const list = state.postList
        for (let index = 0; index < rep.data.models.length; index++) {
          const element = rep.data.models[index]
          list.push(element.tid)
        }
        commit('SET_POST_LIST', list)
      }
    }
    return res
  },
  // 获取他人用户信息
  getOtherProfile ({}, params) {
    return userApi.getOtherProfile(params).then(res => {
      return res
    })
  },
  // 自己的订阅模特列表
  async getBuyCombo ({ dispatch, state, commit }, params) {
    const res = await baseApi.getBuyCombo(params)
    const { status, message, data } = res
    let result = {}
    if (status == 200) {
      console.log(data)
      if (data.models.length > 0) {
        const uid = data.models
        // data.models.map(item => {
        //   uid.push(item.sub_uid)
        // })
        // uid = data.models
        result = await dispatch('getOtherProfile', { uids: uid })
      }
      commit('SET_COMBO_LIST', data.models)
      commit('SET_SUB_LIST', data.sub_ids)
    }
    return result
  },
  // 模特自己的订阅套餐
  getSubCombo ({ dispatch, state, commit }, params) {
    return baseApi.getSubCombo(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 我已订阅的模特
  getOtherSubCombo ({ dispatch, state, commit }, params) {
    console.log(params)
    return baseApi.getOtherSubCombo(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 获取聊天室 群组  私聊列表
  getMessageList ({ dispatch, state, commit }, params) {
    console.log(params)
    return baseApi.getMessageList(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 模特套餐的贴文列表
  getOtherSubPosts ({ dispatch, state, commit }, params) {
    return baseApi.getOtherSubPosts(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 购买单价帖子
  putBuyPost ({ dispatch, state, commit }, params) {
    return baseApi.putBuyPost(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 已经购买的帖子列表
  getBuyPost ({ dispatch, state, commit }, params) {
    return baseApi.getBuyPost(params).then(res => {
      const { status, message, data } = res
      if (status == 200) {
        const list = []
        for (let index = 0; index < data.models.length; index++) {
          const element = data.models[index]
          list.push(element.tid)
        }
        commit('SET_POST_LIST', list)
      }
      return res
    })
  },
  // 获取帖文的视频地址
  getVideo ({ dispatch, state, commit }, params) {
    return baseApi.getVideo(params).then(res => {
      const { status, message, data } = res
      if (status == 200) {
        return res
      }
    })
  },
  // 获取 模特 的所有付费贴文   第三人请求获取
  getComboPosts ({ dispatch, state, commit }, params) {
    return baseApi.getComboPosts(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 获取 模特 的单价贴文
  getComboPost ({ dispatch, state, commit }, params) {
    return baseApi.getComboPost(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 获取国家ID列表
  getCountryList ({ dispatch, state, commit }, params) {
    return baseApi.getCountryList(params).then(res => {
      const { status, message, data } = res
      commit('SET_COUNTRY_LIST', data)
      return res
    })
  },
  // 获取国家下一级ID列表
  getProvinceList ({ dispatch, state, commit }, params) {
    return baseApi.getProvinceList(params).then(res => {
      const { status, message, data } = res
      commit('SET_CITY_LIST', data)
      return res
    })
  },
  // 获取城市列表
  getNewCityList ({ dispatch, state, commit }, params) {
    return baseApi.getNewCityList(params).then(res => {
      const { status, message, data } = res
      commit('SET_CITY_LIST', data)
      return res
    })
  },
  // 获取城市ID列表
  getCityList ({ dispatch, state, commit }, params) {
    return baseApi.getCityList(params).then(res => {
      const { status, message, data } = res
      return res
    })
  },
  // 模特角色营收报表
  getModelList ({ dispatch, state, commit }, params) {
    return baseApi.getModelList(params).then((res) => {
      const { status, message, data } = res
      return res
    })
  },
  // MCN角色营收报表
  getMCNList ({ dispatch, state, commit }, params) {
    return baseApi.getMCNList(params).then((res) => {
      const { status, message, data } = res
      return res
    })
  },
  // MCN model营收报表
  getMCNGroupList ({ dispatch, state, commit }, params) {
    return baseApi.getMCNGroupList(params).then((res) => {
      const { status, message, data } = res
      return res
    })
  }
}
