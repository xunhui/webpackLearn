let uglify = require('uglifyjs-webpack-plugin');
let htmlPlugin = require('html-webpack-plugin')
let entry = require('./entry.config.js')
let webpack = require('webpack')
let copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    //入口文件的配置项
    entry: entry.path,
    //出口文件的配置项
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules: [
            //打包css
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    //postcss来解决浏览器兼容性问题
                    {loader: "postcss-loader"}
                ]
            },
            //转换、打包less  需要less-loader解析
            {
               test: /\.less$/,
               use: ["style-loader","css-loader","less-loader"] 
            },
            //转换、打包sass
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpg|png|gif)/,
                use: [
                    {
                        loader: "url-loader",
                        options:{
                            limit:500000
                        }
                    }
                ]
            },
            //打包img标签引入的图片
            {
                test: /\.(html|htm)$/,
                use: {
                    loader: 'html-withimg-loader'
                }
            },
            //babel 转化js格式
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        //压缩js代码
        new webpack.optimize.UglifyJsPlugin(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
           
        }),
        //文件开头的标注
        new webpack.BannerPlugin('cc的学习之旅~'),
        //打包静态资源文件
        new copyWebpackPlugin([{
            from: __dirname + '/src/public',
            to: './public'
        }])
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:__dirname + '/dist',
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717,
        inline: true//实时刷新
    },
    resolve: { 
        alias: { 
            'vue': 'vue/dist/vue.js' 
        } 
    },
    //watch的配置 自动打包代码
    watchOptions:{
        //检测修改的时间，以毫秒为单位
        poll:1000, 
        //不监听的目录
        ignored:/node_modules/, 
    }
}