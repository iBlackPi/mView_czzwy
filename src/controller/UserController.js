const express = require('express');
const userService = require('../service/UserService');
const router = express.Router();

router.use('/userController.do', (req, resp, next) => {
    const m = req.query;
    const data = req.body;
    //认证用户是否合法
    if(m.m === 'findUser'){
        userService.findUser((users) => {
            if(users){
                req.ajaxJson.data = users;
            }else{
                req.ajaxJson.message = '无法获取数据';
                req.ajaxJson.success = false;
            }
            resp.send(req.ajaxJson);
        });
    }
    //更新用户信息
    else if(m.m === 'updateUser'){
        userService.updateUser(data, {id: data.id}, (res) => {
            if(!res){
                req.ajaxJson.message = '更新用户信息失败';
                req.ajaxJson.success = false;
            }
            resp.send(req.ajaxJson);
        })
    }
    //创建新用户
    else if(m.m === 'createUser'){
        userService.createUser(data, res => {
            if(!res){
                req.ajaxJson.message = '添加用户失败';
                req.ajaxJson.success = false;
            }else{
                req.ajaxJson.data = res;
            }
            resp.send(req.ajaxJson);
        })
    }
    //删除用户 data为删除用户的条件
    else if(m.m === 'deleteUser'){
        userService.deleteUser(data, (res) => {
            if(!res){
                req.ajaxJson.message = '删除用户失败';
                req.ajaxJson.success = false;
            }
            resp.send(req.ajaxJson);
        })
    }
    //
    else if(m.m === 'findUserByPage'){
        userService.findUsersByPage(data.countPerPage, data.currentPage, data.where, (users) => {
            if(users){
                req.ajaxJson.data = users;
            }else{
                req.ajaxJson.message = '无法获取数据';
                req.ajaxJson.success = false;
            }
            resp.send(req.ajaxJson);
        });
    }
    //其他情况，防止匹配不到方法，前台请求挂起
    else {
        req.ajaxJson.message = '您找的资源不存在';
        req.ajaxJson.success = false;
        res.send(req.ajaxJson);
    }
});

module.exports = router;