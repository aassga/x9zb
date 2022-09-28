<template lang="pug">
  .postphotobg
    .addbg
        label(for="cheese")
          .addicon
            span.up_icon
              i.icon-add-document
              span 上传封面
        input(id="cheese" type="file" style="display:none" accept='image/*' name="file" @change="fileChange($event)" multiple)

    .showImgBox(v-if="showImgs.length > 0")
      .pic.ml-3(v-for="item,index in showImgs" :key="index")
        .imgbg.h-100.w-100
          .close(@click="delimg(index)")
            span X
          img(v-if="item !== 'none'" :src="item")
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PostPhoto',
  data () {
    return {
      showImgs: [],
      apiImgs: [],
      maxImgCount: 15,
      loadings: [false],
      imgSort: [],
      boolSort: []
    }
  },
  computed: {
    ...mapState({
      storeshowImgs: ({ post }) => post.showImgs,
      postRequestData: ({ post }) => post.postRequestData,
      storeloadings: ({ post }) => post.loadings
    }),
    getWidth () {
      return (window.innerWidth - 30) / 3 - 24 + 'px'
    },
    showImgNotice () {
      const role = new URL(location.href).searchParams.get('role')
      if (role !== '2') {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    // this.setHeaderMoreIsShow(false)
    this.$store.dispatch('resetPostRequestData')
    this.showImgs = this.storeshowImgs
    this.imgSort = this.storeshowImgs.slice(1)
    this.apiImgs = this.postRequestData.photo
    this.loadings = this.storeloadings
    this.boolSort = this.storeloadings.slice(1)
  },
  beforeDestroy () {
    // this.$store.dispatch('setShowImgs',{ img: this.showImgs, loading: this.loadings })
    // this.setShowImgs({ img: this.showImgs, loading: this.loadings })
  },
  methods: {
    ...mapActions({
      // setHeaderMoreIsShow: 'infoheader/setIsShow',
      // setShowImgs: 'post/setShowImgs'
    }),
    delimg (index) {
      const delindex = this.getDelIndex(index)
      this.imgSort.splice(delindex, 1)
      this.apiImgs.splice(delindex, 1)
      this.boolSort.splice(delindex, 1)
      // < 15 has add button
      if (this.imgSort.length < 15) {
        this.showImgs = [...this.imgSort]
        this.loadings = [false, ...this.boolSort]
      } else {
        this.showImgs = [...this.imgSort]
        this.loadings = [...this.boolSort]
      }
      this.$emit('getPhoto', this.apiImgs)
    },
    getDelIndex (index) {
      if (this.imgSort.length === 15) {
        return index
      } else {
        return index - 1
      }
    },
    fileChange (event) {
      const input = event.target
      let files = Array.from(input.files)
      const hasImgsCount = files.length + (this.showImgs.length - 1)
      if (hasImgsCount > this.maxImgCount) {
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
      files = files.filter((val) => {
        return val.size < 1024 * 1024 * 8
      })
      if (overCount > 0) {
        this.$toast.center(overCount + '张图档过大, 请重新选择')
      }

      Object.values(files).forEach((val, index) => {
        // +1 bks have add item
        // 限制上传照片数
        if (this.showImgs.length < this.maxImgCount + 1) {
          this.apiImgs.push(val)
          this.imgSort.unshift('none')
          this.boolSort.unshift(true)
          this.showImgs.unshift('none')
        }
        // 到达最大照片数 取消按钮
        if (this.showImgs.length === this.maxImgCount + 1) {
          this.showImgs.shift()
        }

        const reader = new FileReader()
        reader.readAsDataURL(val)
        reader.onload = (e) => {
          this.$set(this.imgSort, index, e.target.result)
          this.$set(this.boolSort, index, false)

          let temp = []
          let booltemp = []
          if (this.imgSort.length === 15) {
            temp = [...this.imgSort]
            booltemp = [...this.boolSort]
          } else {
            temp = [...this.imgSort]
            booltemp = [false, ...this.boolSort]
          }
          this.$set(this, 'showImgs', temp)
          this.$set(this, 'loadings', booltemp)
          this.$emit('getPhoto', this.apiImgs)
        }
        reader.onerror = (e) => {
          this.$set(this.loadings, index, false)
          this.delimg(index)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.addbg,
.showImgBox {
  display: block;
}
.addbg {
  height: 40px;
  margin: 10px auto;
}
.showImgBox {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
    width: 0px !important;
    height: 0px !important;
    background: transparent;
    -webkit-appearance: none;
  }
  .pic {
    position: relative;
    width: 30%;
    margin-right: 10px;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      background: rgba(255,255,255,.8);
      color: #333;
      height: 20px;
      width: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
    }
    .imgbg {
      width: 100%;
      img {
        width: 100%;
        height: 80px;
      }
    }
  }
}

.up_icon {
  span {
    color: #6c757d;
  }
}
.icon-add-document {
  display: inline-block;
  border-radius: 50%;
  background: #f46fe0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  margin-right: 10px;
  font-size: 25px;
}
</style>
