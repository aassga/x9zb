<template>
  <div class="registerModel_context">
    <MainHeader back noNeedMenu></MainHeader>
    <img class="context_banner" src="@/assets/my/img-banner@3x.png" alt srcset v-if="$t('lang.lang')=='繁'"/>
    <img class="context_banner" src="@/assets/my/img-banner@3x_cn.png" alt srcset v-if="$t('lang.lang')=='简'"/>
    <img class="context_banner" src="@/assets/my/img-banner@3x_en.png" alt srcset v-if="$t('lang.lang')=='EN'"/>
    <div class="context_box">
      <div class="context_box_title">
        <img
          class="context_box_title_icon"
          src="@/assets/my/fi-rr-envfi-rr-userelope@3x.png"
          alt
          srcset
        />
        <div class="context_box_title_text">{{$t('lang.personal_info')}}</div>
      </div>
      <CommonInput
        @change="(value)=>{this.user_info.realname = value}"
        class="context_box_input"
        :value="user_info.realname"
        :placeholder="$t('lang.real_name')"
      ></CommonInput>
      <div class="context_box_i">
        <div class="context_box_i_title">{{$t('lang.gender')}}：</div>
        <div class="context_box_i_box">
          <div v-for="(item,index) in list" :key="index" class="context_box_i_box_i">
            <div class="context_box_i_box_i_text">{{item.name}}</div>
            <img
              @click="onHandleActive(index)"
              :src="item.active ? require('@/assets/my/ic-Radio-selected@3x.png') : require('@/assets/my/ic-Radio-default@3x.png')"
              class="context_box_i_box_i_icon"
            />
          </div>
        </div>
      </div>
      <CommonInput
        @click-tap="openDatePopup()"
        disabled
        class="context_box_input"
        :value="user_info.birthday"
        :placeholder="$t('lang.date_of_birth')"
      ></CommonInput>
      <div class="context_box_input_contry">
        <CommonInput
          @click-tap="openAdressPopup()"
          disabled
          class="context_box_input_l"
          :value="contry"
          :placeholder="$t('lang.country')"
        ></CommonInput>
        <CommonInput
          @change="(value)=>{this.adress = value}"
          class="context_box_input_r"
          :value="adress"
          :placeholder="$t('lang.detail_address')"
        ></CommonInput>
      </div>

      <!-- <div class="context_box_title">
        <img class="context_box_title_icon" src="@/assets/my/fi-rr-credit-card@3x.png" alt srcset />
        <div class="context_box_title_text">收款帳戶</div>
      </div>-->
      <!-- <CommonInput class="context_box_input" :value="user_info.bank_name" placeholder="銀行名稱"></CommonInput>
      <CommonInput class="context_box_input" :value="user_info.bank_account" placeholder="銀行卡號"></CommonInput>
      <div class="context_box_input_tip">※請確認帳號無誤，否則將無法正常入帳</div>-->
      <div style="padding-bottom:15px;" class="context_box_title">
        <img class="context_box_title_icon" src="@/assets/my/fi-rr-diploma@3x.png" alt srcset />
        <div style="margin-left:5px;" class="context_box_title_text">{{$t('lang.audit_info')}}</div>
      </div>
    </div>
    <!-- 身份证上传组件 -->
    <el-upload
      ref="upload"
      id="upload"
      key="2"
      action
      :auto-upload="false"
      :show-file-list="false"
      :on-change="previewImg"
      :before-upload="onHandleBeforeUpload"
    >
      <div class="context_box_img">
        <img class="context_box_img_up" :src="bgImgSrc ? bgImgSrc : bgImgNomrlSrc" alt srcset />
        <div class="context_box_img_select">
          {{$t('lang.select_file')}}
          <div class="context_box_img_select_icon el-icon-arrow-right"></div>
        </div>
        <div class="context_box_img_tip">{{$t('lang.take_phone_info')}}</div>
        <!-- <UpLoadImg></UpLoadImg> -->
      </div>
    </el-upload>
    <!-- <input value="文件上传" @change="previewImg" type="file" name="file" id /> -->
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false" />
    <el-button :loading="loading" @click="onHandleBecomeModel" class="context_box_btn">{{$t('lang.became_model')}}</el-button>

    <!-- 时间上推框 -->
    <DatePopup :show="showDatePopup" @close="closeDatePopup" @confirm="onHandleDatePopup"></DatePopup>

    <!-- 地址上推框 -->
    <AdressPopup
      :list="cityNameList"
      :show="showAdressPopup"
      @close="closeAdressPopup"
      @confirm="onHandleAdressPopup"
    ></AdressPopup>
  </div>
</template>

<script>
import MainHeader from '@/components/header/MainHeader.vue'
import CommonInput from '@/components/my/CommonInput.vue'
import DatePopup from '@/components/popup/DatePopup.vue'
import NotEnable from '@/components/header/NotEnable.vue'
import AdressPopup from '@/components/popup/AdressPopup.vue'
// 引入图片上传组件
import UpLoadImg from '@/views/uploadImage/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'registermodel',
  components: {
    NotEnable,
    MainHeader,
    DatePopup,
    AdressPopup,
    CommonInput,
    UpLoadImg
  },

  // user_info
  data () {
    return {
      isShowEnable: false,
      list: [
        {
          active: false,
          value: 1,
          name: this.$t('lang.male')
        },
        {
          active: true,
          value: 2,
          name: this.$t('lang.female')
        }
      ],
      user_info: {
        modeldata: [
          {
            name: '',
            size: 0
          }
        ],
        realname: '',
        sex: 2,
        birthday: '',
        contry: 0
      },
      bgImgSrc: '',
      bgImgNomrlSrc: require('@/assets/my/img-@3x.png'),
      contry: '',
      adress: '', // 详细地址
      showDatePopup: false,
      showAdressPopup: false,
      cityList: [],
      cityNameList: [],
      loading: false // 按钮的加载状态
    }
  },
  computed: {
    ...mapState({
      newImage: state => state.base.fileimage, // 上传返回的图片名
      newSize: state => state.base.filesize // 上传返回的图片大小
    })
  },
  watch: {
    newImage (newV, oldV) {
      console.log(newV)
      this.loading = false
      this.user_info.modeldata[0].name = newV
    },
    newSize (newV, oldV) {
      console.log(newV)
      this.user_info.modeldata[0].size = newV
    }
  },
  created () {
    // 获取国家ID列表
    this.getCountryList()
    this.$store.commit('SET_CURRENT_ROUTE_NAME', 'RegisterModel')
  },

  mounted () {},

  methods: {
    // 文件上传change事件
    onHandleFileChange (e) {
      console.log('filechange')
      console.log(e.target.files[0])
    },
    // 添加相册图片或者封面图片
    previewImg ({ raw }) {
      const _this = this
      this.loading = true
      // let raw = $e.target.files[0];
      console.log(raw)

      const isLt8M = raw.size / 1024 / 1024 < 8
      if (!isLt8M) {
        this.$message.error('上传图片大小不能超过 8MB!')
        return
      }

      const url = URL.createObjectURL(raw)

      this.bgImgSrc = url
      console.log(url)
      // console.log(blob);
      const comFileReader = new FileReader()
      comFileReader.readAsDataURL(raw)
      // comFileReader.readAsArrayBuffer(blob);
      comFileReader.onloadend = function (event) {
        console.log('event')
        console.log(event)
        _this.$store.dispatch('setUploadPic', {
          img: raw,
          preview: event.target.result,
          name: raw.name,
          type: raw.type,
          size: raw.size
        })
        _this.imageChangeBlob(raw)
        // console.log(blob)
        setTimeout(() => {
          const oFileReader = new FileReader()
          console.log(_this.blob)
          oFileReader.readAsArrayBuffer(_this.blob)
          oFileReader.onloadend = async function (e) {
            console.log(e.target)
            await _this.$store.dispatch('useWebSocket', e.target)
          }
        }, 2000)

        // await _this.$store.dispatch("useWebSocket", event.target);
      }
      // console.log(url.result);
    },
    // 文件上传之前的事件
    onHandleBeforeUpload (file) {
      const isLt8M = file.size / 1024 / 1024 < 8
      if (!isLt8M) {
        this.$message.error('上传头像图片大小不能超过 8MB!')
      }
      return isLt8M
    },
    // 图片转blob
    imageChangeBlob (file) {
      const _this = this
      var baseData
      // var blob = null;
      // file-->base64
      var reader = new FileReader()
      reader.readAsDataURL(file)
      // console.log('111111111')
      reader.onload = function () {
        baseData = reader.result
        //  console.log(baseData)
        // base64-->blob
        var byteString
        if (baseData.split(',')[0].indexOf('base64') >= 0) { byteString = atob(baseData.split(',')[1]) }
        // base64 解码
        else {
          byteString = unescape(baseData.split(',')[1])
        }
        var mimeString = baseData
          .split(',')[0]
          .split(':')[1]
          .split(';')[0] // mime类型 -- image/png
        var ia = new Uint8Array(byteString.length) // 创建视图
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        var blob = new Blob([ia], { type: 'image/png' })
        blob.lastModifiedDate = new Date()
        //  var wj = new FormData();
        //  wj.append("file",blob,blob.name)
        //  console.log(wj)
        console.log(blob)
        //  return blob;
        _this.blob = blob
      }
      // console.log(blob)
      // return blob;
    },
    showNotEnable () {
      this.isShowEnable = true
    },
    //  "modeldata": id.png,
    //     "relname": 真实姓名,
    //     "sex": 1, 1 男 2女
    //     "birthady": 2022/11/30, 生日
    //     "contry": 0,

    // 成为模特
    onHandleBecomeModel () {
      const _this = this
      const user_info = JSON.parse(JSON.stringify(this.user_info))
      user_info.contry = user_info.contry + '|' + this.adress
      // console.log(this.$store)
      this.$store.dispatch('useModel', { ...user_info }).then(res => {
        // console.log(res)
        if (res.status == 200) {
          // 改变状态为模特
          // _this.$store.commit("SET_USER_TYPE", 2);
          // 返回上一页
          _this.$router.go(-1)
          _this.$message({
            type: 'success',
            message: '资料已提交，请等待审批通过~'
          })
        }
      })
    },
    // 男女切换事件
    onHandleActive (index) {
      const list = JSON.parse(JSON.stringify(this.list))
      list.forEach((element, idx) => {
        if (index == idx) {
          element.active = true
        } else {
          element.active = false
        }
      })
      this.user_info.sex = list[index].value
      this.list = list
    },
    // 时间选择器的确定事件
    onHandleDatePopup (date) {
      this.user_info.birthday = this.$common.dateFormat(date)
      // console.log(this.user_info.birthday)
      this.showDatePopup = false
    },
    // 时间选择器打开事件
    openDatePopup () {
      this.showDatePopup = true
    },
    // 时间选择器的关闭事件
    closeDatePopup () {
      this.showDatePopup = false
    },
    // 地址选择器的确定事件
    onHandleAdressPopup (name) {
      let id = 0
      const _this = this
      _this.cityList.forEach((ele, index, array) => {
        if (ele.name == name) {
          id = ele.id
        }
      })
      // console.log(name)
      // console.log(id)
      this.contry = name
      this.user_info.contry = id
      this.showAdressPopup = false
    },
    // 地址选择器打开事件
    openAdressPopup () {
      this.showAdressPopup = true
      // console.log(this.showAdressPopup)
    },
    // 地址选择器的关闭事件
    closeAdressPopup () {
      this.showAdressPopup = false
    },
    // 获取国家ID列表的方法
    getCountryList () {
      const _this = this
      // console.log(this.$store)
      this.$store.dispatch('getCountryList').then(res => {
        // console.log(res)
        if (res.status == 200) {
          _this.cityList = res.data
          const arr = []
          _this.cityList.forEach((ele, index, array) => {
            arr.push(ele.name)
          })
          _this.cityNameList = arr
          // console.log(_this.cityList);
        }
      })
    },
    // 上传图片功能
    onHandleUploadImg () {
      this.$message({
        type: 'success',
        message: '暂不开放~'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.registerModel_context {
  padding-top: 44px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #f1f0ef;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  .context_banner {
    width: 100%;
    height: 142px;
  }
  .context_box {
    width: 100%;
    border-top: 1px solid #fff;
    background-color: #fff;
    padding: 0 16px;
    box-sizing: border-box;
    .context_box_title {
      margin-top: 24px;
      display: flex;
      align-items: center;
      height: 20px;
      .context_box_title_icon {
        width: 19px;
        height: 15px;
      }
      .context_box_title_text {
        height: 20px;
        font-family: PingFang TC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #5a6268;
      }
    }
    .context_box_input {
      margin-top: 12px;
    }
    .context_box_input_contry {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;
      .context_box_input_l {
        width: 87px;
        height: 40px;
      }
      .context_box_input_r {
        width: 245px;
        height: 40px;
      }
    }
    .context_box_i {
      margin-top: 12px;
      display: flex;
      height: 40px;
      width: 100%;
      align-items: center;
      .context_box_i_title {
        width: 50px;
        height: 40px;
        display: flex;
        align-items: center;
        font-family: PingFang TC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #5a6268;
      }
      .context_box_i_box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .context_box_i_box_i {
          margin-left: 10px;
          // width: 100%;
          height: 40px;
          font-weight: 600;
          // border-bottom: solid 1px #999999;
          display: flex;
          align-items: center;
          .context_box_i_box_i_text {
            font-family: SF Pro;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #6c757d;
          }
          .context_box_i_box_i_icon {
            margin-left: 10px;
            width: 25px;
            height: 25px;
          }
        }
      }
    }
    .context_box_input_tip {
      width: 100%;
      height: 20px;
      font-family: PingFang TC;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      // line-height: 20px;
      letter-spacing: 0px;
      color: #e53f4f;
      display: flex;
      align-items: center;
    }
  }
  .context_box_img {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .context_box_img_up {
      width: 290px;
      height: 298px;
    }
    .context_box_img_select {
      width: 290px;
      height: 32px;
      background-color: #6c757d;
      border-radius: 0px 0px 8px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro Text;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      .context_box_img_select_icon {
        font-size: 15px;
        color: #fff;
      }
    }
    .context_box_img_tip {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 17px;
      width: 100%;
      height: 22px;
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #23272b;
    }
  }
  .context_box_btn {
    margin: 54px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 342px;
    height: 44px;
    background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
    border-radius: 5px;
    font-family: SourceHanSansSC-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #ffffff;
  }
}
</style>
