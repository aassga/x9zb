<template>
  <div class="hall" ref="list">
    <div v-for="item in enterHallList" :key="item.key" class="hall-item">
      <div
        class="hall-item-name"
        @click="openUserInfo(item)"
      >{{item.user_nickname || item.text.split(' ')[0]}}</div>
      <div>进入直播间</div>
      <div v-if="item.channel_code" class="hall-item-channel">渠道{{item.channel_code}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['enterHallList'],
  data () {
    return {
      count: 0
    }
  },
  watch: {
    enterHallList (data) {
      console.log(this.enterHallList.length)
      if (this.enterHallList.length > 12) {
        setTimeout(() => {
          this.$refs.list.scrollTop = (this.enterHallList.length - 12) * 60
        }, 100)
      }
    }
  },
  mounted () {},
  methods: {
    openUserInfo (item) {
      this.count++
      this.$emit('onHandleChangeUseId', {
        id: item.user_id || item.userid,
        count: this.count,
        channel: item.channel_code
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hall {
  background: white;
  margin: 0 10px;
  min-width: 350px;
  height: 680px;
  padding: 20px 30px;
  overflow: auto;
  &-item {
    display: flex;
    justify-content: center;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid lightgray;
    margin-bottom: 15px;
    font-size: 14px;
    &-name {
      color: deeppink;
      text-decoration: underline;
      text-decoration-color: deepskyblue;
      cursor: pointer;
    }
    &-channel {
      margin-left: 10px;
    }
  }
  &-item:last-child {
    margin-bottom: 0px;
  }
}
</style>
