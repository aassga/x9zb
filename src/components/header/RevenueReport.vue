<template>
  <el-dialog
    :before-close="close"
    custom-class="order_model_context_big_4"
    :visible.sync="showModel"
    :title="$t('lang.revenue_report')"
  >
  <div v-if="usertype===1" class="model-tabs">
  <el-tabs v-model="tabName"  @tab-click="changeTab">
    <el-tab-pane label="MCN公司营收报表"></el-tab-pane>
 <el-tab-pane label="MCN模特营收报表"></el-tab-pane>
  </el-tabs>
  </div>
    <!-- :append-to-body="true"
    :modal-append-to-body="false"-->
    <div class="order_model_context">
      <div class="order_model_context_title">
        {{$t('lang.select_dividend_cycle')}}

        <img
          class="order_model_context_title_icon"
          src="@/assets/my/ic-msg@3x.png"
          alt
          srcset
        />
      </div>
      <el-select v-model="selectData" @change="changeSelect">
        <el-option v-for="item in options"
        :key="item.id"
        :label="item.title"
        :value="item.id">
        </el-option>
      </el-select>
      <template v-if="reportData">
      <div class="order_model_context_date">
        <div class="order_model_context_date_l">{{$t('lang.dividend_cycle')}}{{typeConfig[cycleType]}}</div>
        <div class="order_model_context_date_r"  @click="chooseDate">
       {{reportData | cycleFilter(cycleid).title}}
          <!-- <el-date-picker size="mini" v-model="dateValStart" type="date"
         placeholder="开始日期"></el-date-picker>
           <el-date-picker size="mini" v-model="dateValEnd" type="date"
         placeholder="结束日期"></el-date-picker>
         <el-button @click="filterData" size="mini">确定</el-button>
 -->          </div>
      <div class="team-info" v-if="tabName==='0'&&usertype===1"><span>{{$t('lang.basic_salary')}}&nbsp;{{reportData.basicsalary}}/人/月</span>
        <span>团队人数&nbsp;{{reportData.countpeople}}&nbsp;人</span></div>
      </div>
      <el-collapse>
<!--         <el-collapse-item>
          <template slot="title">
            123123
          </template>4444
        </el-collapse-item> -->
 <el-collapse-item class="report-collapse" v-if="tabName==='1'&&usertype===1"
  v-for="(item,index) in reportList" :key="`${index}_item_r`">
          <template slot="title">
            <div class="rc-header">
            <span>{{item.mo_username}}</span>
            <span>{{usertype===1&&tabName!=='1'?"净收益":""}}<i v-if="usertype===1&&tabName!=='1'">{{item |countFilter()}}</i></span>
            <span>{{$t('lang.details')}}</span>
            </div>
          </template>
          <div>
            <div>
              Vip套餐分成比例<span>{{item.data | netMCNRateFilter(1,true)}}</span>
           </div>
           <div>
              {{$t('lang.revenue_Vip')}}<span>{{item.data | dataFilter(1,usertype)}}</span>
           </div>
            <div >
              Vip套餐净收益<span>{{item.data | netMCNFilter(1,true)}}</span>
           </div>
             <div >
              MCN公司分成比例<span>{{item.data | netMCNRateFilter(1,false)}}</span>
           </div>
            <div  class="btm-content">
              MCN公司净收益<span>{{item.data | netMCNFilter(1,false)}}</span>
           </div>
          </div>
          <div>
            <div>
              单项分成比例<span>{{item.data | netMCNRateFilter(2,true)}}</span>
           </div>
           <div>
              单项分成总收益<span>{{item.data | dataFilter(2,usertype)}}</span>
           </div>
            <div >
              单项分成净收益<span>{{item.data | netMCNFilter(2,true)}}</span>
           </div>
             <div >
              MCN公司分成比例<span>{{item.data | netMCNRateFilter(2,false)}}</span>
           </div>
            <div  class="btm-content">
              MCN公司净收益<span>{{item.data | netMCNFilter(2,false)}}</span>
           </div>
          </div>
          <div>
            <div>
              电商分成比例<span>{{item.data | netMCNRateFilter(3,true)}}</span>
           </div>
           <div>
              电商分成总收益<span>{{item.data | dataFilter(3,usertype)}}</span>
           </div>
            <div >
              电商分成净收益<span>{{item.data | netMCNFilter(3,true)}}</span>
           </div>
             <div >
              MCN公司分成比例<span>{{item.data | netMCNRateFilter(3,false)}}</span>
           </div>
            <div  class="btm-content">
              MCN公司净收益<span>{{item.data | netMCNFilter(3,false)}}</span>
           </div>
          </div>

            <div>
            <div>
              打赏分成比例<span>{{item.data | netMCNRateFilter(4,true)}}</span>
           </div>
           <div>
              打赏分成总收益<span>{{item.data | dataFilter(4,usertype)}}</span>
           </div>
            <div >
              打赏分成净收益<span>{{item.data | netMCNFilter(4,true)}}</span>
           </div>
             <div >
              MCN公司分成比例<span>{{item.data | netMCNRateFilter(4,false)}}</span>
           </div>
            <div  class="btm-content">
              MCN公司净收益<span>{{item.data | netMCNFilter(4,false)}}</span>
           </div>
          </div>

          <div>
            <div>
              底薪分成比例<span>{{item.data | netMCNRateFilter(5,true)}}</span>
           </div>
           <div>
              底薪分成总收益<span>{{item.data | dataFilter(5,usertype)}}</span>
           </div>
            <div >
              底薪分成净收益<span>{{item.data | netMCNFilter(5,true)}}</span>
           </div>
             <div >
              MCN公司分成比例<span>{{item.data | netMCNRateFilter(5,false)}}</span>
           </div>
            <div  class="btm-content">
              MCN公司净收益<span>{{item.data | netMCNFilter(5,false)}}</span>
           </div>
          </div>

        </el-collapse-item>
      </el-collapse>
      <div class="tab-container"  v-if="tabName!=='1'" >
         <el-collapse>
          <el-collapse-item class="report-collapse">
            <template slot="title">
            <div class="rc-header">
            <span> {{$t('lang.vip_package')}}</span>
            <span >{{usertype===1?"净收益":""}}<i v-if="usertype===1">{{reportData.report | netFilter(1,usertype)}}</i></span>
            <span>{{$t('lang.details')}}</span>
            </div>
          </template>
          <div>
            <div>
            <div v-if="usertype===1">
              Vip套餐分成比例<span>{{reportData.report | itemRateFilter(1,usertype)}}</span>
           </div>
           <div>
              {{$t('lang.revenue_Vip')}}<span>{{reportData.report | dataFilter(1,usertype)}}</span>
           </div>

           <div  v-if="usertype===1" class="btm-content">
              Vip套餐净收益<span>{{reportData.report | netFilter(1,usertype)}}</span>
           </div>
           </div>
         </div>
         </el-collapse-item>
          <el-collapse-item class="report-collapse">
            <template slot="title">
            <div class="rc-header">
            <span>{{$t('lang.single_division')}}</span>
            <span >{{usertype===1?"净收益":""}}<i v-if="usertype===1">{{reportData.report | netFilter(2,usertype)}}</i></span>
            <span>{{$t('lang.details')}}</span>
            </div>
          </template>
          <div>
            <div>
            <div v-if="usertype===1">
             单项分成比例<span>{{reportData.report | itemRateFilter(2,usertype)}}</span>
           </div>
           <div>
              {{$t('lang.individual_share')}}<span>{{reportData.report | dataFilter(2,usertype)}}</span>
           </div>
           <div  v-if="usertype===1" class="btm-content">
              单项分成净收益<span>{{reportData.report | netFilter(2,usertype)}}</span>
           </div>
           </div>
         </div>
         </el-collapse-item>
          <el-collapse-item class="report-collapse">
            <template slot="title">
            <div class="rc-header">
            <span>{{$t('lang.e_commerce')}}</span>
            <span >{{usertype===1?"净收益":""}}<i v-if="usertype===1">{{reportData.report | netFilter(3,usertype)}}</i></span>
            <span>{{$t('lang.details')}}</span>
            </div>
          </template>
          <div>
            <div>
            <div v-if="usertype===1">
              电商分成比例<span>{{reportData.report | itemRateFilter(3,usertype)}}</span>
           </div>
           <div>
              {{$t('lang.e_commerce_share')}}<span>{{reportData.report | dataFilter(3,usertype)}}</span>
           </div>
           <div  v-if="usertype===1" class="btm-content">
              电商净收益<span>{{reportData.report | netFilter(3,usertype)}}</span>
           </div>
           </div>
         </div>
         </el-collapse-item>
          <el-collapse-item class="report-collapse">
            <template slot="title">
            <div class="rc-header">
            <span>{{$t('lang.reward')}}</span>
            <span >{{usertype===1?"净收益":""}}<i v-if="usertype===1">{{reportData.report | netFilter(4,usertype)}}</i></span>
            <span>{{$t('lang.details')}}</span>
            </div>
          </template>
          <div>
            <div>
            <div v-if="usertype===1">
              打赏分成比例<span>{{reportData.report | itemRateFilter(4,usertype)}}</span>
           </div>
           <div>
              {{$t('lang.donate')}}<span>{{reportData.report | dataFilter(4,usertype)}}</span>
           </div>
           <div  v-if="usertype===1" class="btm-content">
              打赏净收益<span>{{reportData.report | netFilter(4,usertype)}}</span>
           </div>
           </div>
         </div>
         </el-collapse-item>
        <el-collapse-item class="report-collapse">
            <template slot="title">
            <div class="rc-header">
            <span>{{$t('lang.e_commerce')}}</span>
          <span >{{usertype===1?"净收益":""}}<i v-if="usertype===1">{{reportData.report | netFilter(5,usertype)}}</i></span>
            <span>
              <el-popover placement="bottom"
              class="amount-popover"
              trigger="hover"
              :content="$t('lang.basic_salary_income')"
              >
                <i class="el-icon-warning-outline" slot="reference"></i>
              </el-popover>
             {{$t('lang.details')}}</span>
            </div>
          </template>
          <div>
            <div>
            <div v-if="usertype===1">
              底薪分成比例<span>{{reportData.report | itemRateFilter(5,usertype)}}</span>
           </div>
           <div>
              {{$t('lang.basic_salary_rev')}}<span>{{reportData.report | dataFilter(5,usertype)}}</span>
           </div>
           <div  v-if="usertype===1" class="btm-content">
              底薪净收益<span>{{reportData.report | netFilter(5,usertype)}}</span>
           </div>
           </div>
         </div>
      </el-collapse-item>
    </el-collapse>
      </div>
      <div class="order_model_context_b">
        <div class="order_model_context_b_l">{{$t('lang.total_revenue')}}</div>
        <div class="order_model_context_b_r">{{reportData.total}}</div>
      </div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import CommonInput from '@/components/my/CommonInput.vue'
import { DatetimePicker } from 'mint-ui'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'WebFeXcOrderamoutset',
  props: {
    showModel: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: false
    }
  },
  components: {
    CommonInput,
    DatetimePicker
  },
  data () {
    return {
      set_info: {
        free_photo: ''
      },
      reportData: '',
      dateValStart: '',
      dateValEnd: '',
      tabName: '',
      selectData: '',
      cycleid: '',
      cycleType: 1,
      usertype: 1,
      mcnUrl: '',
      typeConfig: {
        1: '日',
        2: '周',
        3: '半月',
        4: '月'
      },
      options: [],
      reportList: []
    }
  },

  mounted () {
    this.usertype = this.userInfo.mcn_data.usertype
    if (this.usertype !== 0) {
      this.filterData()
    }
  },

  methods: {
    changeTab (e) {
      this.filterData()
    },
    changeSelect (e) {
      this.cycleid = e
      this.selectData = e
      this.cycleType = this.$options.filters.cycleFilter(this.reportData, e).cycleType
      this.filterData()
    },
    filterData () {
      if (this.usertype === 1) {
        this.reportList = []
        this.$store.dispatch(this.tabName === '1' ? 'getMCNGroupList' : 'getMCNList', {
          cycleid: this.cycleid
        })
          .then(res => {
            this.reportData = res.data
            this.reportList = res.data.report
            this.options = res.data.cycle
          })
        return
      }
      this.$store.dispatch('getModelList', {
        cycleid: this.cycleid
      })
        .then(res => {
          this.reportData = res.data
          this.options = res.data.cycle
        })
    },
    chooseDate () {
      this.filterData()
      console.log(this.tabName)
    },
    close () {
      this.$emit('close')
    },
    // 成为模特
    onHandleBecomeModel () {
      // 返回上一页
      this.$router.go(-1)
    }
  },
  filters: {
    countFilter: function (item) {
      let count = 0
      console.log(item, 'data-------')
      item.data.forEach(item => {
        count = count + item.model_netamount
      })
      return count
    },
    itemRateFilter: function (data, typeNumber) {
      let rate = 0
      data.forEach(item => {
        if (item.type == typeNumber) {
          rate = item.mcn_rate * 1 || 0
        }
      })
      return rate * 100 + '%'
    },
    netMCNRateFilter: function (data, typeNumber, isModel) {
      let rate = 0
      data.forEach(item => {
        if (item.type == typeNumber) {
          if (!isModel) {
            rate = item.mcn_rate
          } else {
            rate = item.model_rate
          }
        }
      })
      return rate * 100 + '%'
    },
    netMCNFilter: function (data, typeNumber, isModel) {
      let amount = 0
      data.forEach(item => {
        if (item.type == typeNumber) {
          if (!isModel) {
            amount = item.mcn_netamount
          } else {
            amount = item.model_netamount
          }
        }
      })
      return amount
    },
    netFilter: function (data, typeNumber, usertype) {
      let amount = 0
      data.forEach(item => {
        if (item.type == typeNumber) {
          if (usertype === 1) {
            amount = item.netamount
          } else {
            amount = item.amount
          }
        }
      })
      return amount
    },
    dataFilter: function (data, typeNumber, usertype) {
      let amount = 0
      data.forEach(item => {
        if (item.type == typeNumber) {
          amount = item.amount
        }
      })
      return amount
    },
    cycleFilter: function (data, id) {
      let newItem = ''
      data.cycle.forEach(item => {
        if (item.id == id) {
          newItem = item
        }
      })
      return newItem
    }
  }
}
</script>

<style lang="scss" >

.tab-container{
  width: 100%;
}
.report-collapse{
  .btm-content{
    border-bottom:1px solid #ccc;
  }
  .el-icon-arrow-right{
    display:none;
  }
  div{
    text-align:left;
    color:#999;
    span{
      margin-left: 30px;
      color: #f46fe0;
    }
  }
  &>div{
     margin:  4px 0;
    &>div{
      padding: 0 20px;
      &>div{
          &>div{
            padding:  3px 0;
          }
      }
    }
  }
}
.rc-header{
  width:100%;
  position:relative;
  span:first-child{
    color:#6f005e;
    margin-left:0;
  }

   span:nth-child(2){
    color:#999;
    i{
      font-style:normal;
      color: #f46fe0;
      margin-left:10px;
    }
  }
   span:nth-child(3){
    color:#82b1fd;
    position:absolute;
    right:0;
  }
}
.order_model_context{
  .el-collapse{
    width:90%;
    padding:0 20px;
  }
}
.team-info{
  padding: 6px 2px;
  span{
    display:inline-block;
    width:50%;
    &:first-child{
      text-align:left;
    }
    &:last-child{
      text-align:right;
    }
  }
}
.model-tabs{
  padding: 0 20px;
}
// 编辑弹框的样式
.order_model_context_big_4 {
  width: 344px !important;
  height: 420px;
  border-radius: 6px;
  overflow: hidden;
  overflow-y:scroll;
  background-color: #f5f4f4;
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header{
    height: 38px;
    border-bottom: rgba(60, 60, 67, 0.36);
    background-color: #f5f4f4;
    line-height: 38px;
    // .el-dialog__headerbtn{
    //   width: 25px;
    //   height: 25px;
    // }
  }
  .order_model_context {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    // background-color: #fff;
    align-items: center;
    height: auto !important;
    .el-select{
        opacity: 0;
        top: -24px;
        width: 100%;
    }
    .order_model_context_title {
      width: 308px;
      height: 30px;
      background-color: #f26fe1;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      box-sizing: border-box;
      font-family: SF Pro Text;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;

      .order_model_context_title_icon {
        width: 22px;
        height: 23px;
      }
    }
    .order_model_context_date {
      background-color: #f5f4f4;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      box-sizing: border-box;
      width: 100%;
      margin-top:- 35px;
      // height: 84px;
      .order_model_context_date_l {
        font-family: SF Pro Text;
        font-size: 16px;
        font-weight: 700;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #343a40;
        width: 100%;
      }
      .order_model_context_date_r {
        &>div{
          width:140px;
          display:inline-block;
        }
        font-family: SF Pro Text;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #6c757d;
      }
    }
    .order_model_context_box {
      background-color: #f5f4f4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      box-sizing: border-box;
      width: 100%;
      padding-bottom: 24px;
      border-bottom: solid 1px #dfdfdf;
      &.normal-content{
        &>.order_model_context_box_i{
          width:48%;
          &>div{
            width:100%;
          }
        }
      }
      .order_model_context_box_i {
        width: 100px;
        height: 196px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .order_model_context_box_i_title {
          width: 100px;
          height: 36px;
          background-color: #343a40;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: SF Pro Text;
          font-size: 12px;
          font-weight: 400;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .order_model_context_box_i_body {
          flex: 1;
          height:150px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          padding: 5px;
          box-sizing: border-box;
          background-color: #fff;
        }
        .order_model_context_box_i_i {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 36px;
          background-color: #f1f0ef;
          border-radius: 2px;
          font-family: SF Pro Text;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #343a40;
          &.bg_white {
            background-color: #fff;
          }
        }
      }
    }
    .order_model_context_b {
      background-color: #f5f4f4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px 20px;
      box-sizing: border-box;
      width: 100%;
      height: 77px;
      .order_model_context_b_l {
        font-family: SF Pro Text;
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #343a40;
      }
      .order_model_context_b_r {
        font-family: SF Pro Text;
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 0px;
        color: #f46fe0;
      }
    }
  }
}
</style>
