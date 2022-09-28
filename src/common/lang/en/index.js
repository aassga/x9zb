const json = require('../lang-jason.json')
const messages = {};
(function setJson () {
  const newObj = {}
  for (const item of json) {
    messages[item.key] = item.en// 英文
  }
})()
export const lang = messages
