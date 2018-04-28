const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
//todo 与最下面插件配合使用 ？？
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
    output: {
        chunkFilename: 'js/[name].js',
        filename: 'js/[name].js'
    },
    devServer: {
        historyApiFallback: true,
        /*proxy: {
            '**!/!*.do': {
                target: 'http://localhost:3000'
            },
            '/api/': {
                target: 'http://localhost:9000',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }*/
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/entry/index.html'
        }),
    ]
});