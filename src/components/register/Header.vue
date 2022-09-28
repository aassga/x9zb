<template>
  <div id="header">
    <div class="back"
        @click="$emit('back')"
        v-if="isvisible"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isvisible: Boolean,
    default: true

  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
    width: 100%;
    height: 44px;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 9;
    background-color: #f1f0ef;
  	box-shadow: 0px 1px 0px 0px	rgba(0, 0, 0, 0.3);
    .back {
        width: 29px;
        height: 29px;
        background: url('~@/assets/ic-arrow-large-left@3x.png') 1rem center no-repeat;
        background-size: auto 29px;
        position: absolute;
        top: 7px;
        // left: 1px;
    }
}
</style>
