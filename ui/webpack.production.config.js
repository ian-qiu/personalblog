var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
  entry: {
    web:path.resolve(__dirname, 'app/common/web.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/depend'),
    publicPath: '/ui/depend/',
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    loaders: [
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ["es2015","stage-0","react"]
            }
        },
        {
            test: /\.less$/,
            loader: 'style!css!less'
        },
        {
          test: /\.styl$/,
          loader: 'style!css!postcss!stylus'
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap!')
        },
        {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        },
        {
           test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
           loader : 'url?prefix=font/&limit=10000'
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css",{allChunks: true}),
    new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
        favicon:'./app/img/favicon.ico', //favicon路径
        filename:'../index.html',    //生成的html存放路径，相对于 path
        template:'./dist/template.html',    //html模板路径
        excludeChunks:['app','web'], //跳过指定模块//如果加载的模块没有加载css,将不会插入css静态文件
        inject:true,    //允许插件修改哪些内容，包括head与body
        hash:true,    //为静态资源生成hash值
        minify:{    //压缩HTML文件
           removeComments:false,    //移除HTML中的注释
           collapseWhitespace:false    //删除空白符与换行符
        }
     }),
    new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
