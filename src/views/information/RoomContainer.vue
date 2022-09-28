<template>
  <div id="test-models">
       <span @click="changeVid(1)">123123</span>
       <ChatDetails :roomDetailData="roomDetailData"/>

  </div>
</template>

<script>
import ChatDetails from '@/views/information/ChatDetails.vue'
export default {
  name: 'room-detail',
  components: {
    ChatDetails
  },
  data () {
    return {
      roomDetailData: {
        user_id: 13,
        username: 'lukee',
        vid: '0DE7F2AD0706AD723BBD06F0B58EEE878'
      }
    }
  },
  computed: {
  },
  methods: {
    changeVid (i) {
      console.log(i, '=====')
      this.roomDetailData.vid = 123
      console.log(this.roomDetailData)
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>

</style>
