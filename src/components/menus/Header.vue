<template>
    <div class="HuyaXWebhHeader" >
        <el-radio-group @change="onHandleChange" v-model="tabIndex" >
        <el-radio-button :label="0" >直播间</el-radio-button>
        <!-- v-if="groupChat > 0" -->
        <el-radio-button :label="1" >群组<i v-if="groupChat > 0"  class="new-msg-icon" >{{groupChat > 99 ? '99+' : groupChat}}</i></el-radio-button>
        <el-radio-button :label="2" >私聊<i v-if="oneChat > 0"  class="new-msg-icon" >{{oneChat > 99 ? '99+' : oneChat}}</i></el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
  name: 'HuyaXWebhHeader',
  props: ['headerIndex', 'groupChat', 'oneChat'],
  watch: {
    headerIndex: {
      handler (newV, oldV) {
        console.log('tab改变事件')
        console.log(newV)
        this.tabIndex = newV
      },
      immediate: true
    }
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  mounted () {
  },
  computed: {
    newMsg () {
      console.log(this.$store.state.user, '=========user')
      return this.$store.state.user.newMsg
    }
  },
  methods: {
    onHandleChange (e) {
      this.$emit('onHandleChange', e)
      this.tabIndex = e
    }

  }
}
</script>

<style lang="scss" scoped>
.new-msg-icon{
    font-style: normal;
    width: 32px;
    z-index:99;
    height: 20px;
    background: #F5481e;
    border-radius: 10px;
    position: absolute;
    right: -13px;
    top: -6px;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.HuyaXWebhHeader{
    margin-top: 20px;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
}
</style>
