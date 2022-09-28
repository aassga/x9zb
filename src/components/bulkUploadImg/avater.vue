<template>
  <input
    @change="fileChange($event)"
    multiple
    id="avater"
    class="avater"
    type="file"
    accept="image/*"
    name="file"
  />
  <!-- <slot></slot> -->
  <!-- </input> -->
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WebFeXcAvater',
  props: {
    count: {
      type: Number | String,
      default: 1
    }
  },
  data () {
    return {
      imgList: []
    }
  },

  mounted () {},

  methods: {
    fileChange (event) {
      const input = event.target
      let files = Array.from(input.files)
      const hasImgsCount = files.length + (this.imgList.length - 1)
      if (hasImgsCount > this.count) {
        this.$toast.center('上传图档已达上限, 删除图档后可再上传')
        return
      }

      // over 8MB cannot use
      let overCount = 0

      Object.values(files).forEach((val, index) => {
        if (val.size > 1024 * 1024 * 8) {
          overCount = overCount + 1
        }
      })
      files = files.filter(val => {
        return val.size < 1024 * 1024 * 8
      })
      if (overCount > 0) {
        this.$toast.center(overCount + '张图档过大, 请重新选择')
      }

      console.log(files)

      Object.values(files).forEach((val, index) => {
        // +1 bks have add item
        // 限制上传照片数
        // if (this.imgList.length < this.count + 1) {
        //   this.apiImgs.push(val)
        //   this.imgSort.unshift('none')
        //   this.boolSort.unshift(true)
        //   this.showImgs.unshift('none')
        // }
        // 到达最大照片数 取消按钮
        // if (this.showImgs.length === this.maxImgCount + 1) {
        //   this.showImgs.shift()
        // }

        console.log(val)
        console.log(index)

        const reader = new FileReader()
        reader.readAsDataURL(val)
        reader.onload = e => {
          console.log(e)
        }
        reader.onerror = e => {
          console.log(e)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avater {
    opacity: 0;
    z-index: 999;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
