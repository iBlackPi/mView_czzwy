/**
 * 资源管理
 */
const validateDao = require('../dao/ValidateDao');
const ResourceDao = require('../dao/ResourceDao');

const validateService = {};

//找到当前用户所有的授权信息
validateService.getUserResource = (req, fn) => {
  validateDao.findPart({userid: req.session.user.id}, (res) => {
      if(res.length > 0){
          //如果key对应的value是数组，那么搜索条件就是where id in [……]
          let where = {id: []};
          res.forEach(item => {
             where.id.push(item.resourceid);
          });
          ResourceDao.findPart(where, (res) => {
              fn(res);
          })
      }else{
          console.error('validateService.getUserResource: 未获得任何授权信息');
      }
  })
};

module.exports = validateService;