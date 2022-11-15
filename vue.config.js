'use strict'
// const path = require('path')

// 如果你的端口设置为 80，
// 使用管理员权限执行命令行。
// 以 Mac 为例：sudo npm run
// 您可以通过以下方法更改端口：
// 端口 = 9528 npm run serve 或 npm run serve --port = 9528
const port = 8080 // 端口号
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productionGzipExtensions = ['js', 'css']
// 所有配置项说明可在 https://cli.vuejs.org/zh/guide/ 中找到
module.exports = {
  /**
    * 如果您打算在子路径下部署站点，则需要设置 publicPath，
    * 例如 GitHub 页面。 如果您打算将站点部署到 https://foo.github.io/bar/，
    * 那么 publicPath 应该设置为“/bar/”。
    * 大多数情况下请使用'/' !!!
    * 详情：https://cli.vuejs.org/config/#publicpath
    */
  // 基本路径，vue-cli 3.3以前请使用baseUrl （部署应用时的基本 URL）
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  //输出文件目录（build时文件输出的目录）
  outputDir: 'dist',
  //用于嵌套生成的静态资产（js，css，img，fonts）的目录 / build时生成的相对于outputDir的静态资源的目录（js、css、img、font）
  assetsDir: 'static',
  lintOnSave: false, // process.env.NODE_ENV === 'development',
  //生产环境sourceMap / 是否在构建生产包时生成sourceMap文件，false将提高构建速度 （用来显示报错信息的，生产环境中一般不需要）（常用）
  productionSourceMap: false,
 // 本地服务器，所有 webpack-dev-server 的选项都支持（常用）
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // clientsClaim: true, //service worker是否应该在任何现有客户端激活后立即开始控制它
      skipWaiting: true,//service worker是否应该跳过等待生命周期阶段，用于清除缓存，强制等待中的service-worker被激活
      // navigateFallback: 'index.html',
      // globPatterns: ['**/*.{html,js,css,png.jpg}'], // 匹配的文件
      // globIgnores: ['service-wroker.js'], // 忽略的文件
      // runtimeCaching: [{
      //   urlPattern: new RegExp('/api'),//相关接口正则配置，跨域接口必须以 ‘^’开头，配置完整域名
      //   handler: 'NetworkFirst',//缓存策略，网络请求优先。
      //   options: {
      //     cacheableResponse: {
      //       statuses: [0, 200]
      //     }
      //   }
      // }]
    }
  },
  devServer: {
    before: require('./mock/index.js'),
    port: port,
    open: true, // npm run serve后自动打开页面
    disableHostCheck : true,
    proxy:{
      'opc':{
        target : "http://huyapre.oxldkm.com/", //实际请求服务器地址
        // target : "http://huyapretest.oxldkm.com/", //实际请求服务器地址
        // target : "https://www.x9zb.live/", //实际请求服务器地址
        // target : "http://huidu.x9zb.live/", //实际请求服务器地址
        changeOrigin : true,
        secure : false,
        pathRewrite : {
            "^/opc" : ""
        }
      }
    },
    overlay: {
      warnings: false,
      errors: true
    },
  },
  
  configureWebpack: (config) =>{
    if(process.env.NODE_ENV === 'production'){
      config.plugins.push(
        //建構時開啟gzip,降低服務器壓縮對CPU資源占用,服務器也相應開啟gzip
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets:false
        }),
        new UglifyJsPlugin({
          uglifyOptions:{
            output:{
              comments:false,
            },
            compress:{
              drop_console:true,
              drop_debugger:false,
              pure_funcs:['console.log']
            }
          },
          parallel: true, //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        }),
      )
    }
  },
  chainWebpack: (config) => {
    // const TerserPlugin = require('terser-webpack-plugin');

    config
      .plugin('html')
      .tap(args => {
        // 设置网页标题
        args[0].title = '小九直播2022高清小九直播，足球即时比分直播，NBA篮球直播在线免费观看'
        return args
      })
    
    let drop_debugger_statue = process.env.NODE_ENV !== 'production';
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive:true, quality:65 },
        optipng: { enabled:false },
        pngquant:{ quality:[0.9,0.98],speed:4 },
        gifsicle:{ interlaced:false },
        webp:{ quality:75 },
      })
    config.optimization
      .minimize(true)
      .minimizer('terser')
      .tap(args => {
        let { terserOptions } = args[0]
        terserOptions.compress.drop_debugger = drop_debugger_statue
        // let test = new TerserPlugin({
        //   terserOptions: {
        //     mangle: true,
        //     compress: {
        //       drop_debugger: false
        //     }
        //   }
        // })
        return args
      })
  },
}
