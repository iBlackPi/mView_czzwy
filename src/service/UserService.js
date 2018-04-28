/**
 * 处理用户登录逻辑
 */
const userDao = require('../dao/UserDao');
//生成记录的ID,根据时间生成
const genUuid = require('uuid/v1');

const userService = {};

//检验用户是否合法
userService.findUser = (fn) => {
    userDao.find(fn);
};

//更新用户信息
userService.updateUser = (user, where, fn) => {
    delete user.id;
    userDao.update(user, where, (res) => {
        fn(res);
    })
};

//创建用户
userService.createUser = (user, fn) => {
    user.id = genUuid();
    userDao.create(user, res => {
        fn(res);
    })
};

//删除用户
userService.deleteUser = (where, fn) => {

    userDao.delete(where, (res) => {
        fn(res);
    })
};

/**
 * 分页查询用户
 * @param countPerPage
 * @param currentPage
 * @param fn
 */
userService.findUsersByPage = (countPerPage, currentPage, where, fn) => {
    userDao.findByPage(parseInt(countPerPage), parseInt(currentPage), where, res => {
        fn(res);
    });
};

module.exports = userService;