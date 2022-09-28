const webpack = require('webpack')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 端口
const port = process.env.port || process.env.npm_config_port || 8081
// const proxyIP = 'http://yoloshow.com:9010/ys' //代理服务器地址
console.log(process.env.API_URL)
module.exports = {
  devServer: {
    compress: true,
    disableHostCheck: true,
    port: port,
    // open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: { // 配置跨域
      '/v1': {
        target: process.env.VUE_APP_API_URL, // 代理地址
        changOrigin: true, // 允许跨域
        ws: true
        // pathRewrite: {
        //    '^/api': '/api',//重写,
        //  }
      },
      '/upload': {
        target: 'ws://apupload.kongljie0.info', // 代理地址
        changOrigin: true,
        ws: true
      }
    }
  },
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    resolve: { // 快捷路径
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].buildDate = new Date()
      return args
    })
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  }

}
