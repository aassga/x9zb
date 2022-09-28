import RecommendApi from '@/api/recommend.js'
import Post from '@/api/post.js'
import baseApi from '@/api/base'
import LikeApi from '@/api/like.js'
import SparkMD5 from 'spark-md5'
// import APILISTS from '../../plugins/apiLists'
import { getDomain } from '@/utils/config'
import { behavior } from '../user/actions'
import { MessageBox, Message } from 'element-ui'
export default {
  // 首页img video数据内容
  async geHomePost ({ commit, dispatch, state }, cid) {
    const result = await RecommendApi.recommendImg()
    const { status, data } = result
    let newData = {}
    if (status == 200) {
      let _likeList = []
      if (localStorage.getItem('token')) {
        _likeList = await dispatch('getLikeList')// 获取点赞数据
      }
      const getVide = await dispatch('getHomeVideoList')// 获取video数据
      const getAd = await dispatch('getAd', cid)// 获取广告数据
      const getLimitdyn = await dispatch('recommendLimitdyn', cid)// 获取限时动态数据
      newData = {
        ...data,
        likeList: _likeList,
        getVide,
        getAd,
        getLimitdyn
        // getPernalPost: getPersonalPost.models
      }
      commit('SET_DYNAMIC_IMG_DATA', newData)
      commit('SET_LIKE_LIST', _likeList)
    }
  },
  // 限动贴文和限动广告
  recommendLimitdyn ({}, cid) {
    const _cid = cid || 0

    return RecommendApi.recommendLimitdyn(_cid).then(res => {
      const { status, data } = res
      if (status == 200) {
        return data.models
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  // 正文内容的广告
  getAd ({ dispatch }, cid) {
    const _cid = cid || 0
    return RecommendApi.recommendAd(_cid).then((res) => {
      const { status } = res
      if (status == 200) {
        return res.data.models
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 新增话题
  setHotTag ({}, param) {
    return Post.setHotTag(param).then((res) => {
      return res
    }).catch(err => {
      console.log(err)
    })
  },
  async postVersionByTshare ({ dispatch }, tshare) {
    return Post.postVersionByTshare(tshare).then(res => {
      if (res.status == 200) {
        return res.data
      }
    })
  },
  async postData ({ dispatch }, pid) {
    return Post.postData(pid).then(res => {
      if (res.status == 200) {
        return res.data
      }
    })
  },
  // 获取点赞数tid List
  async getLikeList ({ dispatch }) {
    return Post.getLikeList().then(res => {
      if (res.status == 200) {
        return res.data.models
      }
    })
  },
  // 主題串增加讚數
  async likeInsert ({ dispatch }, params) {
    const { tid, dataType } = params
    return Post.likeInsert(tid).then(res => {
      if (res.status == 200) {
        dispatch('clearCatch', { name: dataType })
        return res.data
      }
    })
  },
  // 主題串是否已經點讚
  async likeExist ({ dispatch }, tid) {
    return Post.likeExist(tid).then(res => {
      if (res.status == 200) {
        return res.data
      }
    })
  },
  // 主題串增加讚數
  async likeCount ({ dispatch }, tid) {
    return Post.likeCount(tid).then(res => {
      if (res.status == 200) {
        return res.data
      }
    })
  },
  resetImgFail ({ commit }) {
    commit('RESET_IMGFAIL')
  },
  setShowImgs ({ commit }, val) {
    commit('SET_SHOWIMGS', val)
  },
  resetPostRequestData ({ commit }) {
    commit('RESET_POSTDATA')
  },
  setPostRequestData ({ commit }, val) {
    commit('SET_POSTREQUESTDATA', val)
  },
  resetUpload ({ commit }) {
    commit('RESE_UPLOAD')
  },
  resetData ({ commit }) {
    commit('RESETData')
  },
  async getPostInfo ({ commit }) {
    try {
      const { data } = await this.$axios.$get(APILISTS.URI.postInfo)
      commit('SET_POSTINFO', data)
    } catch {}
  },
  async postUseWebSocket ({ state, commit }, file) {
    console.log(file, '---file')
    const limit = 200 * 1024
    // slice img
    const sliceCount = Math.ceil(file.data.byteLength / limit)
    const slices = []
    let start = 0
    let end = start + limit

    for (let index = 0; index < sliceCount; index++) {
      slices.push(file.data.slice(start, end))
      start = end
      end = start + limit
    }

    // get id
    const spark = new SparkMD5.ArrayBuffer()
    spark.append(file.data)
    const id = spark.end()
    const taskid = Math.round(Math.random() * Date.now())
    commit('SET_TASKID', taskid)
    let imgName = ''
    const imgType = state.imgfiles[file.position].type
    const type = state.imgfiles[file.position].type.split('/')
    const postData = {
      action: 'startUpload',
      data: {
        fileName: state.imgfiles[file.position].name,
        fileType: type[type.length - 1],
        fileId: id,
        fileSize: file.data.byteLength,
        fileIndex: 1,
        fileCount: sliceCount,
        fileTotalCount: sliceCount,
        taskId: taskid
      }
    }
    // // get ws URL

    // websocket地址
    let wwsdomain = null
    // if(process.env.NODE_ENV == 'development'){
    wwsdomain = getDomain('imgupload')

    // }else{
    //     const domain = VIEWMODEL.getIMDomain(this.$axios)
    //     const { data } = await this.$axios.$get(domain + '/v5/chatroom/init')
    //     wwsdomain = data.uploadServer
    // }
    wwsdomain = `${wwsdomain}/upload`
    // start ws
    console.log(wwsdomain, 'start=====')
    const ws = new WebSocket(wwsdomain)

    ws.onopen = () => {
      ws.send(JSON.stringify(postData))
      setTimeout(() => {
        if (ws.readyState !== 3) {
          ws.close()
        }
      }, 30 * 1000)
    }
    ws.onmessage = evt => {
      const data = JSON.parse(evt.data)
      if (data.status !== 200) {
        commit('SET_IMGFAILINDEX', file.data)
      }
      // startUpload
      if (data.status === 200 && data.data.action === 'startUpload') {
        const uploadTaskFileIndex = data.data.uploadTask.fileIndex
        ws.send(slices[uploadTaskFileIndex - 1])
      }

      // 一分片上传完才可用下一片
      // saveBinary
      if (data.status === 200 && data.data.action === 'saveBinary') {
        const uploadTaskFileIndex = data.data.uploadTask.fileIndex
        if (data.data.isFinish === 1) {
          // finish upload img
          ws.send(
            JSON.stringify({
              action: 'mergeFile'
            })
          )
        } else {
          ws.send(slices[uploadTaskFileIndex - 1])
        }
      }

      // mergeFile
      if (data.status === 200 && data.data.action === 'mergeFile') {
        imgName = data.data.fileResult
        ws.close()
      }
    }
    ws.onclose = () => {
      const type = imgType.split('/')
      const fileName = imgName + '.' + type[type.length - 1]

      if (imgName) {
        commit('SET_ISUPLOADED', {
          name: fileName,
          size: file.data.byteLength
        })
      } else {
        commit('SET_IMGFAILINDEX', file.data)
      }
    }
  },
  setImgFiles ({ commit }, val) {
    commit('SET_IMGFILE', val)
  },
  async compress ({}, file) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // 荧幕缩放比
    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1
    let ratio = devicePixelRatio / backingStoreRatio
    // <600K不压缩
    if (file.size < 1024 * 600) {
      ratio = 1
    }

    // 进行最小缩放
    let quality = 1
    // <600K不压缩
    if (file.size > 1024 * 600) {
      quality = 0.1
    }
    const width = file.img.width * quality
    const height = file.img.height * quality
    canvas.width = width * ratio
    canvas.height = height * ratio

    canvas.style.width = width * ratio + 'px'
    canvas.style.height = height * ratio + 'px'

    ctx.scale(ratio, ratio)
    ctx.drawImage(file.img, 0, 0, width, height)
    ctx.scale(1 / ratio, 1 / ratio)
    // 浮水印
    // 當圖片長寬超過3000x3000，則使用水印(watermark4.png)
    // 當圖片長寬超過2000x2000，則使用水印(watermark3.png)
    // 當圖片長寬超過1000x1000，則使用水印(watermark2.png)
    // 當圖片長寬超過500x500，則使用水印(watermark1.png)
    // 預設使用水印(watermark.png)

    if (file.watermark.enabled_watermark === 1) {
      let waterimg = ''
      const size = canvas.width * canvas.height
      if (size > 3000 * 3000) {
        waterimg = '/watermark4.png'
      } else if (size > 2000 * 2000) {
        waterimg = '/watermark3.png'
      } else if (size > 1000 * 1000) {
        waterimg = '/watermark2.png'
      } else if (size > 500 * 500) {
        waterimg = '/watermark1.png'
      } else {
        waterimg = '/watermark.png'
      }
      await setWater(waterimg).then(img => {
        ctx.drawImage(img, canvas.width - img.width, 0, img.width, img.height)
      })
    }

    const ndata = canvas.toDataURL('image/jpeg')
    return ndata
  },
  // 提交图文发帖有图片的接口
  async sendHasPicAPI ({ dispatch }, params) {
    const result = await Post.postImage(params)
    const { status } = result
    if (status == 200) {
      const clearResult = await dispatch('clearCatch', { name: 'img' })
      if (clearResult.status == 200) {
        return clearResult
      }
    } else {
      return result
    }
  },
  // 提交图文发帖有图片的接口
  async sendHasVideoPicAPI ({ dispatch }, params) {
    return Post.postImage(params)
      .then(res => {
        const { status } = res
        if (status == 200) {
          console.log('成功')

          // let result =  dispatch("clearCatch", { name: "img" });
          // let {status} = result
          // if(status == 200) {
          return res
          // }
        } else {
          return res
        }
      })
      .catch(err => {})
  },

  async sendNotHasPicAPI ({ state, dispatch }, postData) {
    console.log('是否进入action')
    try {
      const post = postData
      if (state.uploadedInfo !== []) {
        post.images = state.uploadedInfo
      }
      const { status } = await this.$axios.$post(APILISTS.URI.postImage, post)
      if (status === 200) {
        await dispatch('user/behavior', 6, { root: true })
      }
      return true
    } catch ({ status }) {
      return status === 130
    }
  },
  // 清除缓存
  clearCatch ({ commit, dispatch, state }, param) {
    return Post.clearCatch(param)
      .then(res => {
        const { status } = res
        if (status == 200) {
          // dispatch()
          return res
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 获取具体某个帖子的信息
  async getCommemtDetails ({ commit, dispatch, state }, param) {
    return Post.getCommemtDetails(param)
      .then(res => {
        const { status } = res
        // if(status == 200) {
        //   commit('GET_COMMENT_DETAILS',{data:res.data,tid:param.tid})
        // }
        console.log(res)
        return res
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 檢查該貼文是否能評論
  async checkCanReply ({ commit, dispatch, state }, param) {
    return Post.checkCanReply(param)
      .then(res => {
        if (res.status == 200) {
          return res.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 评论
  async creatComment ({ commit, dispatch, state }, param) {
    const { tid, pid, dataType } = param
    const newParam = {
      tid: param.tid,
      pid: param.pid,
      message: param.message,
      tag: null
    }
    const result = await Post.creatComment(newParam)
    const { status, data } = result

    if (status == 200) {
      const getCommNum = await dispatch('getNewCommentNum', newParam)
      const getNewComment = await dispatch('getCommemtDetails', { tid, pid })
      // 清除缓存
      await dispatch('clearCatch', { name: dataType })
      let count = 0
      let newComment = []
      if (getCommNum.status == 200) {
        count = getCommNum.data.count
      }
      if (getNewComment.status == 200) {
        newComment = getNewComment.data.models
      }
      return {
        ...result,
        data: {
          count,
          newComment
        }
      }
    }
  },
  // 获取单个贴文评论数量
  async getNewCommentNum ({ commit, dispatch }, param) {
    return Post.getNewCommentNum(param).then(res => {
      const { status, data } = res
      if (status == 200) {
        return res
      }
    })
  },
  // 获取首页videoList数量
  getHomeVideoList ({ commit, dispatch }) {
    return Post.getHomeVideoList().then((res) => {
      const { status, data } = res
      if (status == 200) {
        return data.models
      }
    }).catch(err => {

    })
  },
  // 获取个人贴文
  getPersonalPost ({ commit, dispatch }, params) {
    return Post.getPersonalPost(params).then((res) => {
      const { status } = res
      if (status == 200) {
        // commit('SET_PERSONAL_POST',res.data)
        return res.data
      }
    }).catch(err => {

    })
  },
  // 清除缓存
  cleatCatch ({ dispatch }, type) {

  }
}
