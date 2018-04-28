const express = require('express');
const resourceService = require('../service/ResourceService');
const router = express.Router();

router.use('/resourceController.do', (req, resp, next) => {
    //获取get提交的参数
    const m = req.query;
    //获取post提交的参数
    const data = req.body;
    //认证用户是否合法
    if(m.m === 'findResource'){
        resourceService.findResource((resource) => {
            if(resource){
                req.ajaxJson.data = resource;
                resp.send(req.ajaxJson);
            }else{
                req.ajaxJson.message = '无法获取资源列表';
                req.ajaxJson.success = false;
                resp.send(req.ajaxJson);
            }
        });
        //修改资源信息
    }else if(m.m === 'updateResource'){
        const where = {id: data.id};
        delete data.id;
        const resourceContent = data;
        resourceService.updateResource(resourceContent, where, (res) => {
            if(res.length <= 0){
                req.ajaxJson.success = false;
            }
            resp.send(req.ajaxJson);
        })
        //增加新的资源
    }else if(m.m === 'addResource'){
        resourceService.addResource(data, (res) => {
            if(!res){
                req.ajaxJson.success = false;
                req.ajaxJson.message = '该路径名已存在';
            }
            resp.send(req.ajaxJson);
        })
        //删除资源信息
    }else if(m.m === 'deleteResource'){
        resourceService.deleteResource(data, (res) => {
            if(!res){
                req.ajaxJson.success = false;
            }
            resp.send(req.ajaxJson);
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