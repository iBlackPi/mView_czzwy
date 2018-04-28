const express = require('express');
const empowerService = require('../service/EmpowerService');
const router = express.Router();

router.use('/empowerController.do', (req, resp, next) => {
    //获取get提交的参数
    const m = req.query;
    //获取post提交的参数
    const data = req.body;
    //给指定的用户授权指定的资源
    if(m.m === 'empowerResource'){
        empowerService.empower({data: data, req: req}, (res) => {
            if(res){
                resp.send(req.ajaxJson);
            }else{
                req.ajaxJson.message = '无法对用户授权';
                req.ajaxJson.success = false;
                resp.send(req.ajaxJson);
            }
        });
        //获取用户的授权资源信息
    }else if(m.m === 'getUserEmpowerIds'){
        empowerService.findEmpowerResourceIds(m.userId, (res) => {
            if(res){
                req.ajaxJson.data = res;
                resp.send(req.ajaxJson);
            }else{
                req.ajaxJson.message = '无法该用户的授权资源id';
                req.ajaxJson.success = false;
                resp.send(req.ajaxJson);
            }
        })
    }
    //其他情况，防止匹配不到方法，前台请求挂起
    else {
        req.ajaxJson.message = '您找的资源不存在';
        req.ajaxJson.success = false;
        resp.send(req.ajaxJson);
    }
});

module.exports = router;