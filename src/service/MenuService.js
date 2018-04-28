/**
 * 处理用户登录逻辑
 */
const resourceDao = require('../dao/ResourceDao');

const menuService = {};
//检验用户是否合法
menuService.findMenu = (where, fn) => {
    resourceDao.findPart(where, fn);
};

module.exports = menuService;