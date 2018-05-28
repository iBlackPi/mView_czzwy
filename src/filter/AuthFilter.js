const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    //每次请求都需要一个新的返回对象，在模块外面命名不会更新该对象，模块都是单例模式
    req.ajaxJson = {
        success: true,
        code: 200,
        message: '',
        data: null
    };
    res.header( "Pragma", "no-cache" );
    res.header( "Cache-Control", "must-revalidate" );
    res.header( "Cache-Control", "no-cache" );
    res.header( "Cache-Control", "no-store" );
    res.header("Expires", 0);
    const ms = req.query;
    //todo 过滤器
    //其他请求一律先判断有没有session，没有则跳到登录页
    if(ms.m !== 'validateUser' && ms.m !== 'checkUser'){
        //todo 暂时先注释，方便调试接口；生产环境或者集成测试时去掉该注释
       /* if(req.session.user){
            console.log('来自过滤器：', req.session.user, '已经登录');
            next();
        }else{
            console.log('来自过滤器：', '请自觉登录');
            req.ajaxJson.success = false;
            req.ajaxJson.message = '来自过滤器：请自觉登录';
            res.send(req.ajaxJson);
        }*/
       next();
    }else{
        next();
    }
});
module.exports = router;