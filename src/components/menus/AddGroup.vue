<template>
  <!-- 编辑个人资料弹框 -->
  <el-dialog
    :before-close="onHandleEdit"
    custom-class="add_group_model_context_big"
    :visible.sync="show"
    title="添加群组"
  >
    <div class="add_group_model_context">
      <div class="add_group_model_context_title">加群组</div>
      <div class="add_group_model_context_radio_box">
        <el-radio-group v-model="radio">
          <el-radio :label="0">选择现有群组</el-radio>
          <el-radio :label="1">创建新群组</el-radio>
        </el-radio-group>
      </div>
      <template v-if="radio == 0">
        <el-select class="add_group_model_context_select" v-model="selectGroup" placeholder="请选择">
          <el-option v-for="(it, index) in groupList" :key="index" :label="it.name || '未知'" :value="it.vid"></el-option>
        </el-select>
      </template>
      <!-- <template > -->
      <el-input
        v-if="radio == 1"
        class="add_group_model_context_input"
        maxlength="30"
        v-model="grounpName"
        @change="onHandleNameChange"
        @keyup.enter.native="onHadnleGroupNameEnter"
        placeholder="输入群组名称"
      ></el-input>
      <div class="add_group_model_context_input_2_box">
        <div class="add_group_model_context_input_2_box_title">添加更多成员</div>
        <el-input
          class="add_group_model_context_input_2"
          maxlength="30"
          v-model="userName"
          @change="onHandleUserChange"
          placeholder="输入用户名/id"
        >
          <template slot="append">
            <div
              @click="onHandleFlitter"
              class="el-icon-search add_group_model_context_input_2_icon"
            ></div>
          </template>
        </el-input>
      </div>

      <div class="add_group_model_context_checklist">
        <el-checkbox-group class="add_group_model_context_checklist_box" v-model="checkboxList">
          <div
            class="add_group_model_context_checklist_box_i"
            v-for="(item,index) in checkList2"
            :key="index"
          >
            <div class="add_group_model_context_checklist_box_i_context">
              <el-avatar
                class="add_group_model_context_checklist_box_i_context_avater"
              >{{item.user_nickname ? item.user_nickname.substr(0,1) : ''}}</el-avatar>
              <div class="add_group_model_context_checklist_box_i_context_box">
                <div
                  class="add_group_model_context_checklist_box_i_context_box_name"
                >{{item.user_nickname || '未知'}}</div>
                <div class="add_group_model_context_checklist_box_i_context_box_id">{{item.id}}</div>
              </div>
            </div>
            <el-checkbox class="add_group_model_context_checklist_box_i_check" :label="item.id"></el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <!-- </template> -->
    </div>
    <div slot="footer" class="add_group_model_context_big_footer">
      <el-button @click="onHandleEdit" class="add_group_model_context_big_footer_button">取消</el-button>
      <el-button
        @click="addGroup"
        class="add_group_model_context_big_footer_button"
        type="primary"
      >确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'HuyaXWebhAddgroup',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    imUserInfo: {
      type: Object,
      default: {}
    },
    parmUserInfo: {
      type: Object,
      default: {}
    },
    roomDetailData: {
      type: Object,
      default: {}
    },
    groupList: {
      type: Array,
      default: []
    },
    selectUserId: {
      type: Number | String,
      default: null
    }
  },
  data () {
    return {
      checkList: [],
      checkList2: [],
      checkboxList: [],
      radio: 0,
      search: '',
      selectGroup: '',
      grounpName: '',
      userName: ''
    }
  },

  async mounted () {
    // 获取群组内的会员列表
    // this.getUserList();
    // 获取全部会员列表
    await this.getAllUserList()
  },

  computed: {
    // filterGroupList () {
    //   let result = [];
    //   let groupList = this.groupList;
    //   if (this.search.length == 0) {
    //     result = groupList;
    //   } else {
    //     result = groupList.filter(it => it.name.indexOf(this.search) != -1)
    //   }
    //   return result;
    // }
  },

  methods: {
    // 群成员筛选方法
    async onHandleFlitter () {
      // let name = this.userName;
      //  if(name){
      //   let res =this.checkList.filter((item)=>{
      //      let useridStr = item.user_id + ''
      //      return item.user_nickname.indexOf(name) > -1 ||  useridStr.indexOf(name) > -1
      //   })
      //   console.log(res)
      //   this.checkList2=res
      // }else{
      //   this.checkList2= this.checkList;
      // }
      await this.getAllUserList()
    },
    // 群组筛选的方法
    onHadnleGroupNameEnter () {},
    // 弹框的关闭事件
    onHandleEdit () {
      this.$emit('close')
      this.checkboxList = []
    },
    // 搜索框改變事件
    onHandleSearch () {},
    // 群组名称变化事件
    onHandleNameChange (e) {
      this.grounpName = e
    },
    // 用户名搜索框改变事件
    onHandleUserChange (e) {
      this.userName = e
    },
    // 获取所有成员列表
    async getAllUserList () {
      const _this = this
      const res = await this.$store.dispatch('getUserList', {
        name: this.userName
      })
      console.log(res)
      if (res.code == 0) {
        console.log(res.data)
        // _this.checkList = res.data;
        _this.checkList2 = res.data
      }
    },
    // 获取群成员列表
    getUserList () {
      const data = {
        vid: this.roomDetailData.vid,
        type: this.roomDetailData.type
      }
      this.$store.dispatch('getChatRoomUserList', { ...data }).then(res => {
        if (res.code == 0) {
          // _this.checkList = res.data;
          _this.checkList2 = res.data
        }
      })
    },
    // 添加群组
    addGroup () {
      if (this.radio == 0 && this.selectGroup == '') {
        return this.$message('请选择群组')
      }
      const _that = this
      let user_id = ''
      for (let index = 0; index < this.checkboxList.length; index++) {
        const element = this.checkboxList[index]
        if (!user_id || user_id.length == 0) {
          user_id = `${element}`
        } else {
          user_id += `,${element}`
        }
      }
      const data = {
        fd: this.roomDetailData.fd,
        token: this.imUserInfo.token,
        type: 1,
        user_id,
        is_new: this.radio
      }
      // 如果是选择的当前群组，则会新增一个VID
      if (this.radio == 0) {
        data.vid = this.selectGroup
        for (let index = 0; index < this.groupList.length; index++) {
          const element = this.groupList[index]
          if (element.vid == data.vid) {
            data.name = element.name
            break
          }
        }
        if (!data.name) {
          data.name = ''
        }
      } else {
        data.name = this.grounpName
      }
      this.$store.dispatch('addGroup', { ...data }).then(res => {
        _that.onHandleEdit()
        _that.$message('群组添加成功~')
        _that.$emit('submit')
      })
    }
  }
}
</script>

<style lang="scss">
.add_group_model_context_big {
  width: 544px !important;
  // height: 589px !important;
  min-height: 300px !important;
  max-height: 700px !important;
  border-radius: 6px;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #f5f4f4;
  .add_group_model_context {
    position: relative;
    width: 100%;
    .add_group_model_context_title {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 26px;
      font-weight: bold;
      color: #222;
    }
    .add_group_model_context_radio_box {
      display: flex;
      flex-direction: column;
    }
    .add_group_model_context_input {
      margin-top: 20px;
    }
    .add_group_model_context_select {
      width: 100%;
      margin: 20px 0;
    }
    .add_group_model_context_input_2_box {
      margin-top: 20px;
      .add_group_model_context_input_2_box_title {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #222;
      }
      .add_group_model_context_input_2 {
        .add_group_model_context_input_2_icon {
          width: 50px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }
    }
    .add_group_model_context_checklist {
      margin-top: 20px;
      width: 100%;
      max-height: 300px;
      overflow-x: hidden;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
      &::-webkit-scrollbar {
        display: none;
        width: 0px !important;
        height: 0px !important;
        background: transparent;
        -webkit-appearance: none;
      }
      .add_group_model_context_checklist_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .add_group_model_context_checklist_box_i {
          margin-top: 8px;
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          // &:last-child {
          //   margin-right: 30px;
          // }
          .add_group_model_context_checklist_box_i_context {
            display: flex;
            // width: 200px;
            align-items: center;
            height: 50px;
            .add_group_model_context_checklist_box_i_context_avater {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              overflow: hidden;
              line-height: 30px;
              background-color: orange;
              font-size: 16px;
            }
            .add_group_model_context_checklist_box_i_context_box {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 40px;
              width: 150px;
              margin-left: 10px;
              .add_group_model_context_checklist_box_i_context_box_name {
                width: 150px;
                text-align: left;
                font-size: 14px;
                color: #222;
              }
              .add_group_model_context_checklist_box_i_context_box_id {
                width: 150px;
                text-align: left;
                // margin-top: 10px;
                font-size: 12px;
                color: #222;
              }
            }
          }
          .add_group_model_context_checklist_box_i_check {
            .el-checkbox__label {
              display: none !important;
            }
          }
        }
      }
    }
  }
}
</style>
