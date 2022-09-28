<template>
  <div class="msg-bar" :style="[barStyle]">
    <div
      class="msg-container"
      :style="{
        transform: 'translateY(-' + top + unit + ')',
        transition: 'all ' + (speed + 100) + 'ms linear'
      }"
    >
      <div
        v-for="(item, idx) in list"
        :key="item.id"
        class="msg-item"
        :style="{ top: item.idx * space + unit }"
      >
        <slot name="item" :data="item">
          {{ item }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
let timer = null

export default {
  props: {
    speed: {
      type: Number,
      default: 2000 // ms
    },
    // 间距
    space: {
      type: Number,
      default: 30 // px
    },
    // 最大渲染熟练
    maxLen: {
      type: Number,
      default: 20
    },
    // 单位
    unit: {
      type: String,
      default: 'px' // px
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200rpx'
    },
	list:{
		type: Array,
		default: []
	}
  },
  data() {
    return {
      // 是否是暂停状态
      isStop: true,
      isAutoStop: false,
      top: 0,
      startIdx: 0,
      startId: 0,
      // list: [],
      // 存储所有外部传入的数组 按照顺序
      cachedList: []
    }
  },
  computed: {
    barStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  created() {
    this.clear()
  },
  mounted() {
    // this.addData(['1', '2', '3', '4', '5', '6'])
    this.start()
    // #ifdef H5
    this.addListener()
    // #endif
  },
  beforeDestroy() {
    this.clear()
    // #ifdef H5
    this.removeListener()
    // #endif
  },
  methods: {
    // 监听页面显示 开始 页面隐藏 停止
    addListener() {
      document.addEventListener('visibilitychange', () => {
        this.toggleStart(document.visibilityState === 'visible')
      })
    },
    // 移除监听器
    removeListener() {
      document.removeEventListener('visibilitychange', () => {
        this.toggleStart(document.visibilityState === 'visible')
      })
    },
    // 切换状态
    toggleStart(isStart) {
      if (isStart) {
        this.start()
      } else {
        this.stop()
      }
    },
    // 添加数据
    addData(arr) {
      if (!Array.isArray(arr)) {
        return console.error('addData 参数必须是一个数组!')
      }
      // 存储数据
      arr.forEach(i => {
        this.cachedList.push({
          id: this.startId,
          data: i
        })
        this.startId++
      })
      if (this.list.length === 0) {
        /* 初始化 list */
        this.initData()
      }
    },
    /* 初始化 list */
    initData() {
      const len = this.cachedList.length

      if (len) {
        for (let i = 0; i < this.maxLen; i++) {
          // 如果 传入 arr 大于最大长度
          if (i < len) {
            this.addItem(this.cachedList[i])
          } else {
            this.addItem(this.cachedList[i % len])
          }
        }
      }
    },
    // 循环
    loopItem() {
      if (this.list.length > this.maxLen + 50) {
        this.list.splice(0, 50)
      }
      let idx = this.cachedList.findIndex(i => this.list[this.list.length - 1].id === i.id)

      this.addItem(this.cachedList[idx + 1] || this.cachedList[0])
    },
    // 增加项
    addItem(data) {
      this.list.push({ ...data, idx: this.startIdx })
      this.startIdx++
    },
    // 开始
    start() {
      if (!timer && this.list.length > 0) {
        this.isStop = false
        this.animate()
      }
    },
    // 停止
    autoStop() {
      if (!this.isStop) {
        this.isAutoStop = true
        this.clear()
      }
    },
    // 停止
    autoStart() {
      if (this.isAutoStop) {
        this.start()
        this.isAutoStop = false
      }
    },
    // 停止
    stop() {
      this.isStop = true
    },
    // 动画
    animate() {
      console.log('animate', timer)
      timer = setInterval(() => {
        if (this.isStop) {
          this.clear()
        } else {
          this.top += this.space
          this.loopItem()
        }
      }, this.speed)
    },
    // 清除动画
    clear() {
      clearInterval(timer)
      timer = null
    }
  }
}
</script>

<style lang="scss" scope>
.msg-bar {
  overflow: hidden;
  .msg-container {
    position: relative;
    width: 100%;
    // transition: all 1s linear;
    .msg-item {
      position: absolute;
      left: 60rpx;
      right: 60rpx;
    }
  }
}
</style>
