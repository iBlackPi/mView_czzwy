const os = require('os');
const path = require('path');
const webpack = require('webpack');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const happyPack = require('happypack');

const threadPool = happyPack.ThreadPool({
    size: os.cpus().length
});

function createHappyPlugin(id, loaders) {
    return new happyPack({
        id,
        loaders,
        threadPool
    })
}

//webpack性能优化
module.exports = {
    entry: {
        //入口文件
        index: ['@/entry/index'],
        //ui插件
        iview: ['iview'],
        //vue全家桶
        vue: ['vue', 'vue-router', 'vuex', 'axios'],
        //兼容文件
        compatible: ['babel-polyfill', '@/assets/util/compatible/index.js'],
        //其余较小的插件
        other: ['qs', 'js-base64']
    },
    output: {
        path: path.resolve(__dirname, './../dist')
    },
    module: {
        rules: [/*{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude: /node_modules/,
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, */{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS: true
            }
        }, {
            test: /\.js$/,
            use: ['happypack/loader?id=happy-js']
        }, {
            test: /\.less$/,
            use: extractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'less-loader']
            })
        }, {
            test: /\.css$/,
            use: extractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader']
            })
        }, {
            test: /\.(png|jpeg|jpg|svg|gif)$/i,
            loader: 'url-loader',
            options: {
                limit: 2048,
                name: 'imgs/[path][name].[ext]'
            }
        }, {
            test: /\.(ttf|woff|eot|woff2)$/i,
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]'
            }
        }, {
            test: /\.(html|HTML)$/,
            loader: 'html-withimg-loader'
        },{
            test: /\.(json|geojson)$/,
            use: {
                loader: 'json-loader'
            }
        }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['other', 'iview', 'vue', 'compatible', 'runtime']
        }),
        new extractTextWebpackPlugin('[name].css'),
        createHappyPlugin('happy-js', [{
            loader: 'babel-loader'
        }]),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    //todo 配置.vue后缀
    resolve: {
        extensions: ['.js', '.json', '.vue', '.scss', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    }
};