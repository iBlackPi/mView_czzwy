const merge = require('webpack-merge');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
    output: {
        chunkFilename: 'js/pages/[name].js',
        filename: 'js/[name].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/entry/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
});