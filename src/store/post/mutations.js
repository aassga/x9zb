const mutations = {
  SET_DYNAMIC_IMG_DATA (state, data) {
    // state.imgData = data;
    const newImgData = {}// 图片data
    const newVideoData = {}// video data
    const adData = {} // getPernalPost
    data.models.length > 0 && data.models.map(item => { // 处理图片数据
      newImgData[item.tid] = {
        ...item,
        showComment: false,
        commentItems: [], // 评论的东西
        comm_content: '',
        dataType: 'img',
        isAd: false
      }
      // return item.tid;
    })
    data.getVide.length > 0 && data.getVide.map((item, index) => {
      if (index <= 9) {
        newVideoData[item.tid] = {
          ...item,
          showComment: false,
          commentItems: [], // 评论的东西
          comm_content: '',
          dataType: 'video',
          isAd: false
        }
      }
    })
    data.getAd.length > 0 && data.getAd.map(item => { // 处理图片数据
      adData[item.tid] = {
        ...item,
        showComment: false,
        commentItems: [], // 评论的东西
        comm_content: '',
        dataType: item.video_url ? 'video' : 'img',
        isAd: true
      }
      // return item.tid;
    })
    state.imgData = {
      imgData: newImgData, // 图片片数据
      likeList: data.likeList, // 点赞数据
      videoData: newVideoData, // 视频数据
      getLimitdyn: data.getLimitdyn, // 限时动态数据
      adList: adData

    }
  },
  // 更新首页imgdata的内容，但是不需要重新请求所有接口
  UPDATE_IMG_DATA (state, data) {
    state.imgData = data
  },
  // 获取点赞列表的值
  SET_LIKE_LIST (state, data) {
    state.likeList = data
  },
  // 收藏的贴文数据
  SET_COLLECT_LIST (state, data) {
    state.collectList = data
  },
  SET_IMGFAILINDEX (state, val) {
    state.imgFailIndex.push(val)
  },
  SET_SHOWIMGS (state, val) {
    state.showImgs = val.img
    state.loadings = val.loading
  },
  SET_POSTREQUESTDATA (state, val) {
    state.postRequestData = val
    state.imgfiles = val.photo
  },
  SET_IMGFILE (state, val) {
    state.imgfiles = val
  },
  SET_TASKID (state, val) {
    state.taskId.push(val)
  },
  SET_POSTINFO (state, val) {
    state.postInfo = val
  },
  SET_ISUPLOADED (state, val) {
    state.uploadedInfo.push(val)
  },
  RESETData (state) {
    state.imgfiles = []
    state.taskId = []
    state.uploadedInfo = []
    state.waterimg = []
    state.showImgs = []
    state.loadings = [false]
  },
  RESE_UPLOAD (state) {
    state.uploadedInfo = []
  },
  RESET_IMGFAIL (state) {
    state.imgFailIndex = []
    state.taskId = []
  },
  RESET_POSTDATA (state) {
    console.log('==================进入函数')

    state.showImgs = []
    state.uploadedInfo = []
    state.imgfiles = []
    state.imgData = []
    state.postRequestData = {
      title: '',
      content: '',
      option1: { val: 158 },
      option2: { val: 6563 },
      photo: []
    }
  },
  GET_COMMENT_DETAILS (state, data) {
    state.get_comment_details = data.data
  },
  SET_HOME_VIDEO_LIST (state, data) {
    state.homeVideoList = data.models
    const newData = {}
    data.models.map(item => {
      newData[item.tid] = {
        ...item,
        showComment: false,
        commentItems: [], // 评论的东西
        comm_content: ''
      }
      return item.tid
    })
    state.homeVideoList = newData
  }
}
export default mutations
