/* eslint-disable no-unused-vars */
// 这里的api环境根据开发需求进行切换， 和构建环境没有任何关系

// 测试
/* 
 测试: 暂无
 正式：http://admin.xinzhongjituan.com
 */

// 测试环境
const test = {
    VUE_APP_API_WS: '',
};

// 开发环境
const dev = {
    // VUE_APP_API_WS: '/opc',
    // VUE_APP_API_WS: 'http://huyapreadmin.oxldkm.com',
    // VUE_APP_API_WS: 'http://huyapre.oxldkm.com/',
    VUE_APP_API_WS: 'https://beta.x9zb.live/',
    // VUE_APP_API_WS: 'http://huyapretest.oxldkm.com/',
    // VUE_APP_API_WS: 'https://www.x9zb.live/',
    // VUE_APP_API_WS: 'https://huidu.x9zb.live/',
    // VUE_APP_API_WS: '/',
};

/**
 * 本地环境（本项目）
 * */
const locd = {
    VUE_APP_API_WS: '',
};

/**
 * 本地环境
 * */
 const loc = {
    VUE_APP_API_WS: '',
};

export default dev;
