<template>
  <div class="HuyaXWebhIndex">
    <div class="HuyaXWebhIndex_h_box">
      <el-input
        class="HuyaXWebhIndex_h_input"
        maxlength="30"
        v-model="value"
        @change="onHandleChange"
        @keyup.enter.native="onHadnleEnter"
        placeholder="搜索全局请按回车键"
      ></el-input>
      <!-- 如果是群组的列表 -->
      <el-button
        class="CreatGrounp"
        @click="onHandleCreatGrounp"
        v-show="activeIndex == 1"
        type="primary"
      >创建群组</el-button>
    </div>
    <div class="HuyaXWebhIndex_context">
      <menuItem
        :active="activeIndex2 == index"
        @onHandleClickItem="onHandleClickItem"
        :index="index"
        :item="item"
        :headerIndex="activeIndex"
        v-for="(item,index) in list2"
        :key="index"
      ></menuItem>
    </div>
  </div>
</template>

<script>
import menuItem from './Items.vue'
export default {
  name: 'HuyaXWebhIndex',
  components: {
    menuItem
  },
  data () {
    return {
      // 直播间列表
      list1: [],
      // 搜索之后的列表
      list2: [],
      activeIndex2: 0,
      value: '',
      item: {}
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    headerIndex: {
      type: Number | String,
      default: 0
    },
    meSendMsgText: {
      type: Number | String,
      default: ''
    },
    addGroupVid: {
      type: Number | String,
      default: ''
    },
    activeIndex: {
      type: Number | String,
      default: 0
    },
    msgText: {
      type: Number | String,
      default: ''
    },
    listInitStatus: {
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
    msgList: {
      type: Array,
      default: []
    }
  },
  mounted () {
    console.log('这是获取到的iframe参数')
    console.log(document.location)
    this.getList()
  },
  watch: {
    msgList: {
      handler (newV, oldV) {
        this.list1 = this.mapList(this.list1, newV)
        this.list2 = this.mapList(this.list2, newV)

        if (this.activeIndex == 1) {
          this.$emit('onHandleGroupMsgChange', this.list1)
        } else if (this.activeIndex == 2) {
          this.$emit('onHandleMsgChange', this.list1)
        }
        // 刷新视图
        this.$forceUpdate()
      },
      deep: true
    },
    meSendMsgText (newV, oldV) {
      if (newV && this.headerIndex === this.activeIndex) {
        this.list2[this.activeIndex2].last_msg.text = newV
      }
    },
    msgText (newV, oldV) {
      if (this.headerIndex === this.activeIndex) {
        this.list2[this.activeIndex2].last_msg.text = newV
      }
    },
    headerIndex (newV, oldV) {
      if ((newV || newV === 0) && newV == this.activeIndex) {
        // if (this.list1.length <= 0) {
        this.getList()
        // } else {
        //   this.$emit("onHandleClickItem", this.list2[this.activeIndex2]);
        //   this.$emit("onHandleMenuChange", this.list2);
        // }

        // 如果刚刚离开了私聊tab  则删除当前私聊的vid
        if (oldV == 2) {
          this.$emit('onHandleDelVid')
        }
      }
    },
    listInitStatus (newV, oldV) {
      if (this.headerIndex == this.activeIndex) {
        this.getList(this.addGroupVid)
      }
    }
  },
  methods: {
    // 获取url参数
    getQueryString (name) {
      const query = window.location.href.split('?')[1]
      console.log('获取到的参数')
      console.log(query)
      if (query && query.indexOf('&') > -1) {
        const vars = query.split('&')
        console.log('截取到的参数数组')
        console.log(vars)
        for (let index = 0; index < vars.length; index++) {
          const pair = vars[index].split('=')
          if (pair[0] == name) {
            return pair[1]
          }
        }
        return false
      } else {
        return false
      }
    },
    // 获取列表
    async getList (vid = false) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const id = userInfo.user_id
      const rep = await this.$store.dispatch('getMessageList', {
        id,
        type: this.activeIndex || 0
      })
      if (rep.data && rep.data.length > 0) {
        for (let index = 0; index < rep.data.length; index++) {
          const element = rep.data[index]
          element.unread_count = 0
          if (element.last_msg) {
            element.last_msg.creation_time = element.last_msg.creation_time
              ? element.last_msg.creation_time.split(' ')[1].slice(0, -3)
              : ''
          }
        }

        // 如果vid存在则把vid放到列表的最上面
        if (vid && vid != '') {
          rep.data.sort((x, y) => {
            return x.vid == vid ? -1 : y.vid == vid ? 1 : 0
          })
        }
        this.list1 = rep.data
        this.list2 = rep.data
        this.value = ''
        this.$emit('onHandleMenuChange', this.list2)
        if (
          this.getQueryString('vid') &&
          this.getQueryString('headIndex')[0] == this.activeIndex
        ) {
          for (let index = 0; index < rep.data.length; index++) {
            const element = rep.data[index]
            if (element.vid == this.getQueryString('vid')) {
              this.onHandleClickItem(rep.data[index], index)
              // window.location.href = window.location.href.split("?")[0];
            }
          }
        } else if (this.headerIndex == this.activeIndex) {
          this.onHandleClickItem(rep.data[0], 0)
        }
        if (this.activeIndex == 1) {
          this.$emit('onHandleGroupList', rep.data)
        }
      } else {
        this.list1 = []
        this.list2 = []
        this.value = ''
        this.$emit('onHandleMenuChange', [])
        if (this.activeIndex == 1) {
          this.$emit('onHandleGroupList', [])
        }
      }
    },
    // 列表已读未读比对事件
    mapList (list1, list2) {
      // 是否是新增的消息 是的话就讲房间移动到列表最前面
      if (list2.length > 0 && list2[list2.length - 1].text) {
        list1.sort((x, y) => {
          return x.vid == list2[list2.length - 1].vid
            ? -1
            : y.vid == list2[list2.length - 1].vid
              ? 1
              : 0
        })
        // 如果是重整之后的数组，则重新校对active的索引，使页面样式规范
        for (let index = 0; index < list1.length; index++) {
          const element = list1[index]
          if (element.vid == this.item.vid) {
            this.activeIndex2 = index
          }
        }
      }

      const menuList = list1
      const changeList = list2

      for (let indexs = 0; indexs < menuList.length; indexs++) {
        const elements = menuList[indexs]
        for (let index = 0; index < changeList.length; index++) {
          const element = changeList[index]
          if (element.vid == elements.vid) {
            elements.unread_count = element.unread_count
            // 如果页面有text则替换最后的text
            if (element.text) {
              elements.last_msg.text = element.text
            }
          }
        }
      }

      console.log('新消息变更之后的数组')
      console.log(menuList)

      return menuList
    },
    onHandleChange (name) {
      this.$emit('onHandleChange', name)
    },
    // 回车键事件
    onHadnleEnter () {
      const name = this.value
      // console.log(this.list1)
      if (name) {
        const res = this.list1.filter(item => {
          if (
            (item.name && item.name.length > 0) ||
            (item.user_nickname && item.user_nickname.length > 0)
          ) {
            return (
              (item.user_nickname && item.user_nickname.indexOf(name) > -1) ||
              (item.name && item.name.indexOf(name) > -1)
            )
          } else {
            return false
          }
        })
        this.list2 = res
      } else {
        this.list2 = this.list1
      }

      this.$emit('onHandleMenuChange', this.list2)
      if (this.list2 && this.list2.length > 0) {
        this.onHandleClickItem(this.list2[0], 0)
      }
    },
    onHandleClickItem (item, index) {
      if (this.loading) {
        return
      }
      // window.location.href = "/ChatDetails?user_id=13&&username=lukee&&vid";
      this.item = item
      this.activeIndex2 = index
      this.readItem(item)
      this.$emit('onHandleClickItem', item)
    },
    // 已读事件
    readItem (item) {
      const list1 = this.list1
      const list2 = this.list2
      for (let index = 0; index < list1.length; index++) {
        const element = list1[index]
        if (element.vid == item.vid) {
          element.unread_count = 0
        }
      }
      for (let index = 0; index < list2.length; index++) {
        const element = list2[index]
        if (element.vid == item.vid) {
          element.unread_count = 0
        }
      }
      this.list1 = list1
      this.list2 = list2
    },
    // 创建群组事件
    onHandleCreatGrounp () {
      this.$emit('onHandleCreatGrounp')
    }
  }
}
</script>

<style lang="scss" scoped>
.HuyaXWebhIndex {
  width: 300px;
  min-width: 300px;
  padding: 0px 10px 0 10px;
  height: 740px;
  overflow: hidden;
  box-sizing: border-box;
  .HuyaXWebhIndex_h_box {
    display: flex;
    flex-direction: column;

    .HuyaXWebhIndex_h_input {
      display: flex;
      align-items: center;
      margin: 10px 0;
      &:focus {
        border: 1px solid #409eff;
      }
    }
    .CreatGrounp {
      width: 120px;
      height: 40px;
      margin-bottom: 10px;
    }
  }
  .HuyaXWebhIndex_context {
    width: 100%;
    height: 670px;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shhadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shhadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
</style>
