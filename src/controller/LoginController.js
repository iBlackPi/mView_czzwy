const express = require('express');
const loginService = require('../service/LoginService');
const router = express.Router();

router.use('/loginController.do', (req, res, next) => {
    const m = req.query;
    //认证用户是否合法
    if(m.m === 'checkUser'){
        loginService.checkUser(req.body.username, req.body.password, (user) => {
            if(user){
                req.session.user = user;
                req.ajaxJson.message = '登录成功';
                res.send(req.ajaxJson);
            }else{
                req.ajaxJson.message = '用户名或密码错误';
                req.ajaxJson.success = false;
                res.send(req.ajaxJson);
            }
        });
    }
    //退出登录
    else if(m.m === 'logout'){
        req.session.destroy(() => {
            console.log('用户session已经被清除，请回登录页面');
        });
        res.send(req.ajaxJson);
    }
    //其他情况，防止匹配不到方法，前台请求挂起
    else {
        req.ajaxJson.message = '您找的资源不存在';
        req.ajaxJson.success = false;
        res.send(req.ajaxJson);
    }
});

module.exports = router;