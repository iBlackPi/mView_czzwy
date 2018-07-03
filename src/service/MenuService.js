/**
 * 处理用户登录逻辑
 */
const resourceDao = require('../dao/ResourceDao');
const validateDao = require('../dao/ValidateDao');

const menuService = {};
//检验用户是否合法
menuService.findMenu = (req, fn) => {
    // menu是resource的一部分，此处用resource来更新数据
    validateDao.findPart({userid: req.session.user.id}, (res) => {
        if(res.length > 0){
            //如果key对应的value是数组，那么搜索条件就是where id in [……]
            let where = {id: []};
            res.forEach(item => {
                where.id.push(item.resourceid);
            });
            resourceDao.findPart(where, (res) => {
                fn(res);
            })
        }else{
            console.error('validateService.getUserResource: 未获得任何授权信息');
        }
    })
};

module.exports = menuService;