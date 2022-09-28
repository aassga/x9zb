<template>
  <el-dialog
    :before-close="close"
    custom-class="order_model_context_big_4"
    :visible.sync="showModel"
    :title="$t('lang.details')"
  >
    <div
      v-for="(item,index) in infoList"
      :key="index"
      :class="['order_model_context', index % 2 == 0 ? 'gray' : 'white']"
    >
      <div class="order_model_context_title_box">
        <div class="order_model_context_title_box_l">
          <img
            class="order_model_context_title_icon"
            :src="getCurrentInfo(index,'icon')"
            alt
            srcset
          />
          <!-- {{ getCurrentInfo(index,'name') }} -->
          {{ item.title }}
        </div>
        <!-- <div class="order_model_context_title">
          請選擇檔期觀看不同內容
          <img
            class="order_model_context_title_icon"
            src="@/assets/my/ic-msg@3x.png"
            alt
            srcset
          />
        </div>-->
        <CommonSelect
          :index="index"
          :list="[item.selectList[0]]"
          @onHandleClickItem="onHandleClickItem"
          @open="onHandleOpenSelect"
          :open="item.open"
          title="請選擇檔期觀看不同內容"
        ></CommonSelect>
      </div>
      <div class="order_model_context_text" v-html="returnText(item,1)">
        <!-- 每月
        <span class="order_model_context_text_num">{{item.combo.chat}}</span> 則與模特私訊 -->
      </div>
      <div class="order_model_context_text" v-html="returnText(item,2)">
        <!-- 每月可瀏覽
        <span class="order_model_context_text_num">{{item.combo.photo}}</span> 張模特私密照片 -->
      </div>
      <div class="order_model_context_text" v-html="returnText(item,3)">
        <!-- 每月可瀏覽
        <span class="order_model_context_text_num">{{item.combo.video}}</span> 支模特私密視頻 -->
      </div>
      <div class="order_model_context_text" v-html="returnText(item,4)">
        <!-- 私密照片只會獨家發送在
        <span class="order_model_context_text_num">YOLOSHOW</span> -->
      </div>
    </div>
  </el-dialog>
</template>

<script>
import CommonSelect from '@/components/my/CommonSelect.vue'

export default {
  name: 'WebFeXcPriceTranslateModel',
  props: {
    showModel: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    }
  },
  components: {
    CommonSelect
  },
  data () {
    return {
      infoList: [],
      infoAllList: [],
      selectValue: '',
      showSelect: false
    }
  },
  watch: {
    list (newV, oldV) {
      this.getList()
    }
  },
  created () {
    //  this.getList();
  },

  mounted () {},

  methods: {
    // 将原始数据重排
    getList () {
      console.log('原始数据')
      console.log(this.list)
      const arr = JSON.parse(JSON.stringify(this.list))
      const selectList = []
      for (let index = 0; index < arr.length; index++) {
        const str =
          arr[index].starttime.split(' ')[0] +
          '~' +
          arr[index].endtime.split(' ')[0]
        selectList.unshift(str)
      }

      const list = []
      arr.forEach((ele, idx) => {
        const obj = {
          ...ele,
          open: false,
          active: 0,
          selectList
        }

        list.push(obj)
      })
      console.log(list)

      this.infoAllList = list
      if (list.length > 0) {
        this.infoList = [list[0]]
      }
    },
    close () {
      this.$emit('close')
    },
    // 获取当前模特层级的icon和name
    getCurrentInfo (index, key) {
      const num = index + 1
      let res = ''
      let str = 'IP'
      for (let index = 0; index < num; index++) {
        str = 'V' + str
      }
      if (key == 'name') {
        res = str
      } else if (key == 'icon') {
        res =
          index == 0
            ? require('@/assets/my/ic-king@3x.png')
            : require('@/assets/my/ic-VVIP.png')
      }
      return res
    },
    // 关闭或者开启下拉框
    onHandleOpenSelect (value, index) {
      this.infoList[index].open = !this.infoList[index].open
    },
    // 选择某个子项的事件
    onHandleClickItem (item, index) {
      this.infoList[index].active = index
    },
    returnText (item, f) {
      if (f == 1) {
        return this.$t('lang.package_rules1').replace(/{%}/, `<span class="order_model_context_text_num">${item.combo.chat}</span>`)
      }
      if (f == 2) {
        return this.$t('lang.package_rules2').replace(/{%}/, `<span class="order_model_context_text_num">${item.combo.photo}</span>`)
      }
      if (f == 3) {
        return this.$t('lang.package_rules3').replace(/{%}/, `<span class="order_model_context_text_num">${item.combo.video}</span>`)
      }
      if (f == 4) {
        return this.$t('lang.package_rules4').replace(/YOLOSHOW/, `<span class="order_model_context_text_num">${'YOLOSHOW'}</span>`)
      }
    }
  }
}
</script>

<style lang="scss">
// 编辑弹框的样式
.order_model_context_big_4 {
  width: 344px !important;
  // min-height: 450px;
  padding-bottom: 30px;
  max-height: 100%;
  height: auto;
  border-radius: 6px;
  background-color: #f5f4f4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0 !important;

  .el-dialog__body {
    padding: 0;
  }
  .order_model_context {
    position: relative;
    width: 100%;
    // height: 203px;
    .order_model_context_title_box {
      margin-bottom: 20px;
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 22px;
      box-sizing: border-box;
      .order_model_context_title_box_l {
        display: flex;
        align-items: center;
      }
      .order_model_context_title_icon {
        width: 22px;
        height: 23px;
        margin-right: 4px;
      }
      .order_model_context_title {
        width: 208px;
        height: 30px;
        background-color: #82b1fd;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
        box-sizing: border-box;
        font-family: SF Pro Text;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .order_model_context_text {
      padding: 0 22px;
      box-sizing: border-box;
      // display: flex;
      // align-items: center;
      text-align: left;
      width: 100%;
      height: 24px;
      font-family: SF Pro;
      font-size: 12px;
      letter-spacing: 0px;
      color: #343a40;
      .order_model_context_text_num {
        color: #f46fe0;
        font-weight: 400;
        margin: 0 4px;
      }
    }
  }
}
</style>
