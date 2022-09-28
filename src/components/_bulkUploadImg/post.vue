<template lang="pug">
  .postbg.h-100(
    ref="ss"
    v-loading.fullscreen.lock="loading"
    element-loading-text="请耐心等候"
    )
    .topview
      Photo(@getPhoto="getPhoto")
    .noticeview.align-items-center.d-flex.justify-content-around
    .optionview.align-items-center.d-flex.justify-content-around
    .flex-center.px-3
      .vip_area(v-if="checkShowVip")
        i.ic_vip
        .vip_select_box
          .vip_unlock.vip(v-for="item,index in model_combo" :key="index" @click="changeCombo(index)") {{setComboName(item.level)}}
            span.vip_select(:class="level == item.level ? 'active': null")
      .money_area
        i.ic_money
        input(type="numberi" v-model="cose")
      .position_area
        i.ic_position
        .position_name 東京都
      .text_area.content
        textarea(placeholder="内容" type="textarea" :disableClear="true" v-model= "requestData.content" @blur="contentblur")
    .submit.flex-center(:style="{color: checkCanPostData ? 'white' : '#c1c1c1', background: checkCanPostData? 'linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%)' : '#eaeaea'}" @click="postDataAct") {{$t('lang.release')}}
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import { Picker, Popup, Button, Field, MessageBox, Toast } from 'mint-ui'
import Photo from './Photo'
import Base64Binary from '@/utils/base64-binary'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
export default {
  // layout: 'postInfo',
  name: 'BulkUploadImg',
  components: {
    Photo
  },
  props: {
    tipsType: {
      type: String
    },
    postType: {
      type: Number
    }
  },
  data () {
    return {
      outerVisible: false,
      outerVisible2: false,
      option: 0,
      loading: false,
      level: null,
      cose: null, // 打赏
      requestData: {
        title: '',
        content: '',
        option1: { val: 158 }, // 选择版块
        option2: { val: 6563 }, // 选择主题 免费贴文6563 套餐贴文6566 单价贴文6569
        photo: [],
        postType: this.postType, // 1为普通 2为限时
        latitude: 14.5553641, // 纬度
        longitude: 120.9789139, // 经度
        cities_id: 83375,
        toAtUids: [],
        tagHashIds: []
      }
    }
  },
  computed: {
    fid () {
      return +this.$route.query.fid
    },
    ...mapState({
      postInfo: ({ post }) => post.postInfo, // 文章信息
      uploadedInfo: ({ post }) => post.uploadedInfo, // 上传信息
      postRequestData: ({ post }) => post.postRequestData, // 初始化数据
      imgFailIndex: ({ post }) => post.imgFailIndex, // 上传图片失败的index
      model_combo: ({ user }) => user.model_combo // 模特解锁套餐
    }),
    ...mapGetters([
      'user_type'// 用户类型
    ]),
    // 检测是否要显示vip
    checkShowVip () {
      const { user_type, model_combo, tipsType } = this
      if (user_type == 2 && model_combo.length > 0 && tipsType == 'sticker') {
        return true
      } else {
        return false
      }
    },
    // 提交按钮内容校验
    checkCanPostData () {
      const photoBool = this.requestData.photo.length > 0
      const contentBool = this.requestData.content.length > 2
      if (
        !contentBool
      ) {
        Toast({
          message: '请输入内容'
        })
        return false
      }
      if (!photoBool) {
        Toast({
          message: '请添加图片'
        })
        return false
      }
      return true
    }
  },
  watch: {

    async imgFailIndex (datas) {
      if (datas.length > 0) {
        console.log(imgFailIndex)
        await this.sendAPI()
      }
    },
    async uploadedInfo (files) {
      console.log(files)
      await this.sendAPI()
    }
  },
  mounted () {
    this.requestData.postType = this.postType
  },
  async created () {
    const title = ['分享视频', '分享图片', '分享楼凤', '分享话题', '分享彩经']
    const { role } = this.$route.query
    await this.$store.dispatch('getPostInfo')
    await this.$store.dispatch('infoheader/setTitle', title[role - 1])
  },
  beforeDestroy () {
    // this.$store.dispatch('resetPostRequestData')

  },
  destroyed () {
    // this.$store.dispatch('resetPostRequestData')
  },
  methods: {
    // 设置vip的名称
    setComboName (id) {
      let string = ''
      for (var i = 1; i <= parseInt(id); i++) {
        string += 'v'
      }
      string += 'ip'
      return string
    },
    // 改变套餐设置
    changeCombo (index) {
      const { requestData, model_combo } = this
      this.level = model_combo[index].level
    },
    // DataInit
    dataInit () {
      this.outerVisible2 = false,
      this.outerVisible = false,
      this.option = 0,
      this.loading = false,
      this.requestData = {
        title: '',
        content: '',
        option1: { val: 158 }, // 选择版块
        option2: { val: 6563 }, // 选择主题 免费贴文6563 套餐贴文6566 单价贴文6569
        photo: [],
        level: 1,
        postType: 1, // 1为普通 2为限时
        cose: null,
        latitude: 14.5553641,
        longitude: 120.9789139,
        cities_id: 83375,
        toAtUids: [],
        tagHashIds: []
      }
      this.$store.dispatch('setPostRequestData', this.requestData)
    },
    // 图片上传情况  watch处使用较多
    async sendAPI () {
      const { requestData, requestData: { photo }, uploadedInfo, imgFailIndex, level, cose } = this
      if (photo.length == (uploadedInfo.length + imgFailIndex.length)) {
        console.log('photo的长度')
        console.log(requestData)
        console.log(uploadedInfo)
        console.log(imgFailIndex)
        const postData = {
          fid: parseInt(requestData.option1.val), // 默认158,
          typeid: parseInt(requestData.option2.val), //
          subject: requestData.content.length > 20 ? requestData.content.substring(1, 20) : requestData.content,
          message: requestData.content,
          images: uploadedInfo,
          level: level || 0,
          postType: requestData.postType, // 1为普通 2为限时
          cose: cose || 0,
          latitude: requestData.latitude,
          longitude: requestData.longitude,
          cities_id: requestData.cities_id,
          toAtUids: requestData.toAtUids,
          tagHashIds: requestData.tagHashIds
        }
        console.log(postData)
        // 提示窗
        // 需限制三张以上照片 如有上传失败一张并三张成功 提示窗(直接发帖/重新上传)
        // 需限制三张以上照片 如有上传失败一张并没有三张成功 提示窗(取消发帖/重新上传)
        // 没有限制三张以上照片 如有上传失败 提示窗(直接发帖/重新上传)
        if (this.getUploadImgFailCount() > 0) {
          // if (this.showImgNotice) {
          if (this.uploadedInfo.length >= 3) {
            MessageBox({
              title: this.getUploadImgFailCount() + '张图片上传失败',
              message: '是否重新上传失败图片或略过直接发帖',
              showCancelButton: true,
              closeonClickModal: false,
              confirmButtonText: '重新上传',
              cancelButtonText: '直接发帖',
              confirmButtonClass: 'msgcb',
              cancelButtonClass: 'msgcb'
            }).then(async (action) => {
              if (action === 'cancel') {
                const isSuc = await this.sendApiWithImg(postData)
                if (isSuc) {
                  Toast({
                    message: this.$t('lang.Post_success'),
                    iconClass: 'icon icon-success'
                  })
                  this.$router.push({ name: 'home' })
                }
              } else {
                this.reSendImg(this.imgFailIndex)
              }
            })
          } else {
            MessageBox({
              title: this.getUploadImgFailCount() + '张图片上传失败',
              message: '是否重新上传',
              showCancelButton: true,
              closeonClickModal: false,
              confirmButtonText: '重新上传',
              cancelButtonText: '取消发帖',
              confirmButtonClass: 'msgcb',
              cancelButtonClass: 'msgcb'
            }).then((action) => {
              if (action === 'cancel') {
              } else {
                this.reSendImg(this.imgFailIndex)
              }
            })
          }
          // } else {
          //   MessageBox({
          //     title: this.getUploadImgFailCount() + '张图片上传失败',
          //     message: '是否重新上传失败图片或略过直接发帖',
          //     showCancelButton: true,
          //     closeonClickModal: false,
          //     confirmButtonText: '重新上传',
          //     cancelButtonText: '直接发帖',
          //     confirmButtonClass: 'msgcb',
          //     cancelButtonClass: 'msgcb'
          //   }).then(async (action) => {
          //     if (action === 'cancel') {
          //       const isSuc = await this.sendApiWithImg(postData)
          //       if (isSuc) {
          //         this.$toast.center(this.$t('lang.Post_success'))
          //         this.$router.push({ name: 'mypost' })
          //       }
          //     } else {
          //       this.reSendImg(this.imgFailIndex)
          //     }
          //   })
          // }
        } else if (this.checkCanPostData) {
          console.log('======================进入到上传api')
          const isSuc = await this.sendApiWithImg(postData)
          console.log(isSuc)
          if (isSuc.status == 200) {
            console.log(isSuc)
            setTimeout(() => {
            //   this.$store.dispatch("clearCatch", { name: "img" }).then((res)=>{
              Toast({
                message: this.$t('lang.Post_success'),
                iconClass: 'icon icon-success'
              })
              this.$router.push({ name: 'home' })
              //   }).catch((err)=>{

            //   });
            }, 3500)
          } else {
            Toast({
              message: `${isSuc.message}`
            })
            this.loading = false
          }
        }
      }
    },
    // 上传文章
    async sendApiWithImg (postData) {
      if (postData.images.length > 0) {
        return await this.$store.dispatch('sendHasPicAPI', postData)
      } else {
        return await this.$store.dispatch('sendNotHasPicAPI', postData)
      }
    },

    // 重新上传上传失败的图片
    reSendImg (datas) {
      this.loading = true
      this.resetImgFail()
      datas.forEach(async (val, index) => {
        await this.$store.dispatch('PostUseWebSocket', {
          data: val,
          position: index
        })
      })
    },
    // submit
    async postDataAct () {
      if (this.checkCanPostData) {
        this.$store.dispatch('resetImgFail')
        // this.resetImgFail()
        this.loading = true
        if (this.requestData.photo.length > 0) {
          console.log('=====================进入')
          this.$store.dispatch('resetUpload')
          // this.resetUpload()
          this.requestData.photo.forEach((val, index) => {
            const _this = this
            const length = val.size
            const comFileReader = new FileReader()
            comFileReader.readAsDataURL(val)
            comFileReader.onloadend = function () {
              console.log('this.result')
              console.log(this.result)
              const result = this.result
              const nimg = new Image()
              nimg.src = result

              nimg.onload = async function () {
                const compressBase64 = await _this.$store.dispatch('compress', {
                  img: nimg,
                  size: length,
                  watermark: _this.requestData.option1
                })

                const base64 = compressBase64.split(',')
                const uintArray = Base64Binary.Base64Binary.decodeArrayBuffer(
                  base64[base64.length - 1]
                )
                console.log(uintArray)
                await _this.$store.dispatch('postUseWebSocket', {
                  data: uintArray,
                  position: index
                })
              }
            }
          })
        } else {
          const postData = {
            fid: parseInt(this.requestData.option1.val),
            typeid: parseInt(this.requestData.option2.val),
            subject: this.requestData.title,
            message: this.requestData.content
          }
          const isSuc = await this.$store.dispatch('sendNotHasPicAPI', postData)
          this.loading = false
          if (isSuc) {
            Toast({
              message: this.$t('lang.Post_success'),
              iconClass: 'icon icon-success'
            })
            this.$router.push({ name: 'home' })
          }
        }
      }
    },
    // 内容狂校验
    contentblur () {
      if (this.requestData.content.length > 1000) {
        Toast({
          message: '内文超过字数限制',
          position: 'center'
        })
        // this.$toast.center('内文超过字数限制')
        this.requestData.content = this.requestData.content.slice(0, 1000)
      }
    },
    getPhoto (value) {
      this.requestData.photo = value

      this.$store.dispatch('setImgFiles', value)
      // this.setImgFiles(value)
    },

    getUploadImgFailCount () {
      let count = 0
      this.imgFailIndex.forEach((val) => {
        if (val) {
          count = count + 1
        }
      })
      return count
    }

  }
}
</script>

<style lang="scss" scoped>
.postbg {
  position: relative;
  font-family: PingFangTC;
  .topview {
    margin: 15px;
  }

  .noticeview {
    font-family: PingFangTC;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #9a9a9a;
    margin-bottom: 18px;
    .icon {
      width: 15px;
      height: 15px;
      margin-left: 5px;
    }
  }
  .optionview {
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #2c2c2c;
    background-color: #f6f6f6;
    margin-bottom: 15px;
    img {
      margin-left: 5px;
    }
  }
  .buttonview {
    position: absolute;
    height: 45px;
    border-radius: 5px;
    left: 15px;
    right: 15px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
  }
  .unselected {
    color: #c1c1c1;
    background-color: #eaeaea;
  }
  .selected {
    color: white;
    background-color: #f85959;
  }
}

::v-deep {
  .picker {
    width: 100%;
  }
  .mint-popup {
    width: 100%;
  }
  .picker-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 22px;
    font-family: PingFangTC;
    font-size: 16.6px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #007aff;
    background-color: #fafaf8;
    border: 1px solid #e1e0e0;
  }
  .mint-cell-wrapper {
    background-image: unset;
    background-size: unset;
    background-repeat: unset;
    background-position: unset;
    background-origin: unset;
  }
  .mint-field {
    width: 100%;
    height: 100%;
  }
  .mint-cell-wrapper {
    height: 100%;
  }
  .mint-cell-value {
    height: 100%;
  }
  .mint-field-core {
    height: 100%;
  }
}

///////
.money_area,
.vip_area,
.position_area {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10%;
  margin-bottom: 15px;
}
.vip_area {

  .vip_select_box {
    flex: 1;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    white-space: nowrap;
    text-align: left;
    > div {
      display: inline-block;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.money_area {
  input {
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    background-color: #ffffff;
    padding-left: 1.3333333333333vw;
    border-radius: 1.0666666666667vw;
    border: solid 1px #cccccc;
    color: #82b1fd;
    margin-left: 10px;
  }
}
.position_area {
  .position_name {
    line-height: 30px;
    margin-left: 10px;
  }
}
i {
  width: 30px;
  height: 30px;
  &.ic_vip {
    background: url("~@/assets/release/ic-vip.png") no-repeat center;
    background-size: 39px auto;
  }
  &.ic_money {
    background: url("~@/assets/release/ic-money.png") no-repeat center;
     background-size: 39px auto;
  }
  &.ic_position {
    background: url("~@/assets/release/ic-location.png") no-repeat center;
    background-size: 39px auto;
  }
}
.vip_select {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("~@/assets/release/ic-Radio-2.png") no-repeat center;
  margin-left: 5px;
  vertical-align: middle;
  background-size: 100%;
  &.active {
    background-image: url("~@/assets/release/ic-Radio.png");
  }
}
.text_area {
  &.content {
    textarea {
      width: 90%;
      height: 80px;
      line-height: 20px;
      display: block;
      background-color: #ffffff;
      padding:10px;
      border-radius: 2.1333333333333vw;
      border: solid 1px #cccccc;
      box-sizing: border-box;
      outline-color: #f46fe0;
      margin: 0 auto 25px;
    }

  }
}
.submit {
  width: 90%;
  height: 40px;
  line-height: 40px;
  display: block;
  margin: 10px auto 0;
  //background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
  border-radius: 8px;
  color: #333;
}

</style>
