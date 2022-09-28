<template>
    <div id="time-limited-dynamic-show-list">
        <TimeLimitedDynamicShow
            v-if="resetTimeLimitedDynamicShow && allUserDataIndex >= 0"
            :autoplayTimeLimitedDynamicShowCarousel="autoplayTimeLimitedDynamicShowCarousel"
            :initInterval="initInterval"
            :dynamicInfo="dynamicInfo" :dynamicShowList="dynamicShowList"
            @next-user="nextUser"
            @prev-user="prevUser"
            @close-time-limited-dynamic-show="$emit('close-time-limited-dynamic-show')"
            @open-unlock-modal="openNnlockModal"
            @update-interval="updateInterval"
        />
    </div>
</template>

<script>
import TimeLimitedDynamicShow from '@/components/home/TimeLimitedDynamicShow.vue'

export default {
  name: 'time-limited-dynamic-show-list',
  props: {
    autoplayTimeLimitedDynamicShowCarousel: {
      type: Boolean
    }
  },
  components: {
    TimeLimitedDynamicShow
  },
  data () {
    return {
      initInterval: 4000,
      interval: 4000,
      resetTimeLimitedDynamicShow: true,
      allUserData: [
        {
          avatar: `${require('@/assets/home/user-4@3x.png')}`,
          userName: '👑 Kiera Bernie0',
          userId: '＠kierabernie0',
          post: [
            {
              img: `${require('@/assets/home/Group785@3x.png')}`,
              type: 'unlock',
              price: 30,
              lockCount: 25,
              like: 'unlike',
              interval: 5000
            }
          ]
        },
        {
          avatar: `${require('@/assets/home/user-4@3x.png')}`,
          userName: '👑 Kiera Bernie1',
          userId: '＠kierabernie1',
          post: [
            {
              img: `${require('@/assets/home/Group785-1@3x.png')}`,
              type: 'unlock',
              price: 25,
              lockCount: 25,
              like: 'unlike',
              interval: 3000
            },
            {
              img: `${require('@/assets/home/Group785@3x.png')}`,
              type: 'unlock',
              price: 30,
              lockCount: 25,
              like: 'unlike',
              interval: 10000
            },
            {
              img: `${require('@/assets/home/Group785@3x.png')}`,
              like: 'like'
            }
          ]
        },
        {
          avatar: `${require('@/assets/home/user-4@3x.png')}`,
          userName: '👑 Kiera Bernie2',
          userId: '＠kierabernie2',
          post: [
            {
              img: `${require('@/assets/home/Group785@3x.png')}`,
              type: 'unlock',
              price: 30,
              lockCount: 25,
              like: 'unlike',
              interval: 7000
            }
          ]
        },
        {
          avatar: `${require('@/assets/home/user-4@3x.png')}`,
          userName: '👑 Kiera Bernie3',
          userId: '＠kierabernie3',
          post: [
            {
              img: `${require('@/assets/home/Group785-1@3x.png')}`,
              type: 'unlock',
              price: 25,
              lockCount: 25,
              like: 'unlike'
            },
            {
              img: `${require('@/assets/home/Group785@3x.png')}`,
              type: 'unlock',
              price: 30,
              lockCount: 25,
              like: 'unlike'
            },
            {
              img: `${require('@/assets/home/Group785-1@3x.png')}`,
              like: 'like'
            },
            {
              img: `${require('@/assets/home/Group785@3x.png')}`,
              like: 'like'
            }
          ]
        }
      ],
      allUserDataIndex: undefined,
      timeoutID: undefined,
      lockAction: ''
    }
  },
  computed: {
    dynamicInfo () {
      return this.allUserData[this.allUserDataIndex]
    },
    dynamicShowList () {
      return this.allUserData[this.allUserDataIndex].post
    }
  },
  watch: {
    allUserDataIndex: {
      handler (newVal) {
        const self = this
        if (self.dynamicShowList.length === 1) {
          if (self.dynamicShowList[0].interval) {
            self.interval = self.dynamicShowList[0].interval
          }
          setTimeout(() => {
            const rightClick = document.getElementsByClassName('el-carousel__arrow el-carousel__arrow--right')[0]
            rightClick.addEventListener('click', (e) => {
              self.nextUser()
            })
            const leftClick = document.getElementsByClassName('el-carousel__arrow el-carousel__arrow--left')[0]
            leftClick.addEventListener('click', (e) => {
              self.prevUser()
            })
          }, 150)
          self.timeoutID = setTimeout(() => {
            this.nextUser()
          }, self.interval)
        }
      }
    },
    autoplayTimeLimitedDynamicShowCarousel: {
      handler (newVal) {
        const self = this
        if (newVal) {
          if (self.lockAction === 'nextUser' && self.dynamicShowList.length === 1) {
            self.lockAction = ''
            self.timeoutID = setTimeout(() => {
              self.nextUser()
              // console.log('autoplayTimeLimitedDynamicShowCarousel')
            }, 300)
          }
        }
      }
    }
  },
  mounted () {
    this.allUserDataIndex = 0
  },
  methods: {
    openNnlockModal (price) {
      this.$emit('open-unlock-modal', price)
    },
    nextUser () {
      if (!this.autoplayTimeLimitedDynamicShowCarousel) {
        this.lockAction = 'nextUser'
        return
      }
      if (this.allUserDataIndex === this.allUserData.length - 1) {
        this.allUserDataIndex = 0
      } else {
        this.allUserDataIndex++
      }
      this.updateUser()
    },
    prevUser () {
      if (this.allUserDataIndex === 0) {
        this.allUserDataIndex = this.allUserData.length - 1
      } else {
        this.allUserDataIndex--
      }
      this.updateUser()
    },
    updateUser () {
      this.resetTimeLimitedDynamicShow = false
      setTimeout(() => {
        this.resetTimeLimitedDynamicShow = true
      }, 5)
      if (this.timeoutID) {
        clearTimeout(this.timeoutID)
        this.timeoutID = undefined
      }
    },
    updateInterval (interval) {
      this.interval = interval
    }
  }
}
</script>

<style lang="scss" scoped>
#time-limited-dynamic-show-list {
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(360deg, #23272b 0%, #4b4b4b 100%);
}
</style>
