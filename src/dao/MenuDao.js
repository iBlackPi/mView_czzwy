const Menu = require('../entity/Resource');

const menuDao = {};
//此处请求的数据在回调函数中，非同步执行，所以controller中使用时数据并不时同步的
//所以controller中的数据处理逻辑必须在下面的回调中执行，故此处参数fn就是用来传递controller中的处理函数
menuDao.find = (fn) => {
    Menu.findAll().then((res) => {
        if(res){
            fn(res);
        }else{
            fn(false);
        }
    })
};

module.exports = menuDao;