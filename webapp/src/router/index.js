import Login from '../pages/manage/login/Login.vue';
import Main from '../pages/manage/main/Main.vue';
import Home from '../pages/manage/app/Home.vue';

import rSystemManage from './routes/manage/r-system-manage';
import rCloudInfo from './routes/manage/r-cloud-info';
import {rBigMain, rBigBenefit} from './routes/bigscreen/r-bigscreen'
console.log('--',rBigBenefit, rBigMain);
//todo 路由不应该集中在一个文件中，各自的导航放到各自的导航中，index只作为一个统一出口
/**
 * meta中的title是显示在浏览器上方的title
 */
// 如果输入根路径则直接跳转到login路由
const redirectToIndex = {
    path: '/',
    redirect: {
        name: 'bigMain'
    }
};

//登录页
//todo 暂时保留，客户可能需要登录验证
const loginRouter = {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
        title: '登录',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};

const badRequest400 = {
    name: 'error-400',
    path: '/400',
    component: () =>
        import ('../pages/manage/exception/400.vue'),
    meta: {
        title: '400-请求无效',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};

export const unauthorized401 = {
    name: 'error-401',
    path: '/401',
    component: () =>
        import ('../pages/manage/exception/401.vue'),
    meta: {
        title: '401-未授权',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};

export const pageNotFound404 = {
    name: 'error-404',
    path: '/404',
    component: () =>
        import ('../pages/manage/exception/404.vue'),
    meta: {
        title: '404-页面不存在',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};

export const serverError500 = {
    name: 'error-500',
    path: '/500',
    component: () =>
        import ('../pages/manage/exception/500.vue'),
    meta: {
        title: '500-服务端错误',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};

//主页面 home为内容部分
const mainRouter = {
    name: 'main',
    path: '/main',
    component: Main,
    //输入的路径不完整,跳转到子菜单的第一个
    redirect: {
        name: 'home'
    },
    children: [{
        name: 'home',
        path: 'home',
        component: Home,
        meta: {
            title: '云管理平台'
        }
    }]
};

export const routes = [
    rSystemManage, //系统管理
    rBigBenefit, //大屏效益页
    rBigMain, //大屏主页
    rCloudInfo, //云信息维护
    redirectToIndex, //根路由跳转到指定页
    loginRouter, //登录路由
    mainRouter, //主页结构（左侧菜单+页面头部）
    badRequest400, //400错误路由
    unauthorized401, //401错误路由
    pageNotFound404, //404错误路由
    serverError500 //500错误路由
];