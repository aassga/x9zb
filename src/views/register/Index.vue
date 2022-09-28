<template>
  <div id="register">
    <component :is="currentStep"
      @change-current-step="changeCurrentStep"
      @show-agreememt-modal="isShowAgreememtModal=true"
      @get-interest-model="getInterestModel"
      :interestModelList="interestModelList"
    ></component>
    <AgreememtModal v-if="isShowAgreememtModal" :visible="isShowAgreememtModal" @close="isShowAgreememtModal=false"/>
  </div>
</template>

<script>
import AgreememtModal from '@/components/register/AgreememtModal.vue'
import CreateAccount from '@/components/register/CreateAccount.vue'
import ChoiceModels from '@/components/register/ChoiceModels.vue'
import ChoiceInterest from '@/components/register/ChoiceInterest.vue'
import SmsCode from '@/components/register/SmsCode.vue'
export default {
  name: 'Register',
  components: {
    AgreememtModal,
    CreateAccount,
    ChoiceModels,
    ChoiceInterest,
    SmsCode
  },
  data () {
    return {
      isShowForgetPwdModal: false,
      isShowAgreememtModal: false,
      currentStep: 'CreateAccount',
      interestModelList: []
    }
  },
  created () {
    if (localStorage.getItem('registeremail')) {
      this.currentStep = 'SmsCode'
      localStorage.setItem('needResend', '1')
    }
  },
  methods: {
    changeCurrentStep (step) {
      if (step === 'ChoiceInterest') {
        localStorage.removeItem('registeremail')
      }
      this.currentStep = step
    },
    // 获取子组件传过来的列表
    getInterestModel (list) {
      this.interestModelList = list
    }
  }
}
</script>

<style lang="scss">
#register {
  height: 100%;
}
#register_create_account, #choice-interest, #choice-models {
  padding: 36px;
  padding-top: 44px;
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
