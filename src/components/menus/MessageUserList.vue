<template>
  <div class="HuyaXWebhMessageuserlist">
    <div class="HuyaXWebhMessageuserlist_header">
      <div @click="onHandleBack">
        <el-icon class="el-icon-arrow-left HuyaXWebhMessageuserlist_header_icon"></el-icon>返回
      </div>
    </div>
    <!-- 头部区域 -->
    <div class="HuyaXWebhMessageuserlist_name_box">
      <el-image src="@/assets/my/img-user.jpg" class="HuyaXWebhMessageuserlist_name_box_avater" />
      <div class="HuyaXWebhMessageuserlist_name_box_name">sera转化群</div>
      <div class="HuyaXWebhMessageuserlist_name_box_index">68</div>
    </div>
    <!-- 图标列表 -->
    <div class="HuyaXWebhMessageuserlist_icon_list">
      <div class="el-icon-circle-plus-outline HuyaXWebhMessageuserlist_icon_list_i"></div>
      <div class="el-icon-remove-outline HuyaXWebhMessageuserlist_icon_list_i"></div>
      <div class="el-icon-delete HuyaXWebhMessageuserlist_icon_list_i"></div>
      <div class="el-icon-edit-outline HuyaXWebhMessageuserlist_icon_list_i"></div>
    </div>
    <!-- 输入框 -->
    <el-input
      class="HuyaXWebhMessageuserlist_input"
      maxlength="30"
      v-model="value"
      @change="onHandleChange"
      placeholder="用户名/ID/标签"
    ></el-input>
    <!-- tab栏 -->
      <el-radio-group class="HuyaXWebhMessageuserlist_tabs" @change="onHandleTabsChange" v-model="headerIndex" >
        <el-radio-button label="0" >全部</el-radio-button>
        <el-radio-button label="1" >在线</el-radio-button>
        <el-radio-button label="2" >离线</el-radio-button>
        <el-radio-button label="3" >禁言</el-radio-button>
        <el-radio-button label="4" >冻结</el-radio-button>
        </el-radio-group>

    <div  class="HuyaXWebhMessageuserlist_context" >
        <userItem
            :active="activeIndex == index"
        @onHandleClickItem="onHandleClickItem"
        :index="index"
        :item="item"
        :headerIndex="headerIndex"
        v-for="(item,index) in list"
        :key="index"
          ></userItem>
    </div>
  </div>
</template>

<script>
import userItem from './UserItem.vue'

export default {
  name: 'HuyaXWebhMessageuserlist',
  components: {
    userItem
  },
  data () {
    return {
      value: '',
      activeIndex: 0,
      headerIndex: 0,
      list: [
        {
          status: 1,
          name: '速滑队告诉给粉丝u个',
          id: 376228,
          img: null
        }
      ]
    }
  },

  mounted () {},

  methods: {
    // 返回事件
    onHandleBack () {},
    // 输入框变化事件
    onHandleChange (e) {
      this.value = e
    },
    onHandleTabsChange (e) {
      this.headerIndex = e
    },
    // 点击子项的事件
    onHandleClickItem (item, index) {

    }
  }
}
</script>

<style lang="scss" scoped>
.HuyaXWebhMessageuserlist {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  .HuyaXWebhMessageuserlist_header {
    cursor: pointer;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: #fff;
    color: #b4b1b1;
    font-size: 16px;
    .HuyaXWebhMessageuserlist_header_icon {
      color: #b4b1b1;
      font-size: 16px;
      margin-right: 20px;
    }
  }
  .HuyaXWebhMessageuserlist_name_box {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .HuyaXWebhMessageuserlist_name_box_avater {
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }
    .HuyaXWebhMessageuserlist_name_box_name {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 400;
      color: #222;
      margin-top: 10px;
    }
    .HuyaXWebhMessageuserlist_name_box_index {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 400;
      color: #222;
      margin-top: 10px;
    }
  }
  .HuyaXWebhMessageuserlist_icon_list {
    display: flex;
    height: 80px;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    .HuyaXWebhMessageuserlist_icon_list_i {
      width: 40px;
      height: 80px;
      cursor: pointer;
    }
  }
  .HuyaXWebhMessageuserlist_input {
    width: 350px;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    &:focus {
      border: 1px solid #409eff;
    }
  }
  .HuyaXWebhMessageuserlist_tabs{
      margin-top: 40px;
  }
}
</style>
