(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-352eb842"],{"046c":function(t,i,e){"use strict";e("547e")},"547e":function(t,i,e){},"628e":function(t,i,e){"use strict";e.d(i,"d",(function(){return a})),e.d(i,"b",(function(){return c})),e.d(i,"a",(function(){return l})),e.d(i,"i",(function(){return o})),e.d(i,"e",(function(){return n})),e.d(i,"f",(function(){return r})),e.d(i,"j",(function(){return d})),e.d(i,"h",(function(){return p})),e.d(i,"c",(function(){return m})),e.d(i,"g",(function(){return u}));var s=e("b775");function a(t){return Object(s["a"])({url:"api/Circle/designatedCategory",method:"get",params:t})}function c(t){return Object(s["a"])({url:"api/circle/index",method:"get",params:t})}function l(t){return Object(s["a"])({url:"api/Circleuser/insert",method:"post",data:t})}function o(t){return Object(s["a"])({url:"api/Circleuser/likes",method:"post",data:t})}function n(t){return Object(s["a"])({url:"api/Circleuser/favorites",method:"post",data:t})}function r(t){return Object(s["a"])({url:"api/Circleuser/logList",method:"get",params:t})}function d(t){return Object(s["a"])({url:"api/Circleuser/userPostList",method:"get",params:t})}function p(t){return Object(s["a"])({url:"api/circle/info",method:"get",params:t})}function m(t){return Object(s["a"])({url:"api/circle/classification",method:"get",params:t})}function u(t){return Object(s["a"])({url:"api/Circle/hotPost",method:"get",params:t})}},e902:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t._self._c;return i("div",{staticClass:"circle-page",staticStyle:{"padding-top":"60px","margin-top":"20px"}},[i("div",{staticClass:"page-bg"}),i("div",{staticStyle:{width:"100%"}},[i("div",{},[i("div",{staticClass:"circle-page-nav"},[i("div",{staticClass:"circle-page-nav-container"},[i("div",{staticClass:"circle-page-nav-mark",staticStyle:{transform:"translateX(0px)",width:"106px"}}),t._l(t.tabList,(function(e,s){return i("div",{staticClass:"circle-page-nav-item",class:t.tabIndex==s?"active":"",on:{click:function(i){t.tabIndex=s}}},[i("a",[i("div",{staticClass:"lazyload-wrapper"},[i("img",{staticClass:"circle-page-nav-icon",attrs:{src:e.icon,width:"64",height:"64"}})]),i("div",{staticClass:"circle-page-nav-text"},[t._v(t._s(e.name))])])])}))],2)])])]),i("div",{staticClass:"circle-page-content"},[i("div",{staticClass:"circle-page-left-container"},[t._m(0),i("div",{staticClass:"circle-page-comment-box"},[i("div",{staticClass:"circle-page-comment-box-title"},[t._v("大家都在体育发帖哦～")]),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"ant-input circle-page-comment-box-textarea",staticStyle:{"caret-color":"rgb(222, 173, 91)"},attrs:{placeholder:"我也要成为发帖小能手（想尬聊，点这里哦～）"},domProps:{value:t.title},on:{input:function(i){i.target.composing||(t.title=i.target.value)}}}),i("div",{staticClass:"circle-page-comment-box-operation-panel"},[i("div",{staticClass:"circle-page-comment-box-btns"},[i("el-popover",{staticStyle:{"margin-top":"45px"},attrs:{placement:"bottom",width:"500",offset:"10",trigger:"click"},model:{value:t.visible3,callback:function(i){t.visible3=i},expression:"visible3"}},[i("section",{staticClass:"emoji-mart-category",attrs:{"aria-label":"Smileys & People"}},[i("ul",{staticClass:"emoji-mart-category-list"},t._l(t.emotion,(function(e,s){return i("li",{on:{click:function(i){return t.setEmotion(e)}}},[i("img",{staticClass:"emoji-mart-emoji emoji-mart-emoji-native",attrs:{src:`https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${s}.gif`}})])})),0)])]),i("div",{staticClass:"circle-page-comment-box-emoji-btn",on:{click:function(i){t.visible3=!t.visible3}}}),i("el-popover",{staticStyle:{"margin-top":"45px"},attrs:{placement:"bottom",width:"500",offset:"10",trigger:"click"},model:{value:t.visible,callback:function(i){t.visible=i},expression:"visible"}},[i("div",[i("div",{staticClass:"ant-popover-title"},[i("div",{staticClass:"circle-page-comment-box-pop-title"},[i("div",[t._v("共"+t._s(t.flie.length)+"张，还能上传"+t._s(t.flie.length)+"张")]),i("span",{staticClass:"anticon anticon-close",attrs:{role:"img","aria-label":"close",tabindex:"-1"},on:{click:function(i){t.visible=!1}}},[i("i",{staticClass:"el-icon-close"})])])]),i("div",{staticClass:"ant-popover-inner-content"},[i("div",{staticClass:"circle-page-comment-box-image-pop flex-start"},[t._l(t.flie,(function(e,s){return i("div",{key:s,staticClass:"circle-page-comment-box-image-pop-upload-preview"},[i("div",{staticClass:"circle-page-comment-box-image-pop-upload-player"}),i("span",{staticClass:"anticon anticon-close circle-page-comment-box-pop-upload-img-del",attrs:{role:"img","aria-label":"close",tabindex:"-1"},on:{click:function(i){return t.del(s)}}},[i("i",{staticClass:"el-icon-close"})]),i("img",{attrs:{src:e,alt:""}})])})),i("div",{staticClass:"circle-page-comment-box-image-pop-upload-btn"},[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://"+t.QiniuToken.uploadHost,data:t.QiniuToken,"show-file-list":!1,"on-success":t.handleAvatarSuccess1,"before-upload":t.beforeAvatarUpload}},[i("span",{staticClass:"anticon anticon-plus",staticStyle:{"font-size":"46px",color:"rgb(226, 226, 226)"},attrs:{role:"img","aria-label":"plus"}},[i("svg",{attrs:{viewBox:"64 64 896 896",focusable:"false","data-icon":"plus",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"}},[i("path",{attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}}),i("path",{attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}})])])])],1)],2)])])]),i("div",{staticClass:"circle-page-comment-box-image-btn",on:{click:function(i){return t.uploadType("visible")}}}),i("el-popover",{staticStyle:{"margin-top":"45px"},attrs:{placement:"bottom",width:"500",offset:"10",trigger:"click"},model:{value:t.visible1,callback:function(i){t.visible1=i},expression:"visible1"}},[i("div",[i("div",{staticClass:"ant-popover-title"},[i("div",{staticClass:"circle-page-comment-box-pop-title"},[i("div",[t._v("上传视频，视频文件小于50M")]),i("span",{staticClass:"anticon anticon-close",attrs:{role:"img","aria-label":"close",tabindex:"-1"},on:{click:function(i){t.visible1=!1}}},[i("i",{staticClass:"el-icon-close"})])])]),i("div",{staticClass:"ant-popover-inner-content",staticStyle:{"padding-top":"10px"}},[i("div",{staticClass:"circle-page-comment-box-video-pop"},[i("span",{},[i("div",{staticClass:"ant-upload ant-upload-select ant-upload-select-text"},[i("span",{staticClass:"ant-upload flex-start",attrs:{tabindex:"0",role:"button"}},[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://"+t.QiniuToken.uploadHost,data:t.QiniuToken,"show-file-list":!1,"on-success":t.handleAvatarSuccess2,"before-upload":t.beforeAvatarUpload2}},[i("span",{staticStyle:{display:"block","text-align":"left"}},[t._v("上传视频")]),t.flieT[0].video?i("div",{staticClass:"circle-page-comment-box-video-pop-upload-btn",attrs:{id:""}},[i("img",{attrs:{width:"180",height:"120",src:"url="+t.flieT[0].video+"+?vframe/jpg/offset/0"}})]):i("div",{staticClass:"circle-page-comment-box-video-pop-upload-btn"},[i("span",{staticClass:"anticon anticon-plus",staticStyle:{"font-size":"46px",color:"rgb(226, 226, 226)"},attrs:{role:"img","aria-label":"plus"}},[i("svg",{attrs:{viewBox:"64 64 896 896",focusable:"false","data-icon":"plus",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"}},[i("path",{attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}}),i("path",{attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}})])])])]),i("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://"+t.QiniuToken.uploadHost,data:t.QiniuToken,"show-file-list":!1,"on-success":t.handleAvatarSuccess3,"before-upload":t.beforeAvatarUpload3}},[i("span",{staticStyle:{display:"block","text-align":"left"}},[t._v("上传封面")]),t.flieT[0].img?i("div",{staticClass:"circle-page-comment-box-video-pop-upload-btn",attrs:{id:""}},[i("img",{attrs:{width:"180",height:"120",src:t.flieT[0].img}})]):i("div",{staticClass:"circle-page-comment-box-video-pop-upload-btn"},[i("span",{staticClass:"anticon anticon-plus",staticStyle:{"font-size":"46px",color:"rgb(226, 226, 226)"},attrs:{role:"img","aria-label":"plus"}},[i("svg",{attrs:{viewBox:"64 64 896 896",focusable:"false","data-icon":"plus",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"}},[i("path",{attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}}),i("path",{attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}})])])])])],1)])])])])])]),i("div",{staticClass:"circle-page-comment-box-video-btn",on:{click:function(i){return t.uploadType("visible1")}}}),i("el-popover",{staticStyle:{"margin-top":"45px"},attrs:{placement:"bottom",width:"500",offset:"10",trigger:"click"},model:{value:t.visible2,callback:function(i){t.visible2=i},expression:"visible2"}},[i("div",{staticClass:"ant-popover-title"},[t._v("请选择圈子")]),i("div",{staticClass:"ant-popover-inner-content",staticStyle:{"padding-top":"10px"}},[i("div",{staticClass:"circle-page-comment-box-circle-pop"},[i("div",{staticClass:"circle-page-comment-box-circle-pop-content"},t._l(t.tabList,(function(e,s){return i("div",{key:s,staticClass:"circle-page-comment-box-circle-pop-item",on:{click:function(i){t.classification_id=s,t.visible2=!1}}},[i("img",{attrs:{src:e.icon,alt:""}}),i("div",[t._v(t._s(e.name))])])})),0)])])]),null==t.classification_id?i("div",{staticClass:"circle-page-comment-box-circle-btn",on:{click:function(i){return t.uploadType("visible2")}}}):t._e(),null!=t.classification_id?i("div",{staticClass:"circle-page-comment-box-selected-circle",on:{click:function(i){t.visible2=!t.visible2}}},[i("div",{staticClass:"circle-page-comment-box-circle-pop-item"},[i("img",{attrs:{src:"https://sta-prod-pic.hzmgrn.com/avatar/7d24648f4bba6a321a980e08f19cdd08.png",alt:""}}),i("div",[t._v(t._s(t.tabList[t.classification_id].name))])]),i("span",{staticClass:"anticon anticon-close",staticStyle:{color:"rgb(216, 173, 102)"},attrs:{role:"img","aria-label":"close",tabindex:"-1"},on:{click:function(i){i.stopPropagation(),t.classification_id=null,t.visible2=!1}}},[i("svg",{attrs:{viewBox:"64 64 896 896",focusable:"false","data-icon":"close",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"}},[i("path",{attrs:{d:"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}})])])]):t._e()],1),i("div",[i("div",{staticClass:"circle-page-comment-box-submit-btn",class:0!=t.title.length?"":"disabled",on:{click:function(i){return t.submit()}}},[t._v("发帖")])])])]),i("div",{staticClass:"circle-page-list"},[i("div",t._l(t.allcircleList.data,(function(e,s){return i("div",{staticClass:"circle-page-list-item"},[i("div",{staticClass:"circle-page-list-item-profile"},[i("router-link",{staticClass:"circle-page-list-item-profile-left",attrs:{tag:"a",target:"_blank",to:"/circle-detail?id="+e.id}},[i("div",{staticClass:"lazyload-wrapper"},[i("img",{staticClass:"circle-page-list-item-author-icon",attrs:{src:e.avatar,width:"48",height:"48"}})]),i("div",{staticClass:"circle-page-list-item-author-name"},[t._v(t._s(e.user_nickname))])]),i("div",{staticClass:"circle-page-list-item-profile-right"},[i("div",{staticClass:"circle-page-list-item-post-date"},[t._v(t._s(e.addtime))]),i("div",{staticClass:"circle-page-list-item-dianzan-count",class:1==e.is_likes?"active":"",on:{click:function(i){return t.likes(e)}}},[t._v(t._s(e.likes))]),i("div",{staticClass:"circle-page-list-item-comment-count",on:{click:function(i){return t.$common.gotDown()}}},[t._v(" "+t._s(e.comment))])])],1),i("div",{staticClass:"circle-page-list-item-content"},[i("div",{staticClass:"circle-page-list-item-content-info"},[i("router-link",{staticClass:"circle-page-list-item-content-text",attrs:{tag:"a",target:"_blank",to:"/circle-detail?id="+e.id},domProps:{innerHTML:t._s(t.getText(e.title))}}),i("div",{staticClass:"circle-page-list-item-content-sub-info"},[i("span",{staticClass:"circle-page-list-item-circle-name",attrs:{target:"_blank",href:"/community/circle-list?circleId=1"}},[t._v(t._s(e.classification_name))])])],1),0==e.is_flie_type&&"[]"!=JSON.stringify(e.flie)?i("div",{staticClass:"circle-page-list-item-content-imgs"},[i("div",{staticClass:"lazyload-wrapper"},[e.flie?i("img",{staticClass:"circle-page-list-item-content-img item-index-0",attrs:{preview:"1",src:e.flie[0],width:"220",height:"152"}}):t._e()])]):t._e()])])})),0),i("div",{staticClass:"circle-page-list-box"},[i("div",{staticClass:"circle-page-list-load-more",on:{click:function(i){!(t.allcircleList.data.length>=t.allcircleList.total)&&t.getmore()}}},[t._v(t._s(t.allcircleList.data.length>=t.allcircleList.total?"没有更多了":"点击加载更多"))])])])]),i("div",{staticClass:"circle-page-right-container"},[i("div",{staticStyle:{width:"100%"}},[i("div",{},[i("div",{staticClass:"circle-page-post-rank"},[i("div",{staticClass:"circle-page-post-rank-title"},[i("div",{staticClass:"circle-page-post-rank-title-text"},[t._v("热贴排行")]),i("div",{staticClass:"circle-page-post-rank-range-list"},t._l(t.hotList,(function(e,s){return i("div",{key:s,staticClass:"circle-page-post-rank-range-item",class:s==t.hotIndex?"active":"",on:{click:function(i){t.hotIndex=s}}},[t._v(t._s(e)+" ")])})),0)]),i("div",{staticClass:"circle-page-post-rank-content"},[t._l(t.hotPostList,(function(e,s){return i("div",{key:s,staticClass:"li",staticStyle:{"border-bottom":"1px solid #f2f2f2",padding:"16px 16px 16px 0"}},[i("router-link",{staticClass:"circle-page-post-rank-content-text text-clamp2",staticStyle:{height:"40px","line-height":"20px"},attrs:{tag:"a",target:"_blank",to:"/circle-detail?id="+e.id},domProps:{innerHTML:t._s(t.getText(e.title))}}),i("div",{staticClass:"flex",staticStyle:{color:"#9497a4","font-size":"12px","padding-right":"16px"}},[i("span",[t._v(t._s(t.$common.timeStamp1(e.addtime)))]),i("span",[t._v("热度："+t._s(e.click))])])],1)})),0==t.hotPostList.length?i("div",{staticClass:"circle-page-post-rank-is-empty"},[i("div",{staticClass:"circle-page-post-rank-is-empty-text"},[t._v("暂无数据")])]):t._e()],2)])])])])])])},a=[function(){var t=this,i=t._self._c;return i("div",{staticClass:"circle-page-hot-post"},[i("div",{staticClass:"circle-page-hot-post-title"},[t._v("热门帖子")]),i("div",{staticClass:"circle-page-hot-post-content"})])}],c=(e("14d9"),e("628e")),l=e("f358"),o={data(){return{page:1,title:"",tabIndex:0,emotion:l,hotList:["日","周","月"],hotIndex:0,flie:[],flieT:[{img:"",video:""}],visible:!1,visible1:!1,visible2:!1,visible3:!1,allcircleList:{data:[]},hotPostList:[],tabList:[],imgsrc:"",classification_id:null}},mounted(){this.hotPost(),this.circleHot(),this.classification()},computed:{infos(){return this.$store.state.infos},QiniuToken(){return this.$store.state.user.QiniuToken}},watch:{hotIndex(){this.hotPost()},tabIndex(t){this.page=1,0==t?this.circleHot():this.designatedCategory()}},methods:{hotPost(){Object(c["g"])({type:this.hotIndex}).then(t=>{this.hotPostList=t.data}).catch(t=>{})},setEmotion(t){this.title=this.title+t},designatedCategory(){let t={page:this.page,id:this.tabList[this.tabIndex].id};Object(c["d"])(t).then(t=>{1==this.page?(this.allcircleList=t.data.list,console.log(this.allcircleList)):this.allcircleList.data=[...this.allcircleList.data,...t.data.list.data]}).catch(t=>{})},getmore(){this.page++,this.circleHot()},likes(t){Object(c["i"])({id:t.id}).then(i=>(this.$message.success("操作成功"),1==t.is_likes?(t.likes--,t.is_likes=0):(t.likes++,t.is_likes=1))).catch(t=>{})},uploadType(t){let i=this;"visible"==t&&(this.flieT[0].img||this.flieT[0].video)?this.rel("确定放弃上传视频吗？",t):"visible1"==t&&0!=this.flie.length?this.rel("确定放弃上传图片吗？",t):i[t]=!i[t]},rel(t,i){let e=this;this.$confirm(t,"确认信息",{distinguishCancelAndClose:!0,confirmButtonText:"取消",cancelButtonText:"确定"}).then(()=>{}).catch(t=>{"visible"==i?(e.visible=!0,e.visible1=!1,e.flie=[]):(e.visible=!1,e.visible1=!0,e.flieT=[{img:"",video:""}])})},del(t){this.flie.splice(t,1),console.log(this.flie)},classification(){Object(c["c"])().then(t=>{this.tabList=t.data}).catch(t=>{})},beforeAvatarUpload(t){let i=this.$store.state.user.QiniuToken;console.log(i);const e=(new Date).valueOf().toString()+this.$common.rand()+t.name.slice(t.name.lastIndexOf("."));i.data=t,i.key=""+e},handleAvatarSuccess1(t){this.$message.success("图片上传成功"),this.flie.push(`${this.QiniuToken.domain}/${t.key}`)},handleAvatarSuccess2(t,i,e){this.flieT[0].video=`${this.QiniuToken.domain}/${t.key}`,this.$message.success("图片上传成功")},beforeAvatarUpload3(t){let i=this.$store.state.user.QiniuToken;const e=(new Date).valueOf().toString()+this.$common.rand()+t.name.slice(t.name.lastIndexOf("."));i.data=t,i.key=""+e},handleAvatarSuccess3(t){this.$message.success("封面上传成功"),this.flieT[0].img=`${this.QiniuToken.domain}/${t.key}`},getText(t){let i=/\[(.*?)\]/g,e=t.match(i);return e?(this.emotion.forEach((i,s)=>{e.map(e=>{i===e&&(t=t.replace(e,`<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${s}.gif'>`))})}),t):t},beforeAvatarUpload2(t){let i=this.$store.state.user.QiniuToken;const e=t.size/1024/1024<50;if(-1==["video/mp4","video/ogg","video/flv","video/avi","video/wmv","video/rmvb"].indexOf(t.type))return this.$message.error("请上传正确的视频格式"),!1;if(!e)return this.$message.error("上传视频大小不能超过50MB哦!"),!1;const s=(new Date).valueOf().toString()+this.$common.rand()+t.name.slice(t.name.lastIndexOf("."));i.data=t,i.key=""+s},circleHot(){Object(c["b"])({page:this.page}).then(t=>{1==this.page?this.allcircleList=t.data.list:this.allcircleList.data=[...this.allcircleList.data,...t.data.list.data]}).catch(t=>{})},submit(){if("{}"==JSON.stringify(this.infos))return this.$store.state.user.showLoginMask=!0;if(null==this.classification_id)return this.$message.warning("请选择圈子");let t={title:this.title,classification_id:this.tabList[this.classification_id].id};return t.title?this.flieT[0].video&&!this.flieT[0].img?this.$message.warning("请上传视频封面"):this.flieT[0].img&&!this.flieT[0].video?this.$message.warning("请上传视频"):(0!=this.flie.length?t.flie=this.flie:this.flieT[0].video&&(t.flie=this.flieT),void Object(c["a"])(t).then(t=>{this.circleHot(),this.flie=[],this.visible=!1,this.visible1=!1,this.visible2=!1,this.title="",this.flieT=[{img:"",video:""}],this.$message.success("审核中")}).catch(t=>{})):this.$message.warning("请输入内容")}}},n=o,r=(e("046c"),e("0c7c")),d=Object(r["a"])(n,s,a,!1,null,"506fd654",null);i["default"]=d.exports},f358:function(t){t.exports=JSON.parse('["[微笑]","[撇嘴]","[色]","[发呆]","[得意]","[流泪]","[害羞]","[闭嘴]","[睡]","[大哭]","[尴尬]","[发怒]","[调皮]","[龇牙]","[惊讶]","[难过]","[酷]","[冷汗]","[抓狂]","[吐]","[偷笑]","[可爱]","[白眼]","[傲慢]","[饥饿]","[困]","[惊恐]","[流汗]","[憨笑]","[大兵]","[奋斗]","[咒骂]","[疑问]","[嘘]","[晕]","[折磨]","[衰]","[骷髅]","[敲打]","[再见]","[擦汗]","[抠鼻]","[鼓掌]","[糗大了]","[坏笑]","[左哼哼]","[右哼哼]","[哈欠]","[鄙视]","[委屈]","[快哭了]","[阴险]","[亲亲]","[吓]","[可怜]","[菜刀]","[西瓜]","[啤酒]","[篮球]","[乒乓]","[咖啡]","[饭]","[猪头]","[玫瑰]","[凋谢]","[示爱]","[爱心]","[心碎]","[蛋糕]","[闪电]","[炸弹]","[刀]","[足球]","[瓢虫]","[便便]","[月亮]","[太阳]","[礼物]","[拥抱]","[强]","[弱]","[握手]","[胜利]","[抱拳]","[勾引]","[拳头]","[差劲]","[爱你]","[NO]","[OK]","[爱情]","[飞吻]","[跳跳]","[发抖]","[怄火]","[转圈]","[磕头]","[回头]","[跳绳]","[挥手]","[激动]","[街舞]","[献吻]","[左太极]","[右太极]"]')}}]);