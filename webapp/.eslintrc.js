let env = process.env.NODE_ENV;

module.exports = {
    // 默认情况下,ESLint会在所有父级组件中寻找配置文件,一直到根目录
    //ESLint一旦发现配置文件中有 "root": true,它就会停止在父级目录中寻找
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    //eslint解析器
    parser: 'babel-eslint',
    //环境定义了预定义的全局变量
    env: {
        //browser全局变量
        "browser": true,
        "node": true,
        "commonjs": true,
        "amd": true,
        "es6": true,
        "mocha": true
    },
    plugins: [
        //此插件用来识别.html和.vue文件中的js代码
        'html'
    ],
    extends: 'eslint:recommended',
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        //允许开发中使用debugger
        'no-debugger': env === 'production' ? 2 : 0,
        //允许开发中使用console
        'no-console': env === 'production' ? 2 : 0,
        'no-unused-vars': [2, {
            // 允许声明未使用变量
            "vars": "local",
            // 参数不检查
            "args": "none"
        }],
        // 关闭语句强制分号结尾
        "semi": [0],
        //空行最多不能超过100行
        "no-multiple-empty-lines": [0, {
            "max": 100
        }],
        //关闭禁止混用tab和空格
        "no-mixed-spaces-and-tabs": [0],
    }
};