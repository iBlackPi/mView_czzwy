const express = require('express');
const menuService = require('../service/MenuService');
const router = express.Router();

router.use('/menuController.do', (req, res, next) => {
    const m = req.query;
    //认证用户是否合法
    if(m.m === 'findMenu'){
        menuService.findMenu({}, (menus) => {
            if(menus){
                req.ajaxJson.data = menus;
                res.send(req.ajaxJson);
            }else{
                req.ajaxJson.message = '无法获取数据';
                req.ajaxJson.success = false;
                res.send(req.ajaxJson);
            }
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