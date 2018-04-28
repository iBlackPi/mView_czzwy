/**
 * 处理用户登录逻辑
 */
const loginDao = require('../dao/LoginDao');

const loginService = {};
//检验用户是否合法
loginService.checkUser = (username, password, fn) => {
    loginDao.findUser(username, password, fn);
};

//查找当前用户所有授权的组件


module.exports = loginService;