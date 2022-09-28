const json = require('../lang-jason.json')
const messages = {};
(function setJson () {
  for (const item of json) {
    messages[item.key] = item.tc// 繁体中文
  }
})()

export const lang = messages
