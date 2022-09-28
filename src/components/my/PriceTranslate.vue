<template>
  <div class="PriceTranslate">
    <div v-for="(items,indexs) in dataList" :key="indexs" class="PriceTranslate_i">
      <div class="PriceTranslate_i_t">
        <div class="PriceTranslate_i_title">{{items.list[items.active].title}}</div>
        <div class="PriceTranslate_i_date">
          {{$t('lang.Subscription_period')}}
          <div
            @click="onHandleSwitchUser(indexs)"
            :class="['rightMenu_context_header_user_icon el-icon-caret-right',items.open ? '' : 'rightMenu_context_header_user_icon_close']"
          ></div>
        </div>
        <!-- <CommonSelect
        class="PriceTranslate_i_date"
        :index="indexs"
        :list="items.selectList"
        @onHandleClickItem="onHandleClickItem"
        @open="onHandleSwitchUser"
        :open="items.open"
        :title="$t('lang.Subscription_period')"
        ></CommonSelect>-->
        <!-- <div class="PriceTranslate_i_amout">${{item[0].amount}}</div> -->
        <div
          @click="onHandleBuy(items,indexs)"
          :class="['PriceTranslate_i_amout',comboSubList.includes(items.list[items.active].id) ? 'buyed' : '' ]"
        >${{items.list[items.active].amount}}</div>
        <div @click.stop="onHandleOpenInfo(items)" class="PriceTranslate_i_info">{{$t('lang.details')}}</div>
      </div>
      <div v-if="items.open" class="PriceTranslate_i_date_select_box">
        <div
          v-for="(item,index) in items.selectList"
          :key="index"
          @click="onHandleClickItem(item,indexs)"
          :class="['PriceTranslate_i_date_select_box_i',items.active == index ||  comboSubList.includes(items.list[items.active].id) ? 'PriceTranslate_i_date_select_box_i_text_active' : '']"
        >
          <div class="PriceTranslate_i_date_select_box_i_text">{{item.date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonSelect from '@/components/my/CommonSelect.vue'
import { mapState } from 'vuex'
export default {
  name: 'WebFeXcPricetranslate',
  props: {
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
      dataList: []
    }
  },
  computed: {
    ...mapState({
      comboSubList: state => state.base.comboSubList // 用户已经订阅的模特套餐列表
    })
  },
  created () {
    this.getList()
  },

  mounted () {},

  methods: {
    // 将原始数据重排
    getList () {
      const list = []
      // let title = "";
      this.list.forEach((ele, idx) => {
        const selectList = []
        // title += "V";

        for (let index = 0; index < ele.length; index++) {
          ele[index].title = this.$t('lang.VIPx_package').replace(/{%}/, idx)

          const str =
            ele[index].starttime.split(' ')[0] +
            '~' +
            ele[index].endtime.split(' ')[0]
          selectList.push({
            date: str,
            id: ele[index].id
          })
        }

        const obj = {
          open: false,
          list: ele,
          active: 0,
          selectList
        }

        list.push(obj)
      })

      this.dataList = list
    },
    // 伸展订阅套餐计划
    onHandleSwitchUser (indexs) {
      this.dataList[indexs].open = !this.dataList[indexs].open
    },
    // 时间下拉框选择事件
    onHandleClickItem (item, index) {
      const _this = this
      this.dataList[index].selectList.forEach((ele, idx) => {
        if (ele.id == item.id) {
          _this.dataList[index].active = idx
        }
      })
    },
    // 展开档期弹框
    onHandleOpenInfo (item) {
      console.log(item)
      this.$emit('openInfo', item.list)
    },
    // 购买当前的订阅套餐的项
    onHandleBuy (item, index) {
      const _this = this
      const items = item.list[item.active]
      if (this.comboSubList.includes(items.id)) {
        return
      }
      this.$alert(`您确定花費$${items.amount}订阅此套餐吗`, this.$t('lang.Notice'), {
        center: true,
        showCancelButton: true,
        confirmButtonText: this.$t('lang.sure'),
        cancelButtonText: this.$t('lang.dialog_btn_cancel'),
        confirmButtonClass: 'dynamicconfirmButtonClass',
        cancelButtonClass: 'dynamiccancelButtonClass',
        customClass: 'dynamiccustomClass'
      }).then(res => {
        _this.$store.dispatch('buySubCombo', { subid: items.id }).then(res => {
          console.log(res)
          if (res.status == 200) {
            const comboSubList = _this.comboSubList
            comboSubList.push(items.id)
            _this.$store.commit('SET_SUB_LIST', comboSubList)
            _this.$message({
              type: 'success',
              message: res.message
            })
          }
        })
      })
    }
  }
}
</script>

<style>
.dynamiccustomClass {
  width: 250px !important;
}
.dynamicconfirmButtonClass {
  background-color: #f46fe0;
  border-color: #f46fe0;
  /* color: #f46fe0; */
}
.dynamiccancelButtonClass {
  color: #f46fe0;
}
</style>

<style lang="scss" scoped>
.PriceTranslate {
  z-index: 999;
  width: 342px;
  height: auto;
  min-height: 62px;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid #f46fe0;
  //   overflow: hidden;
  .PriceTranslate_i {
    width: 342px;
    min-height: 62px;
    height: auto;
    &:last-child {
      border-bottom: none;
    }
    .PriceTranslate_i_t {
      width: 342px;
      height: 62px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      border-bottom: solid 1px #f46fe0;
    }
    .PriceTranslate_i_title {
      width: 80px;
      height: 20px;
      display: flex;
      align-items: center;
      font-family: SF Pro;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .PriceTranslate_i_date {
      // margin-left: 20px;
      width: 100px;
      height: 34px;
      position: relative;
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
      .rightMenu_context_header_user_icon {
        transform: rotate(-90deg);
        // margin-top: 6px;
        color: #fff;
        font-size: 18px;
        &.rightMenu_context_header_user_icon_close {
          transform: rotate(90deg);
        }
      }
    }
    .PriceTranslate_i_amout {
      width: 68px;
      height: 34px;
      background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
      border-radius: 4px;
      margin-left: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      color: #ffffff;
      &.buyed{
        background-image: linear-gradient( #cbcbcb 0%, #aaa 100%);
      }
    }
    .PriceTranslate_i_info {
      margin-left: 11px;
      font-family: SF Pro;
      text-decoration: underline;
      font-size: 14px;
      letter-spacing: 0px;
      color: #82b1fd;
    }
    .PriceTranslate_i_date_select_box {
      width: 100%;
      height: auto;
      min-height: 42px;
      // position: absolute;
      // bottom: -100%;
      // left: 0;
      background-color: #fff;
      border-radius: 0 0 10px 10px;
      border-left: solid 1px #f46fe0;
      border-right: solid 1px #f46fe0;
      border-bottom: solid 1px #f46fe0;
      overflow: hidden;
      .PriceTranslate_i_date_select_box_i {
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
          color: #6c757d;
        // color: #6c757d;
        .PriceTranslate_i_date_select_box_i_text {
          font-family: SF Pro Text;
          font-size: 16px;
          letter-spacing: 0px;
        }
      }
      .PriceTranslate_i_date_select_box_i_text_active {
        background-color: #82b1fd;
        color: #fff !important;
      }
    }
  }
}
</style>
