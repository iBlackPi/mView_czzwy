const User = require('../entity/User');

const userDao = {};
//此处请求的数据在回调函数中，非同步执行，所以controller中使用时数据并不时同步的
//所以controller中的数据处理逻辑必须在下面的回调中执行，故此处参数fn就是用来传递controller中的处理函数
userDao.find = (fn) => {
    User.findAll().then((res) => {
        if(res){
            fn(res);
        }else{
            fn(false);
        }
    })
};

//按条件查询
//回调返回查到的数组，如果没有值，则空数组
userDao.findPart = (where, fn) => {
    User.findAll({where: where}).then((res) => {
        if(res){
            fn(res);
        }else{
            fn(false);
        }
    }).catch(err => {
        throw new Error(err);
    })
};

//分页
/**
 * @param countPerPage 一页显示多少条
 * @param currentPage 当前是第几页
 * @param fn 处理查询数据的回调
 */
userDao.findByPage = (countPerPage, currentPage, where, fn) => {
    //查询总共有多少条数据
    User.findAndCountAll({}).then(count => {
        User.findAll({
            'limit': countPerPage,
            'offset': countPerPage * (currentPage - 1),
            'where': where
        }).then(res => {
            fn({
                totalCount: count.count,
                list: res
            });
        }).catch(err => {
            throw new Error(err);
        })
    }).catch(err => {
        throw new Error(err);
    });
};

/*const countPerPage = 20, currentPage = 5;
const users = yield User.findAll({
    'limit': countPerPage,                      // 每页多少条
    'offset': countPerPage * (currentPage - 1)  // 跳过多少条
});*/

//删除
//返回删除的条数
userDao.delete = (where = {}, fn) => {
    User.destroy({
        'where': where
    }).then(ok => {
        fn(ok);
    }).catch(e => {throw new Error(e)});
};

//增加
//回调返回成功创建的对象，放在dataValues属性中
userDao.create = (addContent = {}, fn) => {
    User.create(addContent)
        .then(ok => {
            fn(ok);
        })
        .catch(e => {throw new Error(e)});
};

//更新
//返回更新的条数
userDao.update = (updateContent = {}, where = {}, fn) => {
    User.update(updateContent, {where: where})
        .then(ok => {
            fn(ok);
        })
        .catch(e => {throw new Error(e)});
};

module.exports = userDao;