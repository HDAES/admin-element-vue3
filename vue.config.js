'use strict'

const path = require('path')
module.exports = {
    publicPath: './',
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: false,
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,

    configureWebpack: {
        resolve: {
            alias: {
              '@': path.join(__dirname, 'src') 
            }
        },
        plugins: [
           
        ]
    },
    
}