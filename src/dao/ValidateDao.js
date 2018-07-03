const UserAndResource = require('../entity/UserAndResource');

const validateDao = {};
//此处请求的数据在回调函数中，非同步执行，所以controller中使用时数据并不时同步的
//所以controller中的数据处理逻辑必须在下面的回调中执行，故此处参数fn就是用来传递controller中的处理函数
//提供授权的资源树数据
validateDao.find = (fn) => {
    UserAndResource.findAll().then((res) => {
        if (res) {
            fn(res);
        } else {
            fn(false);
        }
    })
};

//修改信息
//放置默认值，避免报错
//updateContent 更新的内容
validateDao.update = (updateContent = {}, where = {}, fn) => {
    UserAndResource.update(updateContent, {where: where})
        .then(ok => {
            fn(ok);
        })
        .catch(e => {
            throw new Error(e)
        });
};

//增加内容
//回调返回成功创建的对象，放在dataValues属性中
validateDao.create = (addContent = {}, fn) => {
    UserAndResource.create(addContent)
        .then(ok => {
            fn(ok);
        })
        .catch(e => {
            throw new Error(e)
        });
};

//批量增加内容
//接收一个对象数组
validateDao.bulkCreate = (addContent = [], fn) => {
    UserAndResource.bulkCreate(addContent)
        .then(ok => {
            fn(ok);
        })
        .catch(e => {
            throw new Error(e)
        });
};

//批量删除
//成功回调中返回成功删除的条数
validateDao.delete = (where = {}, fn) => {
    UserAndResource.destroy({
        'where': where
    }).then(ok => {
        fn(ok);
    }).catch(e => {
        throw new Error(e)
    });
};

//回调返回查到的数组，如果没有值，则空数组
validateDao.findPart = (where, fn) => {
    UserAndResource.findAll({where: where}).then((res) => {
        if (res) {

            fn(res);
        } else {
            fn(false);
        }
    })
};

module.exports = validateDao;