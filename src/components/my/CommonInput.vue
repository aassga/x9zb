<template>
<div>
  <input @change="onHandleInputChange" v-if="!disabled" :disabled="disabled" class="commoninput" :placeholder="placeholder" v-model="inputValue" :type="type" />
  <div v-else class="commoninput" @click="onHandleClick" >{{value ? value : placeholder}}</div>
</div>
</template>

<script>
export default {
  name: 'commoninput',
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    value: {
      type: String | Number,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    color: {
      type: String,
      default: '#f46fe0'
    }
  },
  watch: {
    inputValue (newV, oldV) {
      this.$emit('change', newV)
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  created () {
    this.inputValue = this.value
  },
  mounted () {},

  methods: {
    // 点击事件
    onHandleClick () {
      this.$emit('click-tap')
    },
    // 输入框值改变事件
    onHandleInputChange (value) {

    }
  }
}
</script>

<style lang="scss" scoped>
.commoninput {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  border: solid 1px #cccccc;
  font-family: PingFang TC;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #343a40;
  padding-left: 13px;
  box-sizing: border-box;
  &:focus {
    border: solid 1px #f46fe0;
  }
}
</style>
