var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry:{
        app:['webpack/hot/dev-server', path.resolve(__dirname, 'app/common/app.js')],
        main:['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    },
    output: {
    path: path.resolve(__dirname, 'build/depend'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: 'http://localhost:9090/'
},
devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
module: {
    loaders: [
        {   test: /\.jsx?$/,
            loader:'babel-loader',
            exclude: /node_modules/,
            query:{
                presets:['react', 'es2015', 'stage-0']
            }
        },
        {   test: /\.less$/, 
            loader:'style!css!less'
        },
        {   test: /\.styl$/,
            loader: 'css!stylus'
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap!')
        },
        {
            test: /\.css$/, 
            loader:'style!css'
        },
        {   test: /\.(png|jpg)$/, 
            loader:'url-loader?limit=25000'
        },
        {
            test   : /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
            loader : 'url?prefix=font/&limit=10000'
        }
    ]
},
    plugins:[
        new ExtractTextPlugin("style.css",{allChunks: true})
    ]
};

module.exports = config;



