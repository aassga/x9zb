<template>
<!-- 添加/刪除群組成員 -->
    <el-dialog
        :before-close="onHandleClose"
        custom-class="group_list_modal"
        :visible.sync="show"
        title="群組成員"
    >
        <div class="group_list_content">
            <div class="group_list_title">
                {{ action == 1 ? "添加" : "刪除" }}群組成员
            </div>
            <el-input
                class="group_list_input"
                maxlength="30"
                v-model="search"
                placeholder="搜索用户名/ID"
            >
                <el-button slot="append" icon="el-icon-search" @click.stop="getUserList"></el-button>
            </el-input>
            <div class="group_list_menu">
                <el-checkbox-group class="group_list_menu_box" v-model="selectList">
                    <div class="group_list_menu_item" v-for="it in list" :key="action == 1 ? it.id : it.user_id">
                        <el-avatar class="group_list_menu_avater">
                            {{it.user_nickname ? it.user_nickname.substr(0,1) : ''}}
                        </el-avatar>
                        <div class="group_list_menu_item_info">
                            <div class="group_list_menu_item_name">{{it.user_nickname}}</div>
                            <div class="group_list_menu_item_id">{{action == 1 ? it.id : it.user_id}}</div>
                        </div>
                        <el-checkbox :label="action == 1 ? it.id : it.user_id"></el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
        </div>
        <div slot="footer" class="group_list_footer">
            <el-button @click="onHandleClose" class="group_list_footer_button">取消</el-button>
            <el-button
                @click="submit"
                class="group_list_footer_button"
                type="primary"
            >确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'HuyaXWebhGroupList',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    action: {
      type: Number,
      default: 1
    },
    userList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      search: '',
      list: [],
      selectList: []
    }
  },
  watch: {
    show (newV, oldV) {
      if (newV) {
        this.reset()
        this.getUserList()
      }
    }
  },
  mounted () {

  },
  methods: {
    getUserList () {
      if (this.action == 1) {
        this.$store.dispatch('getUserList', {
          name: this.search
        }).then((res) => {
          if (res.code == 0) {
            this.list = res.data
          }
        })
      } else {
        this.list = this.userList

        if (this.search.length > 0) {
          this.list = this.userList.filter(it => (it.user_nickname.indexOf(this.search) != -1) || (it.user_id.toString().indexOf(this.search) != -1))
        }
      }
    },
    submit () {
      if (this.selectList.length == 0) {
        return this.$message('请选择用户')
      } else {
        this.$emit('submit', this.selectList.join())
      }
    },
    // 彈窗關閉
    onHandleClose () {
      this.$emit('close')
      this.reset()
    },
    reset () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style lang="scss" scoped>
.group_list_modal {
    width: 444px !important;
    min-height: 300px !important;
    border-radius: 6px;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #f5f4f4;
    .group_list_content {
        position: relative;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        .group_list_title {
            font-size: 18px;
            font-weight: bold;
            text-align: left;
        }
        .group_list_input {
            margin-top: 20px;
        }
        .group_list_menu {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-top: 20px;
            width: 100%;
            min-height: 300px;
            max-height: 300px;
            overflow-x: hidden;
            overflow-y: auto;
            .group_list_menu_box {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                .group_list_menu_item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    margin-bottom: 15px;
                    .group_list_menu_avater {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        overflow: hidden;
                        line-height: 30px;
                        background-color: orange;
                        font-size: 16px;
                    }
                    .group_list_menu_item_info {
                        flex: 1;
                        text-align: left;
                        margin-left: 10px;
                        .group_list_menu_item_name {
                            font-size: 14px;
                            color: #222;
                        }
                        .group_list_menu_item_id {
                            font-size: 13px;
                            color: #757575;
                        }
                    }
                    .el-checkbox {
                        margin: 0 10px;
                    }
                }
            }
        }
    }
}
</style>

<style lang="scss">
.group_list_menu {
    .el-checkbox__label{
        display: none !important;
    }
}
</style>
