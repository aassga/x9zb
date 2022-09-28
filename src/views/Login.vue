<template>
  <div>
    <LoginIndex @show-forget-pwd-modal="isShowForgetPwdModal=true" />
    <ForgetPwdModal v-if="isShowForgetPwdModal" :visible="isShowForgetPwdModal" @close="isShowForgetPwdModal=false"/>
  </div>
</template>

<script>
import LoginIndex from '@/components/login/Index.vue'
import ForgetPwdModal from '@/components/login/ForgetPwdModal.vue'
export default {
  name: 'Login',
  components: {
    LoginIndex,
    ForgetPwdModal
  },
  data () {
    return {
      isShowForgetPwdModal: false
    }
  }
}
</script>

<style lang="scss">
#register_main {
  padding: 36px;
  padding-top: 10px;
}
input, button {
  &:focus {
    outline: none !important;
  }
}
input:focus {
  border: 1px solid #449fdb !important;
}
</style>
