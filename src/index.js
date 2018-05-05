const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
//引入controller，将请求分发到相应的controller,让对应的service去处理
const AuthFilter = require('./filter/AuthFilter');
const LoginController = require('./controller/LoginController');
const menuController = require('./controller/MenuController');
const userController = require('./controller/UserController');
const resourceController = require('./controller/ResourceController');
const empowerController = require('./controller/EmpowerController');
const validateController = require('./controller/validateController');

//获取express实例
const app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    // todo Allow-Origin只允许设置一个，但是我们可以通过变量，然后代码动态的识别当前访问的地址
    // todo 这里是从req中取headers的值，而不是res
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // todo The value of the 'Access-Control-Allow-Origin' header in the response
    // todo must not be the wildcard '*' when the request's credentials mode is 'include'
    // todo 如果要携带cookie，即request中带有credentials， 则Allow-Origin不能是通配符*
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, origin, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
//用来解析post请求，否则req.body未定义
//for parsing application/json
app.use(bodyParser.json());
//for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//安装中间件 这些中间件可以访问req res next, 作用是在req=>res循环中处理数据
//cookie相关中间件
app.use(cookieParser());
//session相关中间件，相关方法和属性绑定在req对象上
app.use(session({
    secret: '12345',
    name: 'mview',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 30 * 60 * 1000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('../webapp'));

//权限过滤器
app.use('*/*.do', AuthFilter);

//登录
app.use(LoginController);

//处理菜单相关逻辑
app.use(menuController);

//处理用户相关逻辑
app.use(userController);

//资源管理
app.use(resourceController);

//授权管理
app.use(empowerController);

//处理用户验证相关事务
app.use(validateController);

//启动服务器，监听3000端口
app.listen('3000', () => {
    console.log('listen port 3000');
});