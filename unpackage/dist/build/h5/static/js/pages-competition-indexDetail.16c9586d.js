(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-competition-indexDetail"],{"0414":function(t,i,e){var a=e("818d");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("34f3728a",a,!0,{sourceMap:!1,shadowMode:!1})},"2ecc":function(t,i,e){"use strict";e.r(i);var a=e("e52a"),n=e("4843");for(var d in n)"default"!==d&&function(t){e.d(i,t,(function(){return n[t]}))}(d);e("4620");var l,r=e("f0c5"),s=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"45942db3",null,!1,a["a"],l);i["default"]=s.exports},4620:function(t,i,e){"use strict";var a=e("0414"),n=e.n(a);n.a},4843:function(t,i,e){"use strict";e.r(i);var a=e("fd19"),n=e.n(a);for(var d in a)"default"!==d&&function(t){e.d(i,t,(function(){return a[t]}))}(d);i["default"]=n.a},"818d":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */#msgForm[data-v-45942db3]{opacity:0;position:absolute;width:100%;height:100%;z-index:9999}#fileUp[data-v-45942db3]{position:absolute;width:100%;height:100%}.detail-th[data-v-45942db3]{color:#333;font-size:%?28?%;padding:%?22?% 0;background-color:#f3f3f7}.detail-th .detail-th-tr[data-v-45942db3]{flex:1;padding:0 %?24?%}.detail-th .detail-th-tr uni-text[data-v-45942db3], .detail-th .detail-th-tr uni-view[data-v-45942db3]{flex:1;text-align:center}.detail-th .detail-th-box[data-v-45942db3]{padding:0 %?64?%}.detail-left[data-v-45942db3]{color:#999;width:%?184?%;font-size:%?24?%;text-align:center;align-self:flex-start}.detail-left uni-view[data-v-45942db3]{display:block;padding:%?26?% 0;margin-bottom:%?2?%}.active[data-v-45942db3]{color:#e3ac72;position:relative;background-color:#fff}.active[data-v-45942db3]::after{content:"";width:%?6?%;position:absolute;top:0;bottom:0;left:0;background-color:#e3ac72}.detail-right[data-v-45942db3]{color:#999;background-color:#fff;align-self:flex-start;padding:0 %?24?%}.detail-right .detail-right-li[data-v-45942db3]{padding:%?10?% 0;margin-bottom:%?2?%}.detail-right .detail-right-li uni-view[data-v-45942db3], .detail-right .detail-right-li uni-text[data-v-45942db3]{flex:1;text-align:center}',""]),t.exports=i},e52a:function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return d})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"detail"},[e("downloadHead"),e("v-uni-view",{staticClass:"detail-th flex"},[e("v-uni-view",{staticClass:"detail-th-box"},[t._v("公司")]),e("v-uni-view",{staticClass:"flex-around detail-th-tr"},[e("v-uni-text",[t._v("主")]),e("v-uni-text",[t._v("盘口")]),e("v-uni-text",[t._v("客")]),e("v-uni-view",{},[e("v-uni-text",[t._v("变盘时间")])],1)],1)],1),e("v-uni-view",{staticClass:"detail-content flex"},[e("v-uni-view",{staticClass:"detail-left"},t._l(t.list,(function(i,a){return e("v-uni-view",{class:a==t.tabIndex?"active":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.setIndex(a)}}},[t._v(t._s(i.name))])})),1),e("v-uni-scroll-view",{staticStyle:{"max-height":"90vh","align-self":"flex-start"},attrs:{"scroll-y":"true"}},[e("v-uni-view",{staticClass:"detail-right",staticStyle:{flex:"1"}},t._l(t.child,(function(i,a){return e("v-uni-view",{key:a,staticClass:"detail-right-li flex-around"},[e("v-uni-text",[t._v(t._s(i.host))]),e("v-uni-text",[t._v(t._s(i.early))]),e("v-uni-text",[t._v(t._s(i.guest))]),e("v-uni-view",{},[e("v-uni-view",[t._v(t._s(i.date))]),e("v-uni-view",[t._v(t._s(i.change_time))])],1)],1)})),1)],1)],1)],1)},d=[]},fd19:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{tabIndex:0,list:[],child:[]}},onLoad:function(t){var i=this;this.$u.get("api/Football/football_odds_history_detail",{id:t.id,type:0==t.index?"asia":1==t.index?"eu":"bs"}).then((function(e){i.list=e,i.child=e[t.idx].list,i.tabIndex=t.idx}))},methods:{setIndex:function(t){this.tabIndex=t,this.child=this.list[t].list}}};i.default=a}}]);