const express = require('express');
const validateService = require('../service/ValidateService');
const router = express.Router();

router.use('/validateController.do', (req, resp, next) => {
    const m = req.query;
    if(m.m === 'validateUser'){
        if(req.session.user){
            //每次验证session没有失效，则将用户的最新的授权信息（该用户所有可以看的到的组件信息）发给前台
            validateService.getUserResource(req, (res) => {
                req.ajaxJson.data = res;
                resp.send(req.ajaxJson);
            });
        }else{
            req.ajaxJson.success = false;
            resp.send(req.ajaxJson);
        }
    }
    //其他情况，防止匹配不到方法，前台请求挂起
    else {
        req.ajaxJson.message = '您找的资源不存在';
        req.ajaxJson.success = false;
        resp.send(req.ajaxJson);
    }
});

module.exports = router;