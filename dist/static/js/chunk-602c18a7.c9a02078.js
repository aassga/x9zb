(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-602c18a7"],{"31e2":function(t,s,i){},"58f6":function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"anchor-dynamic-detail-home-page",staticStyle:{margin:"0 auto"}},[t._m(0),s("div",{staticClass:"anchor-dynamic-detail-home-page-main"},[s("div",{staticClass:"left-content"},[s("div",{staticClass:"anchor-dynamic-header-wraps"},[s("div",{staticClass:"header-img"},[s("div",{staticClass:"lazyload-wrapper"},[t.dateil.info?s("img",{staticClass:"anchorHeader",attrs:{src:t.dateil.info.avatar}}):t._e()])]),t.dateil.info?s("div",{staticClass:"other-info"},[s("div",{staticClass:"title"},[t._v(t._s(t.dateil.info.user_nickname))]),s("div",{staticClass:"time-info"},[s("span",[t._v(t._s(t.dateil.info.addtime))]),s("a",{attrs:{target:"_blank",href:"anchor/live?anchorId=101555"}},[t._v("进入直播间")])])]):t._e(),s("div",{staticClass:"btn"},[t._v("＋ 关注")])]),s("div",{staticClass:"anchor_news_content_wraps"},[s("a",{staticClass:"content",attrs:{target:"_blank",href:"/anchor-dynamic?postId=100273"}},[t.dateil.info?s("p",[t._v(t._s(t.dateil.info.content))]):t._e()]),s("div",{staticClass:"anchor-news-imglist"},[t.dateil.info&&0==t.dateil.info.is_flie_type?s("div",{staticClass:"anchor-news-imglist"},t._l(t.dateil.info.flie,(function(i,a){return s("div",{staticClass:"img-box-wrapper",class:1==t.dateil.info.flie.length?"img-box-one-wrapper":""},[s("img",{attrs:{src:i}})])})),0):s("div",{staticClass:"img-box-one-wrapper",staticStyle:{position:"relative"}},[s("img",{attrs:{src:t.dateil.info.flie[0].img}}),t._m(1)])]),s("div",{staticClass:"oter_info_wrap anchor_personal_page"},[s("div",{staticClass:"item pl_item"},[s("span",{staticClass:"pl_bg icon_bg"}),s("span",{staticClass:"num"},[t._v(t._s(t.dateil.info.comment))])]),s("div",{staticClass:"item dz_item",on:{click:function(s){return t.anchorDynamicsCommentLikes(t.dateil.info)}}},[s("span",{staticClass:"dz_bg icon_bg",class:1==t.dateil.info.is_likes?"dz_click":""}),s("span",{staticClass:"num"},[t._v(t._s(t.dateil.info.like))])]),t._m(2),t._m(3)])]),s("div",{staticClass:"comment_wrap"},[s("div",{staticClass:"all_coment"},[t._v("全部评论")]),s("div",{staticClass:"anchor_news_comment_input_wraps"},[s("div",{staticClass:"anchor_news_comment_input_left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"input_",attrs:{type:"text",placeholder:"说点什么吧",value:""},domProps:{value:t.content},on:{input:function(s){s.target.composing||(t.content=s.target.value)}}}),t._m(4)]),s("button",{staticClass:"submit_btn",on:{click:function(s){return t.setDynamicsComment(t.dateil.info,1)}}},[t._v("发送")])]),t._l(t.list.data,(function(i,a){return s("div",{key:a,staticClass:"comment_item_"},[s("div",{staticClass:"anchor_news_comment_item_wraps"},[s("div",{staticClass:"lazyload-wrapper"},[s("img",{staticClass:"touxiang",attrs:{src:i.avatar}})]),s("div",{staticClass:"comment_other_info"},[s("div",{staticClass:"name_title_wrap"},[s("div",{staticClass:"name_title"},[i.user_nickname?s("span",{staticClass:"name"},[t._v(t._s(i.user_nickname))]):t._e(),t._v(t._s(i.content))])]),s("div",{staticClass:"time_zan"},[s("span",{staticClass:"time"},[t._v(t._s(i.addtime))]),s("span",{staticClass:"replay",on:{click:function(s){return t.setComment(i)}}},[t._v(" 回复  ")]),s("div",{staticClass:"item dz_item",on:{click:function(s){return t.anchorDynamicsCommentLikes(i)}}},[s("span",{staticClass:"dz_bg icon_bg",class:1==i.is_likes?"dz_click":""}),s("span",{staticClass:"num"},[t._v(t._s(i.likes))])])])])]),0!=i.comment?s("div",{staticClass:"check_more_sub_reply_tip",on:{click:function(s){return t.commentList(i)}}},[s("span",{staticClass:"line"}),s("span",[t._v("查看回复")]),s("span",{staticClass:"reply_count"},[t._v(t._s(i.comment))])]):t._e(),s("div",{staticClass:"reply_input_ reply_input_1"}),i.isShow?s("div",t._l(i.children.data,(function(a,e){return s("div",{staticClass:"reply_list_layer2"},[s("div",{staticClass:"reply_list_layer2_item"},[s("div",{staticClass:"anchor_news_comment_item_wraps layer2_"},[s("div",{staticClass:"lazyload-wrapper"},[s("img",{staticClass:"touxiang",attrs:{src:a.avatar}})]),s("div",{staticClass:"comment_other_info"},[s("div",{staticClass:"name_title_wrap"},[s("div",{staticClass:"name_title"},[s("span",{staticClass:"name layer2_name"},[i.user_nickname?s("span",[t._v(t._s(a.user_nickname))]):t._e(),s("span",{staticClass:"txt"},[t._v("  回复  ")]),i.user_nickname?s("span",[t._v(t._s(i.user_nickname))]):t._e()]),t._v(t._s(a.content))])]),s("div",{staticClass:"time_zan"},[s("span",{staticClass:"time"},[t._v(t._s(a.addtime))]),s("div",{staticClass:"item dz_item",on:{click:function(s){return t.anchorDynamicsCommentLikes(a)}}},[s("span",{staticClass:"dz_bg icon_bg",class:1==a.is_likes?"dz_click":""}),s("span",{staticClass:"num"},[t._v(t._s(a.likes))])])])])])])])})),0):t._e(),t.isComment==i.id?s("div",{staticClass:"reply_input_ reply_input_2"},[s("div",{staticClass:"anchor_news_comment_input_wraps"},[s("div",{staticClass:"anchor_news_comment_input_left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.content2,expression:"content2"}],staticClass:"input_",attrs:{type:"text",placeholder:"回复： "+t.isrep.user_nickname,value:""},domProps:{value:t.content2},on:{input:function(s){s.target.composing||(t.content2=s.target.value)}}}),t._m(5,!0)]),s("button",{staticClass:"submit_btn",on:{click:function(s){return t.setDynamicsComment(t.dateil.info,2)}}},[t._v("发送")])])]):t._e()])})),s("div",{staticClass:"page-box"})],2)]),s("div",{staticClass:"right-recommend"},[s("div",{staticClass:"anchor-dynamic-other"},[t._m(6),s("div",{staticClass:"empty-box"},[s("div",{staticClass:"common-empty-view"},[s("el-empty",{attrs:{"image-size":140,image:i("6568")}})],1)])])])])])},e=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"breadcrumb",staticStyle:{"padding-top":"60px"}},[s("span",{staticClass:"adress"},[t._v("当前位置： ")]),s("span",{staticClass:"breadcrumb-link"},[s("a",{attrs:{href:"/"}},[t._v("首页")]),s("span",{staticClass:"breadcrumb-arrow"},[t._v(">")])]),s("span",{staticClass:"breadcrumb-link"},[s("a",{attrs:{href:"/personal-space?headerNavIndex=2&id=2163615"}},[t._v("主播动态")]),s("span",{staticClass:"breadcrumb-arrow"},[t._v(">")])]),s("span",{staticClass:"breadcrumb-title"},[t._v("详情")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"mask"},[s("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg=="}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"item fx_item"},[s("span",{staticClass:"fx_bg icon_bg"}),s("span",{staticClass:"num"},[t._v("分享")])])},function(){var t=this,s=t._self._c;return s("div",[s("div",{staticClass:"item jb_item"},[s("span",{staticClass:"jb_bg icon_bg"}),s("span",{staticClass:"num"},[t._v("举报")])])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"emoj-wrap"},[s("div",{staticClass:"common-emoji"},[s("div",{staticClass:"eomj-icon"})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"emoj-wrap"},[s("div",{staticClass:"common-emoji"},[s("div",{staticClass:"eomj-icon"})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"header"},[s("span",{staticClass:"title"},[t._v("其他动态")])])}],n=i("c24f"),c={data(){return{page:1,page1:1,list:{},router:{},dateil:{},content2:"",isrep:{},content:"",childrenlist:{},children:!1,isComment:null}},mounted(){this.router=this.$route.query,this.anchorDynamicsList()},methods:{anchorDynamicsCommentLikes(t){Object(n["b"])({id:t.id}).then(s=>{1==t.is_likes?(t.likes--,t.is_likes=0):(t.likes++,t.is_likes=1),console.log(t.is_likes)}).catch(t=>{})},commentLikes(t){Object(n["lb"])({id:t.id}).then(s=>{console.log(t.is_likes),1==t.is_likes?(t.is_likes=0,t.like++):(t.like--,t.is_likes=1)}).catch(t=>{})},setDynamicsComment(t,s){let i={id:t.id,content:1==s?this.content:this.content2};console.log(this.isrep),2==s&&(i.cid=this.isrep.id),Object(n["mb"])(i).then(t=>{this.anchorDynamicsList()}).catch(t=>{})},commentList(t){let s={id:t.id,page:this.page};if(t.isShow)return t.isShow=!t.isShow;Object(n["n"])(s).then(s=>{t.children=s.data,t.isShow=!t.isShow}).catch(t=>{})},setComment(t){if(this.isComment==t.id)return this.isComment=null;this.isComment=t.id,this.isrep=t},anchorDynamicsList(){let t={id:this.router.id,page:this.page};Object(n["c"])(t).then(t=>{t.data.list.data.forEach(t=>{t.isShow=!1}),this.dateil=t.data,this.list=t.data.list,console.log(this.dateil)}).catch(t=>{})}}},l=c,o=(i("cea9"),i("0c7c")),r=Object(o["a"])(l,a,e,!1,null,null,null);s["default"]=r.exports},6568:function(t,s,i){t.exports=i.p+"static/img/qsy.03f1fcee.png"},cea9:function(t,s,i){"use strict";i("31e2")}}]);