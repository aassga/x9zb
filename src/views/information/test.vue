<template>
  <div id="chat-models">
123123
  </div>
</template>

<script>
import Footer from '@/components/footer/Index.vue'
import Modal from '@/components/chat/Modal.vue'
import MainHeader from '@/components/header/MainHeader.vue'
import userApi from '@/api/user.js'

export default {
  name: 'information-detail',
  components: {
    Footer,
    Modal,
    MainHeader
  },
  data () {
    return {

      WSURL: null
    }
  },
  mounted () {
    // 异步转同步
    // setTimeout(() => {
    //   this.$global.ws.onmessage = this.websocketonmessage;
    // }, 20);

    const data = {
      user_id: 2,
      username: 'tang'
    }
    const _that = this
    this.$store.dispatch('getImToken', data).then(res => {
      // _that.userInfo = res.data;
      _that.newSocket(res.data)
    })
  },
  created () {

  },

  methods: {
    newSocket (data) {
      this.WSURL = `ws://10.83.107.92:9024?token=${data.token}&tokenid=${data.id}`
      this.ws = new WebSocket(this.WSURL)
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
