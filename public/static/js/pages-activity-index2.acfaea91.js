(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-activity-index2"],{"03e5":function(t,e,i){var n=i("0f45");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("6c522960",n,!0,{sourceMap:!1,shadowMode:!1})},"0b2f":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var n={uMask:i("98b1").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"active"},[n("v-uni-scroll-view",{staticStyle:{height:"100vh",width:"100%"},attrs:{"scroll-y":"true"}},[n("v-uni-view",{staticClass:"active-content"},[n("v-uni-view",{staticClass:"header flex"},[n("v-uni-text",[n("a",{attrs:{href:t.system.CustomerService}},[t._v("在线客服")])]),n("v-uni-image",{attrs:{src:i("c0cb"),mode:""}}),n("v-uni-text",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showDetail=!0}}},[t._v("活动详情")])],1),n("v-uni-view",{staticClass:"active-pan"},[n("v-uni-view",{staticClass:"active-pan-tips"},[t._v("剩余"),n("v-uni-text",[t._v(t._s(t.indexNum))]),t._v("次机会")],1),n("my-turntable-draw",{ref:"raffleWheel",attrs:{num:t.indexNum,width:t.boxData.width,height:t.boxData.height,prizeList:t.prizeList,targetIndex:t.targetIndex},on:{befoterClick:function(e){arguments[0]=e=t.$handleEvent(e),t.befoterClick.apply(void 0,arguments)},afterClick:function(e){arguments[0]=e=t.$handleEvent(e),t.afterClick.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"active-nav"},[n("v-uni-view",{staticClass:"active-head flex"},t._l(t.numericalList,(function(e,i){return n("v-uni-view",{class:i==t.numericalIndex?"numerical-active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getIndex(i)}}},[t._v(t._s(e))])})),1),1==t.numericalIndex?n("v-uni-view",{staticStyle:{padding:"60rpx 70rpx"}},[n("v-uni-scroll-view",{staticStyle:{"z-index":"99",width:"100%",height:"400rpx"},attrs:{"scroll-y":"true"}},t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"flex li",staticStyle:{"padding-bottom":"20rpx"}},[n("v-uni-view",{staticClass:"name"},[t._v(t._s(e.user_nickname))]),n("v-uni-view",{staticClass:"border"}),n("v-uni-view",{staticClass:"text"},[t._v("抽中")]),n("v-uni-view",{staticClass:"gift"},[t._v("获得"+t._s(0==e.num?"":e.num)+t._s(e.gift_name))])],1)})),1)],1):n("Msgbar",{ref:"msgbar",staticStyle:{"z-index":"99",padding:"60rpx 70rpx"},attrs:{height:"400rpx",width:"100%",list:t.list},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.data;return[n("v-uni-view",{staticClass:"flex li"},[n("v-uni-view",{staticClass:"name"},[t._v(t._s(i.user_nickname))]),n("v-uni-view",{staticClass:"border"}),n("v-uni-view",{staticClass:"text"},[t._v("抽中")]),n("v-uni-view",{staticClass:"gift"},[t._v("获得"+t._s(0==i.num?"":i.num)+t._s(i.gift_name))])],1)]}}])})],1)],1)],1),n("u-mask",{attrs:{show:t.showDetail},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showDetail=!1}}},[n("v-uni-view",{staticClass:"detail-mask"},[n("v-uni-view",{staticClass:"detail-content",domProps:{innerHTML:t._s(t.article.post_content)}})],1)],1),n("u-mask",{attrs:{show:t.showPup},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPup=!1}}},[n("v-uni-view",{staticClass:"pup-mask"},[n("v-uni-view",{staticClass:"pup-content flex-center"},[n("v-uni-image",{attrs:{src:t.selectAll.gift_img,mode:"aspectFill"}}),n("v-uni-text",[t._v(t._s(0==t.selectAll.num?"":"获得"+t.selectAll.num)+t._s(t.selectAll.gift_name))]),n("v-uni-view",[t._v("立即领取")])],1)],1)],1)],1)},r=[]},"0f45":function(t,e,i){var n=i("24fb"),a=i("1de5"),r=i("9455"),s=i("53a5"),o=i("16fd");e=n(!1);var c=a(r),u=a(s),l=a(o);e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.detail-mask[data-v-04849ef0]{width:%?642?%;height:%?856?%;margin:0 auto;overflow:hidden;margin-top:%?200?%;background:url(/static/images/activity/detail.png) top/100% 100% no-repeat}.detail-mask .detail-content[data-v-04849ef0]{height:%?554?%;padding:%?32?%;border-radius:%?20?%;margin:%?200?% %?64?% %?44?%;background-color:#fff;box-shadow:0 %?6?% %?12?% rgba(0,0,0,.16)}.pup-mask[data-v-04849ef0]{width:%?642?%;height:%?856?%;margin:0 auto;overflow:hidden;margin-top:%?200?%;background:url(/static/images/activity/pup.png) top/100% 100% no-repeat}.pup-mask .pup-content[data-v-04849ef0]{margin:%?330?% %?200?% 0}.pup-mask .pup-content uni-image[data-v-04849ef0]{height:%?240?%}.pup-mask .pup-content uni-text[data-v-04849ef0]{color:#fff1e0;margin-top:%?32?%}.pup-mask .pup-content uni-view[data-v-04849ef0]{width:100%;height:%?86?%;color:#fff1e0;text-align:center;margin-top:%?50?%;line-height:%?86?%;border-radius:%?44?%;background:-webkit-linear-gradient(top,#f25d5f,#fd3436);background:linear-gradient(180deg,#f25d5f,#fd3436);box-shadow:0 6px 12px rgba(218,38,40,.39)}.li .border[data-v-04849ef0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin:0 %?14?%;max-width:%?200?%;border-bottom:%?2?% dashed #ccc}.li .text[data-v-04849ef0]{margin-right:%?6?%}.li .gift[data-v-04849ef0]{width:%?200?%;color:#e05b32}.header[data-v-04849ef0]{font-size:%?28?%;padding:%?30?% 0}.header uni-text[data-v-04849ef0]{color:#87390e;padding:%?12?% %?32?%;background-color:#ffdfab;border-radius:%?120?%}.header uni-image[data-v-04849ef0]{width:%?212?%;height:%?82?%}.active-pan[data-v-04849ef0]{width:%?532?%;height:%?676?%;margin:0 auto;position:relative;background:url('+c+") top/100% 100% no-repeat}.active-pan .active-pan-tips[data-v-04849ef0]{color:#fff;position:absolute;bottom:%?36?%;left:0;right:0;text-align:center}.active-pan .active-pan-tips uni-text[data-v-04849ef0]{color:#ffdfab}.active-nav[data-v-04849ef0]{width:%?640?%;height:%?620?%;margin:0 auto;overflow:hidden;background:url("+u+") top/100% 100% no-repeat}.active-nav .active-head[data-v-04849ef0]{font-size:%?28?%;margin:%?10?% %?126?%;border:%?2?% solid #fedbe1;border-radius:%?8?%}.active-nav .active-head uni-view[data-v-04849ef0]{color:#fff;font-weight:700;padding:%?14?% %?40?%}.active-nav .active-head .numerical-active[data-v-04849ef0]{color:#d4505a;background-color:#fedbe1}.active[data-v-04849ef0]{min-height:130vh;position:fixed;top:0;left:0;right:0}.active-content[data-v-04849ef0]{left:0;right:0;height:100%;padding-bottom:170px;overflow:hidden;background:url("+l+") top/100% 100% no-repeat}.active-content .title[data-v-04849ef0]{width:100%;height:%?200?%}",""]),t.exports=e},"16fd":function(t,e,i){t.exports=i.p+"static/img/icon-bg2.29311d77.png"},"1de5":function(t,e,i){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"2b8a":function(t,e,i){var n=i("24fb"),a=i("1de5"),r=i("68e5");e=n(!1);var s=a(r);e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.raffle-wheel[data-v-93232d7e]{position:relative;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-repeat:no-repeat;background-position:50%;background-size:contain}.raffle-wheel-box[data-v-93232d7e]{border-radius:50%;overflow:hidden;background-color:#f2f2f2;box-shadow:1px 1px 1px 1px #ffe9aa;position:relative}.raffle-wheel-show[data-v-93232d7e]{width:100%;height:100%;border-radius:50%;position:relative;overflow:hidden}.item-block[data-v-93232d7e]{width:100%;height:100%;position:absolute}.item-view-block[data-v-93232d7e]{position:absolute;top:0;right:0;width:50%;height:50%;-webkit-transform-origin:0 100%;transform-origin:0 100%}.item-view[data-v-93232d7e]{box-sizing:border-box;position:absolute;top:0;left:50%;width:25%;height:50%;-webkit-transform-origin:center 100%;transform-origin:center 100%;font-size:%?26?%;text-align:center;padding-top:%?20?%}.item-view uni-text[data-v-93232d7e]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;width:100%;line-height:%?30?%}.item-view uni-image[data-v-93232d7e]{display:block;width:%?50?%;height:%?50?%;margin:%?10?% auto 0}.raffle-wheel__action[data-v-93232d7e]{position:absolute;top:calc(50% - 50px);left:calc(50% - 50px);width:94px;height:94px;background-repeat:no-repeat;background-position:50%;background-size:contain;background-image:url('+s+")}@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){.raffle-wheel__action[data-v-93232d7e]{background-image:url("+s+")}}@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){.raffle-wheel__action[data-v-93232d7e]{background-image:url("+s+")}}",""]),t.exports=e},"41d2":function(t,e,i){"use strict";var n=i("03e5"),a=i.n(n);a.a},"438d":function(t,e,i){"use strict";i.r(e);var n=i("5b8d"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},"53a5":function(t,e,i){t.exports=i.p+"static/img/icon2.8ba0f3a1.png"},5613:function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{canvasWidth:{type:Number,default:400},canvasHeight:{type:Number,default:485},prizeList:{type:Array,validator:function(t){return t.length%2===0},required:!0},colors:{type:Array,default:function(){return["#FFF","#FFE9AA"]},validator:function(t){return 2===t.length}},duration:{type:Number,default:8},num:{type:Number,default:null},ringCount:{type:Number,default:8},strKey:{type:String,default:String},targetIndex:{type:Number,default:0}},watch:{prizeList:{immediate:!0,deep:!0,handler:function(t){this.color1=this.colors[0],this.color2=this.colors[1],this.setView()}}},data:function(){return{isClick:!0,isShow:!0,skew:0,degs:0,color1:"#FFF",color2:"#FFF",textWidth:"50%",rotates:0,isRoteIndex:0}},methods:{setView:function(){var t=this.prizeList.length;this.textWidth=180/t+"%";var e=360/t;t<4||(this.degs=e,this.skew=e-90)},handleAction:function(){return this.num<=0?this.$u.toast("转盘次数不足"):!!this.isClick&&(this.isClick=!1,void this.$emit("befoterClick",{type:"start",callback:this.rotoreAction}))},rotoreAction:function(t){var e=0;if(this.isShow){var i=this.prizeList.length-1;e=(i-t)*this.degs+360*this.ringCount,this.isShow=!1,this.rotates+=e+this.degs/2}else e=-(t-this.isRoteIndex)*this.degs+360*this.ringCount,this.rotates+=e;this.isRoteIndex=t,this.setTimeOut()},setTimeOut:function(){var t=this;setTimeout((function(){console.log("转动结束"),t.$emit("afterClick",{type:"end",content:t.prizeList[t.targetIndex],callback:t.endAction}),t.isClick=!0}),1e3*this.duration+100)},endAction:function(){console.log("本次选中的："+this.prizeList[this.targetIndex].gift_name)}}};e.default=n},"5b8d":function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{speed:{type:Number,default:2e3},count:{type:Number,default:5},width:{type:String,default:"100%"},height:{type:String,default:"500rpx"},list:{type:Array,default:function(){return[]}}}};e.default=n},"68e5":function(t,e,i){t.exports=i.p+"static/img/icon4.93b9cfdb.png"},"72c8":function(t,e,i){"use strict";var n=i("4ea4");i("4160"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("ce30")),r=n(i("835a")),s={components:{Msgbar:r.default,myTurntableDraw:a.default},data:function(){return{num:null,list:[],showPup:!1,showDetail:!1,boxData:{width:266,height:338},selectAll:{},article:{},prizeList:[],targetIndex:0,indexNum:10,information:{token:""},numericalIndex:0,numericalList:["中奖名单","我的奖品"]}},watch:{},computed:{system:function(){return this.$store.state.system}},onLoad:function(t){var e=this;if(t.token){var i={token:t.token};this.information=i,this.$common.set("information",i)}setTimeout((function(){e.getNames()}),1e3),this.$u.get("api/Activity_Config/turntable",{}).then((function(t){e.prizeList=t.list,e.indexNum=t.num})),this.getDetail(),this.getTurntableList(0)},methods:{getIndex:function(t){1!=t||this.information.token?this.getTurntableList(t):(this.numericalIndex=0,this.$u.toast("请登录后重试"))},getDetail:function(){var t=this;this.$u.get("api/Portal_post/getList",{id:1}).then((function(e){e.forEach((function(e){35==e.id&&(t.article=e)}))}))},befoterClick:function(t){var e=this;"start"==t.type&&this.$u.post("api/Activity/open_turntable",{}).then((function(i){var n=null;e.indexNum--;e.prizeList.forEach((function(t,a){t.id==i.id&&(n=a,e.selectAll=t)}));e.targetIndex=n,t.callback&&t.callback(n)}))},getNames:function(){},afterClick:function(t){"end"==t.type&&(this.showPup=!0,console.log(t.content.count),t.callback&&t.callback())},toBefoterClick:function(t){var e=this;if(console.log("剩余次数："+this.indexNum),this.indexNum<=0)return!1;setTimeout((function(){e.indexNum--,e.$refs.raffleWheel.handleAction()}),100)},getTurntableList:function(t){var e=this;this.$u.get("api/Activity_Config/turntable_list",{type:t}).then((function(t){e.list=t}))}}};e.default=s},"7b37":function(t,e,i){"use strict";i.r(e);var n=i("5613"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},"835a":function(t,e,i){"use strict";i.r(e);var n=i("89a9"),a=i("438d");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("aa87");var s,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"33703c18",null,!1,n["a"],s);e["default"]=c.exports},8979:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.swiper-wrapper[data-v-33703c18]{position:relative}.swiper-wrapper .swiper[data-v-33703c18]{width:100%;height:%?300?%}.swiper-wrapper .mask[data-v-33703c18]{position:absolute;pointer-events:false;left:0;right:0;top:0;bottom:0;z-index:99}',""]),t.exports=e},"89a9":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"swiper-wrapper"},[i("v-uni-view",{staticClass:"mask"}),i("v-uni-swiper",{staticClass:"swiper",style:{width:t.width,height:t.height},attrs:{"indicator-dots":!1,autoplay:!0,interval:t.speed,duration:t.speed,circular:!0,vertical:!0,"display-multiple-items":t.count,"easing-function":"linear"}},t._l(t.list,(function(e){return i("v-uni-swiper-item",[i("v-uni-view",{staticClass:"swiper-item"},[t._t("item",[t._v(t._s(e))],{data:e})],2)],1)})),1)],1)},r=[]},9455:function(t,e,i){t.exports=i.p+"static/img/icon3.c20a2c61.png"},9851:function(t,e,i){var n=i("8979");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("55e397de",n,!0,{sourceMap:!1,shadowMode:!1})},"98b1":function(t,e,i){"use strict";i.r(e);var n=i("bd0a"),a=i("c28c");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("d543");var s,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"ff9dd99c",null,!1,n["a"],s);e["default"]=c.exports},a1c4:function(t,e,i){var n=i("2b8a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("45752208",n,!0,{sourceMap:!1,shadowMode:!1})},aa87:function(t,e,i){"use strict";var n=i("9851"),a=i.n(n);a.a},bd0a:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-mask",class:{"u-mask-zoom":t.zoom,"u-mask-show":t.show},style:[t.maskStyle,t.zoomStyle],attrs:{"hover-stop-propagation":!0},on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),function(){}.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[t._t("default")],2)},r=[]},bd44:function(t,e,i){var n=i("c59b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("b31ec8c4",n,!0,{sourceMap:!1,shadowMode:!1})},c0cb:function(t,e,i){t.exports=i.p+"static/img/logo.a935f96d.png"},c28c:function(t,e,i){"use strict";i.r(e);var n=i("fa11"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},c59b:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-mask[data-v-ff9dd99c]{position:fixed;top:0;left:0;right:0;bottom:0;opacity:0;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.u-mask-show[data-v-ff9dd99c]{opacity:1}.u-mask-zoom[data-v-ff9dd99c]{-webkit-transform:scale(1.2);transform:scale(1.2)}',""]),t.exports=e},cab0:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"raffle-wheel",style:{width:t.canvasWidth+44+"rpx",height:t.canvasHeight+44+"rpx"}},[i("v-uni-view",{staticClass:"raffle-wheel-box",staticStyle:{width:"430rpx",height:"430rpx"}},[i("v-uni-view",{staticClass:"raffle-wheel-show",style:"transform: rotate("+t.rotates+"deg);transition-duration: "+t.duration+"s;"},t._l(t.prizeList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item-block"},[i("v-uni-view",{staticClass:"item-view-block",style:"transform: rotate("+t.degs*n+"deg) skewY("+t.skew+"deg);background: "+(n%2>0?t.color1:t.color2)+";"}),i("v-uni-view",{staticClass:"item-view",style:"transform: translateX(-50%) rotate("+(t.degs*n+t.degs/2)+"deg);width: "+t.textWidth+";"},[i("v-uni-text",[t._v(t._s(e.gift_name)+t._s(0!=e.num?"*"+e.num:""))]),i("v-uni-image",{attrs:{src:e.gift_img,mode:"aspectFill"}})],1)],1)})),1),i("v-uni-view",{staticClass:"raffle-wheel__action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleAction.apply(void 0,arguments)}}})],1)],1)},r=[]},ce30:function(t,e,i){"use strict";i.r(e);var n=i("cab0"),a=i("7b37");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("ef4b");var s,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"93232d7e",null,!1,n["a"],s);e["default"]=c.exports},d543:function(t,e,i){"use strict";var n=i("bd44"),a=i.n(n);a.a},eb93:function(t,e,i){"use strict";i.r(e);var n=i("0b2f"),a=i("f5d7");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("41d2");var s,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"04849ef0",null,!1,n["a"],s);e["default"]=c.exports},ef4b:function(t,e,i){"use strict";var n=i("a1c4"),a=i.n(n);a.a},f5d7:function(t,e,i){"use strict";i.r(e);var n=i("72c8"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},fa11:function(t,e,i){"use strict";var n=i("4ea4");i("a9e3"),i("b64b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("5530")),r={name:"u-mask",props:{show:{type:Boolean,default:!1},zIndex:{type:[Number,String],default:""},customStyle:{type:Object,default:function(){return{}}},zoom:{type:Boolean,default:!0},duration:{type:[Number,String],default:300},maskClickAble:{type:Boolean,default:!0}},data:function(){return{zoomStyle:{transform:""},scale:"scale(1.2, 1.2)"}},watch:{show:function(t){t&&this.zoom?this.zoomStyle.transform="scale(1, 1)":!t&&this.zoom&&(this.zoomStyle.transform=this.scale)}},computed:{maskStyle:function(){var t={backgroundColor:"rgba(0, 0, 0, 0.6)"};return this.show?t.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.mask:t.zIndex=-1,t.transition="all ".concat(this.duration/1e3,"s ease-in-out"),Object.keys(this.customStyle).length&&(t=(0,a.default)((0,a.default)({},t),this.customStyle)),t}},methods:{click:function(){this.maskClickAble&&this.$emit("click")}}};e.default=r}}]);