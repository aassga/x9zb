(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6dd10e0e"],{3248:function(t,a,i){"use strict";i.r(a);var s=function(){var t=this,a=t._self._c;return a("div",{staticClass:"anchor-page-content-wrap anchor-page-content-wrap-not-home"},[a("div",{staticClass:"personal-following-page"},[a("div",{staticClass:"nav"},t._l(t.list,(function(i,s){return a("div",{staticClass:"nav-item",class:s==t.tabIndex?"active":"",on:{click:function(a){t.tabIndex=s}}},[t._v(t._s(i))])})),0),a("div",{staticClass:"content-container"},[a("div",{staticClass:"content"},t._l(t.dataList,(function(s,e){return a("a",{key:e,staticClass:"item-container"},[a("div",{staticClass:"left"},[a("div",{staticClass:"img-container"},[a("div",{staticClass:"lazyload-wrapper"},[a("img",{attrs:{src:s.avatar||i("3f2d"),alt:"",width:"120",height:"120",title:""}})])]),a("a",{attrs:{target:"_blank",href:1==s.is_live?"/live?router=live&type="+(0==s.live.type?"football":"basketball")+"&id="+s.live.match_id+"&uid="+s.live.uid:"javascript:void(0)"}},[a("div",{staticClass:"info"},[a("div",{staticClass:"up"},[a("div",{staticClass:"name"},[t._v(t._s(s.user_nickname))]),a("div",{staticClass:"anchor-level",staticStyle:{width:"50px"}},[a("img",{attrs:{src:s.votestotal_icon}})]),a("div",{staticClass:"living"},[a("div",{class:1==s.is_live?"animation":"no-animation"},[a("div",{staticClass:"strip"}),a("div",{staticClass:"strip"}),a("div",{staticClass:"strip"})]),a("div",{staticClass:"live-img",class:1==s.is_live?"live":"no-live"})])]),a("div",{staticClass:"down"},[t._v(t._s(s.title))])])])]),a("div",{staticClass:"btn has",on:{click:function(a){return t.attention(s)}}},[t._v("取消关注")])])})),0),0==t.dataList.length?a("div",{staticClass:"no-data"},[t._m(0)]):t._e(),a("div",{staticClass:"page"})])])])},e=[function(){var t=this,a=t._self._c;return a("div",{staticClass:"no-data-react"},[a("img",{staticClass:"no-data-img",attrs:{src:i("6568"),alt:"no-data"}}),a("p",{staticClass:"no-data-text"},[t._v("暂未关注")])])}],n=i("c24f"),l={data(){return{page:1,tabIndex:0,dataList:[],list:["我关注的主播","我关注的作者","我关注的用户"]}},mounted(){this.getList()},watch:{tabIndex(t){this.getList()}},methods:{getList(){let t={page:this.page,type:this.tabIndex};Object(n["g"])(t).then(t=>{t.data.data.forEach(t=>{1==t.is_live&&"{}"!==JSON.stringify(t.live)?t.title=t.live.name+":"+t.live.home_name+"-"+t.live.away_name||"":0==t.is_live&&"{}"!==JSON.stringify(t.reserve)?t.title=t.reserve.name+" "+t.reserve.match_time+" "+t.reserve.home_name+"-"+t.reserve.away_name||"":t.title=""}),this.dataList=t.data.data}).catch(t=>{})},attention(t){console.log(t),Object(n["f"])({id:t.followed_id}).then(t=>{this.attentionList()}).catch(t=>{})}}},c=l,d=(i("ad5d"),i("0c7c")),o=Object(d["a"])(c,s,e,!1,null,"6ef4972d",null);a["default"]=o.exports},"5b63":function(t,a,i){},6568:function(t,a,i){t.exports=i.p+"static/img/qsy.03f1fcee.png"},ad5d:function(t,a,i){"use strict";i("5b63")}}]);