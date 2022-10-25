const state = {
    user_info:{
        
    },//用户信息
    route_name:'my', // 为my的时候，是自己的个人主页，为userInfo的时候，是查看他人的
    // 用户类型
    user_type:1, // 1为用户  2为模特  3为公司 4为用户检视视角
    // 打开的侧边栏弹框的类型
    model_type: null, // 0为互动报告，1为营收报告  2为充值弹框  3为提现弹框
    att_list:[], // 用户关注的列表
    collectList:[], //收藏的贴文数据
    amount:0, // 账户的金币数
    model_combo:[],//模特用户的解锁套餐设定
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    stateName: '',//城市的id
    WSURL: '',//websocket服务器地址
    gift_list:[],
    currentCity:{},//当前城市的信息,
    chat_list:[],
    otherAccountInfo: {}, //切換帳號列表
    wsReConnect:0,
    unReadMsgNum:0,
    banUser: []
}
export default state