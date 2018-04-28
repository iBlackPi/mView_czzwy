//用户表的映射类
const User = require('../entity/User');

const loginDao = {};
//此处请求的数据在回调函数中，非同步执行，所以controller中使用时数据并不时同步的
//所以controller中的数据处理逻辑必须在下面的回调中执行，故此处参数fn就是用来传递controller中的处理函数
loginDao.findUser = (username, password, fn) => {
    User.findOne({//还有find、findAll等方法
            where: {
                username: username,//查询条件
                password: password
            }
        }).then((res) => {
            if(res){
                fn(res.dataValues);
            }else{
                fn(false);
            }
    })
};

module.exports = loginDao;