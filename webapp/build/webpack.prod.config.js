const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const parallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const baseConfig = require('./webpack.base.config.js');

/*
//webpack没有性能优化
module.exports = merge(baseConfig, {
    output: {
        chunkFilename: 'js/[name].[hash:5].js',
        filename: 'js/[name].[hash:5].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/entry/index.html',
            minify: {
                //去掉注释
                removeComments: true,
                //去掉空格
                collapseWhitespace: true,
                //压缩html里的js(使用uglify-js进行的压缩)
                minifyJS: true,
                //压缩html里的css(使用clean-css进行的压缩)
                minifyCSS: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                properties: false,
                warnings: false
            },
            output: {
                quote_keys: true
            },
            mangle: {
                screw_ie8: false
            }
        }),
        new optimizeCssAssetsWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
});
*/


//webpack性能优化
module.exports = merge(baseConfig, {
    output: {
        chunkFilename: 'js/[name].[hash:5].js',
        filename: 'js/[name].[hash:5].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/entry/index.html',
            minify: {
                //去掉注释
                removeComments: true,
                //去掉空格
                collapseWhitespace: true,
                //压缩html里的js(使用uglify-js进行的压缩)
                minifyJS: true,
                //压缩html里的css(使用clean-css进行的压缩)
                minifyCSS: true
            }
        }),
        new parallelUglifyPlugin({
            uglifyJS: {
                compress: {
                    properties: false,
                    warnings: false
                },
                output: {
                    quote_keys: true
                }
            }
        }),
        //todo 可以配置公共路径 baseURL这样就可以在页面中只写方法路径，而api的地址端口可以配置在公共路径中
        new optimizeCssAssetsWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        })
    ]
});