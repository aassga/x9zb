<template>
<div class="launch">
  <div class="logo"></div>
</div>
</template>

<script>
export default {
  name: 'launch',
  mounted () {
    setTimeout(() => {
      this.$router.push('login')
    }, 800)
  }
}
</script>

<style lang="scss" scoped>
.launch {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: url('~@/assets/bg.jpg') no-repeat center center / 100% 100%;
    background-size: 100% 100%;
    .logo {
        position: fixed;
        left: calc(50vw - 206px/2);
        top: calc(50vh - 201px/2);
        height: 201px;
        width: 206px;
        background: url('~@/assets/YoloShow-logo-V@3x.png') no-repeat center center / 100% 100%;
        background-size: 206px 201px;
    }
}
</style>
