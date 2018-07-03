const genUuid = require('uuid/v1');
const empowerDao = require('../dao/EmpowerDao');

const empowerService = {};
//保存授权信息
empowerService.empower = (data, fn) => {
    let userId = data.data.userId;
    let empower = data.data.newEmpowerData;
    let empowerDataArr = [];
    //组装要保存的授权和用户的关联对象
    empower.forEach((item) => {
        let empowerDataObj = {};
        empowerDataObj.id = genUuid();
        empowerDataObj.userid = userId;
        empowerDataObj.resourceid = item.id;
        empowerDataArr.push(empowerDataObj);
    });
    //先删除该用户的所有授权，然后再将新的授权信息存入
    empowerDao.delete({userid: userId}, (res) => {
        if (res >= 0) {
            empowerDao.bulkCreate(empowerDataArr, fn);
        } else {
            console.error('未删除任何数据！');
        }
    })
};

//查询该用户所有拥有的权限的资源id
//todo 其他地方犯了设计上的错误，应该如以下设计，从controller传过来的fn应该在service层拿数据，而service层负责从dao层拿数据
empowerService.findEmpowerResourceIds = (userId, fn) => {
    empowerDao.findPart({userid: userId}, (res) => {
        if (res) {
            //数据传给controller层，让controller层去做最上层的处理
            fn(res);
        } else {
            console.error('未获取任何权限的资源id');
        }
    });
}

module.exports = empowerService;