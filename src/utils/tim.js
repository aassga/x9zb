import TIM from 'tim-js-sdk'
// import COSSDK from 'cos-js-sdk-v5'
import genTestUserSig from '../../public/sdk/GenerateTestUserSig.js'

// 初始化 SDK 实例
const tim = TIM.create({
  SDKAppID: genTestUserSig('').SDKAppID
})

window.setLogLevel = tim.setLogLevel

// 无日志级别
tim.setLogLevel(0)

// // 注册 cos
// tim.registerPlugin({'cos-js-sdk':COSSDK})
export default tim