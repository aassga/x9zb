<template>
  <!-- 编辑个人资料弹框 -->
  <el-dialog
    :before-close="onHandleEdit"
    custom-class="edit_model_context_big"
    :visible.sync="showEditModel"
    :title="$t('lang.set_profile')"
  >
    <!-- :append-to-body="true"
    :modal-append-to-body="false"-->
    <div class="edit_model_context">
      <!-- <div class="edit_model_context_title">個人資料設置</div> -->
      <div class="edit_model_context_box">
        <div class="edit_model_context_camera">
          <!-- <el-upload
            class="d-inline-block"
            ref="upload"
            id="upload"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="preview"
          > -->
            <el-image class="edit_model_context_camera_img" fit="cover" :src="edit_info.avatar">
              <div slot="error">
                <img
                  class="edit_model_context_camera_img"
                  src="@/assets/my/img-user.jpg"
                  alt
                  srcset
                />
              </div>
            </el-image>
          <!-- </el-upload> `` -->
          <UpLoadImg></UpLoadImg>
        </div>
        <div class="edit_model_context_box_text">
          {{$t('lang.click_profile_pic')}}
          <UpLoadImg></UpLoadImg>
        </div>
      </div>

      <div style="margin-top:5px;" class="edit_model_context_i">
        <div class="edit_model_context_i_title">{{$t('lang.nick_name')}}</div>
        <input
          type="text"
          :placeholder="$t('lang.add_comment')"
          class="edit_model_context_i_name"
          v-model="edit_info.nick"
        />
        <div class="edit_model_context_i_icon el-icon-arrow-right"></div>
      </div>
      <!-- <div class="edit_model_context_i">
        <div class="edit_model_context_i_title">帳號</div>
        <input
          type="text"
          placeholder="请输入内容"
          class="edit_model_context_i_name"
          v-model="edit_info.username"
        />
      </div>-->
      <div class="edit_model_context_i">
        <div class="edit_model_context_i_title">{{$t('lang.personal_introduce')}}</div>
        <input
          type="text"
          :placeholder="$t('lang.add_comment')"
          maxlength="250"
          class="edit_model_context_i_name"
          v-model="edit_info.sign"
        />
        <div class="edit_model_context_i_icon el-icon-arrow-right"></div>
      </div>
      <div class="edit_model_context_i">
        <div class="edit_model_context_i_title">{{$t('lang.birthday')}}</div>
        <div @click="openDate" class="edit_model_context_i_name">{{edit_info.birthday || $t('lang.unknown')}}</div>
        <div class="edit_model_context_i_icon el-icon-arrow-right"></div>
      </div>
      <!-- <div class="edit_model_context_i">
        <div class="edit_model_context_i_title">{{$t('lang.location')}}</div>
        <div class="edit_model_context_i_name">{{edit_info.address || $t('lang.unknown')}}</div>
      </div> -->
      <!-- <div style="margin-top:5px;" class="edit_model_context_i">
        <div class="edit_model_context_i_title">Instagram</div>
        <div class="edit_model_context_i_name">{{'ki8954093ki' || '无'}}</div>
        <div class="edit_model_context_i_icon el-icon-arrow-right"></div>
      </div>
      <div class="edit_model_context_i">
        <div class="edit_model_context_i_title">Twitter</div>
        <div class="edit_model_context_i_name">{{'ki8954093ki' || '无'}}</div>
        <div class="edit_model_context_i_icon el-icon-arrow-right"></div>
      </div>
      <div class="edit_model_context_i">
        <div class="edit_model_context_i_title">Facebook</div>
        <div class="edit_model_context_i_name">{{'ki8954093ki' || '无'}}</div>
        <div class="edit_model_context_i_icon el-icon-arrow-right"></div>
      </div>-->
      <div v-no-more-click @click="submit" class="order_model_btn">{{$t('lang.set_up')}}</div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
// 引入图片上传组件
import UpLoadImg from '@/views/uploadImage/index.vue'
export default {
  name: 'WebFeXcEditmodel',
  components: {
    UpLoadImg
  },
  props: {
    user_info: {
      type: Object,
      default: {}
    },
    showEditModel: {
      type: Boolean,
      default: false
    },
    birthday: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      edit_info: {}
    }
  },
  watch: {
    user_info (newV, oldV) {
      this.edit_info = { ...this.edit_info, ...newV }
    },
    // 每次页面重新打开的时候，重置值
    showEditModel (newV, oldV) {
      this.edit_info = { ...this.edit_info, ...this.user_info }
    },
    // 时间选择器的生日数据改变，响应到组件内的参数
    birthday (newV, oldV) {
      this.edit_info.birthday = newV
    }
    // 每次上传图片之后返回的ID
    // newImage(newV, oldV) {
    //   console.l
    //   this.edit_info.birthday = newV;
    // },
  },
  computed: {
    ...mapState({
      newImage: state => state.base.fileimage
    })
  },
  mounted () {},

  methods: {
    // 弹框的关闭事件
    onHandleEdit () {
      this.$emit('close')
    },
    // 打开时间上推框弹框
    openDate () {
      console.log('edit打开')
      this.$emit('openDate')
    },
    // 图片上传事件的回传
    preview ({ raw }) {
      const _this = this
      console.log(raw)
      const url = URL.createObjectURL(raw)
      // this.imgUrl.push(url)
      // this.imgData.push(raw)
      console.log(raw)
      console.log(url)

      this.edit_info.avatar = url
      const oFileReader = new FileReader()
      const picname = raw.name
      const pictype = raw.type
      oFileReader.readAsDataURL(raw)

      //   oFileReader.readAsArrayBuffer(raw)
      oFileReader.onload = async (e) => {
        console.log(111)
        this.$store.dispatch('setUploadPic', {
          img: raw,
          preview: e.target.result,
          name: picname,
          type: pictype
        })
        await _this.$store.dispatch('useWebSocket', e.target)
      }
      // oFileReader.onloadend = async function(e) {
      // Indicator.open({
      //   text:'loading',
      //   spinnerType:'fading-circle'
      // })

      // console.log(e.target)

      // await _this.useWebSocket(e.target)
      // }
    },
    // 弹框的提交事件
    submit () {
      const user_info = this.edit_info

      const obj = {}

      for (const key in this.user_info) {
        if (
          user_info.hasOwnProperty(key) &&
          user_info[key] != this.user_info[key]
        ) {
          if (key == 'avatar') {
            console.log(this.newImage)
            obj.avatar = this.newImage
          } else {
            obj[key] = user_info[key]
          }
        }
      }

      if (obj.hasOwnProperty('introduce_self')) {
        obj.sign = obj.introduce_self
        delete obj.introduce_self
      }
      this.$emit('submit', obj, user_info)
    }
  }
}
</script>

<style lang="scss">
// 编辑弹框的样式
.edit_model_context_big {
  width: 344px !important;
  // height: 589px !important;
  height: 400px !important;
  border-radius: 6px;
  background-color: #f5f4f4;
  .el-dialog__header {
    width: 100%;
    height: 38px;
    line-height: 38px;
    .el-dialog__title {
      font-weight: 700;
    }
  }
  .el-dialog__body {
    padding: 0;
  }
  .edit_model_context {
    position: relative;
    width: 100%;
    // padding-top: 0px;
    .edit_model_context_title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFang TC;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .edit_model_context_box {
      border-top: 1px solid #fff;
      background-color: #fff;
      width: 100%;
      height: 108px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .edit_model_context_camera {
        position: relative;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        .edit_model_context_camera_img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          overflow: hidden;
        }
        .edit_model_context_camera_icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 27px;
        }
      }
      .edit_model_context_box_text {
        margin-top: 5px;
        height: 14px;
        font-family: PingFang TC;
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0px;
        color: #6c757d;
        position: relative;
      }
    }
    .edit_model_context_i {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 0 17px;
      box-sizing: border-box;
      width: 100%;
      height: 44px;
      .edit_model_context_i_title {
        width: 75px;
        height: 20px;
        font-family: PingFang TC;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0px;
        color: #f46fe0;
        display: flex;
        align-items: center;
        // justify-content: f;
        margin-right: 10px;
      }
      .edit_model_context_i_name {
        display: flex;
        height: 20px;
        font-family: PingFang TC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #343a40;
        align-items: center;
        flex: 1;
        border: none;
        outline: none;
        &:focus {
          border: none !important;
          outline: none;
        }
      }
      .edit_model_context_i_icon {
        margin-left: auto;
        color: #6c757d;
        font-size: 17px;
      }
    }
    .order_model_btn {
      margin: 24px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 286px;
      height: 35px;
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
}
</style>
