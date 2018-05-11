import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import Iview from 'iview';
import qs from 'qs';
import global from '../assets/util/global';
import Vechart from '../components/ve-charts/index';

//todo 引入新文件时，webpack动态编译会报错
//todo 全部不需要加后缀
import 'iview/dist/styles/iview.css';
//import 'vue-awesome/icons'
//按需引入font-awesome,如果引入全部,会造成index.js文件过大
import '../assets/util/icon.js';
import Icon from 'vue-awesome/components/Icon.vue';
//todo 采用阿里巴巴字体图标库、svg图标库（支持彩色）
import '../assets/css/iconfont.css';
import '../assets/font/iconfont';

import App from './App.vue';
import { routes } from '@/router/index';
import storeConfig from '@/store/index';

import { buildTree } from '@/assets/util/utils';

/*该文件放在上方会报错,原因未知*/
import { Base64 } from 'js-base64';

// 将工具挂在到vue原型
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Iview);
// 注册自定义组件
Vue.use(Vechart);
Vue.component('f-icon', Icon);

//事件总线
const vue = new Vue();

//将全局工具类绑定到vue原型，方便后续用vue实例调用全局工具
// 配置aixos全局参数
// 公共用的api前缀，所有请求自动携带
// 携带认证信息，可以在跨域的情况下保持session一致
// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.withCredentials = true;
// 创建实例时设置配置的默认值
// 可以根据实际需求创建多个实例
const instance = axios.create({
    baseURL: 'http://10.88.8.184:3000',
    // baseURL: 'http://111.62.40.193:9601',
    withCredentials: true
});
const instanceTomcat = axios.create({
    baseURL: 'http://localhost:8088/czportal',
    // baseURL: 'http://111.62.40.193:9603/czportal',
    withCredentials: true,
});
// 访问node服务
Vue.prototype.$http = instance;
// 访问tomcat服务
Vue.prototype.$httpt = instanceTomcat;
Vue.prototype.$base64 = Base64;
Vue.prototype.$bus = vue;
window.$global = global;
//实例化路由对象,后面注册到vue
const router = new VueRouter({
    routes
});
//实例化vuex对象,后面注册到vue
const store = new Vuex.Store(storeConfig);

//注意：axios拦截器一定要在axios执行请求动作之前绑定，否则无效
//注册axios 前置拦截器，用于处理应用中所有ajax请求的公共逻辑部分，减少ajax请求中的代码
//函数中返回值会作为请求的data参数
instance.interceptors.request.use((config) => {
    //post请求时,将请求体序列化
    if(config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

//todo 一定要序列化post请求的数据，否则后台无法获取
//todo 因为后台是通过@RequestParam而不是@RequestBody，所以只能识别xx=xx&bb=bb格式，而不能解析json格式
// instanceTomcat.interceptors.request.use((config) => {
//     //post请求时,将请求体序列化
//     if(config.method === 'post') {
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// }, (err) => {
//     return Promise.reject(err);
// });

//注册axios 后置拦截器，用于处理应用中所有ajax响应的公共逻辑部分，减少ajax响应中的代码
//函数中的返回值会作为ajax回调中的参数传入
instance.interceptors.response.use((response) => {
    let {success, code, message} = response.data;
    //处理在ajax api调用时出现的session过期或者无权访问的情况
    //400：后台配置, 前台无需处理
    //404: 后台tomcat直接处理，非标准的ajaxJson格式
    //401 403：后台返回标准的ajaxJson
    //500：后台返回标准的ajaxJson格式，前台弹窗即可（包括用户名、密码错误、无权访问）
    //成功code: null

    //如果请求后台，后台返回success标志位是失败则判断是哪些错误码做相应处理，否则直接return response
    //因为所有ajax请求，错误的处理逻辑都是一样的
    if(!success){
        //如果拦截器拦截的是判断用户是否成功登录的ajax请求，则不做路由相关的处理，因为此处处理和判断用户是否登录的逻辑重复了
        //如果是其他api的调用则根据返回码处理
        if(response.config.url !== '/loginController.do?m=validateUser'){
            if(code === 401) {
                router.push({
                    replace: true,
                    name: 'error-401'
                });
            } else if(code === 403) {//todo 403不是协议号，只代表用户session失效
                //将用户权限清空
                vm.$store.commit('auth/resetState');
                //将跟菜单相关数据清空
                vm.$store.commit('menu/resetState');
                //将跟用户信息数据清空
                vm.$store.commit('login/resetUserName');
                //登录失效,到登录页
                router.push({
                    name: 'login'
                });
            } else if(code === 500) {
                //服务器内部会做标准的ajaxJson封装，此处只需在页面弹出相应的提示即可
                vm.$Notice.error({
                    title: '500',
                    desc: message
                });
            }
        }
    }
    return response;
}, (err) => {
    //只有400（无需前台处理）、404是服务器不做控制的，其余均返回标准的ajaxJson
    //所以404需要单独处理
    /*router.push({
        replace: true,
        name: 'error-404'
    });*/
    return Promise.reject(err);
});

//在用户处于成功登录的状态下，向后台请求获取用户权限（到底用户能够看到哪些路由）
//该验证在每次路由更改或者页面刷新的时候都要去后台验证，防止后台已经改变用户的权限，而前台还用旧的权限信息
const authCheck = (routerToName, next) => {
    //在数据库中保存的只有左侧菜单对应的路由名称，home、login、main等路由只是前端路由表中存在
    //todo 菜单异步获取数据的获取应该放到store的action中
    //todo 但是这个数据里面需要再回调中处理很多业务逻辑，所以不适合放到store中

    //todo 每次验证需要请求最新的资源菜单信息，
    //todo 如果从store中取值判断，在刷新的情况下此时store中菜单异步请求还没初始化完成，就会认为用户无权限跳转到401
    instance.get('/menuController.do?m=findMenu').then(({data}) => {
        let hasAuth = false;
        //该用户可以访问的组件id存入store,用于后面判断是否为该用户显示某些组件
        // vm.$store.state.auth.auths = data.data.componentIDList;
        //判断用户要访问的菜单在不在菜单权限列表中
        //todo 每次验证顺便更新store中的菜单，这样如果菜单在后台已经改变，能够及时的反应到页面菜单上
        vm.$store.commit('menu/restoreMenu', {
            data: data.data,
            order: 'orderNo'
        });
        for(let index in data.data){
            if(data.data[index].location === routerToName){//如果在路由列表中,则直接放过
                hasAuth = true;
                next();
                break;
            }
        }
        if(!hasAuth){
            next({name: 'error-401', replace: true});
        }
        //将数组形式的菜单转换为树形格式的菜单数据，用于左侧树形菜单的渲染
        //todo 这种用法是绝对不允许的，要通过mutation显示的改变state，而不是直接赋值
        //todo 这个逻辑是为了拿到menuData数据，却放在了路由处理中，是绝对不允许的，业务分离，分开放置
        // vm.$store.state.menu.menuData = buildTree(data.data, 'orderNo', (item) => {
        //     let obj = {
        //         name: item.location,
        //         title: item.title
        //     };
        //     return item.icon ? Object.assign(obj, {
        //         icon: item.icon
        //     }) : obj;
        // })[0].children;//由于后台有一个root节点,此处剔除
    });
};

// 每次刷新或者路由的改变，都涉及到用户可能要去请求数据，所以都要去验证用户的合法性
router.beforeEach((to, from, next) => {
    console.log(to.name, from.name);
    // 给页面tab加title
    if (to.meta.title) {
        document.title = to.meta.title
    }
    //如果路由是到401或者404页面的，不涉及到用户获取数据，那么无需去后台验证，直接跳转即可，走else逻辑
    //如果不是401或404，那么就要去验证用户请求的合法性
    if(to.name !== 'error-401' && to.name !== 'error-404' && to.name !=='bigBenefit' && to.name !=='bigMain'){
        //向后台询问，判断用户是否仍然是登录状态
        instance.get('/validateController.do?m=validateUser').then(({ data }) => {
            if(data.success){
                //把用户的授权信息放入store中
                vm.$store.commit('validateInfo/restoreUserResourceInfo', data.data);
                //如果路由存在，则去判断路由是否为登录页面
                if(to.name !== null){
                    //用户在登录状态时，不允许回到登录界面
                    //用户如果在登录页面就代表用户session退出，保持状态的一致性，防止出现安全问题
                    //如果不是登录界面，则判断该用户是否有权限访问该路由
                    if(to.name === 'login'){
                        //todo 执行该段代码后，此处不会再次触发路由守卫
                        next({name: 'home'});
                    }else if(to.name === 'home' || to.name === 'main'){
                        //在用户登录成功的情况下，就认为用户有权限访问home页,不需要进行权限验证
                        //不做权限验证还有一个原因是后台获取的菜单数据，并没有home这一项，所以也无法验证
                        next();
                        //以上两段逻辑的结果看似都是跳转到home页，但是不能将其合并，因为逻辑本身不一样，不合并有更好的可维护性
                    } else{
                        //判断用户是否有该路由权限
                        //todo 这里处理if中方式并不严谨，因为用户在刷新之前的某个时间，后台改变其该路由权限，那么用户刷新时还是要验证，但这里没有做验证
                        //todo 当只是路由改变的情况下，还是正常去验证用户有没有该权限
                        // if(!vm.$store.state.menu.menuList){
                            authCheck(to.name, next);
                        // }else{
                        //     next();
                        // }
                    }
                }else{//如果路由不存在
                    //此处应该做replace处理，防止回退按钮点击两次
                    //todo 解释原因
                    next({name: 'error-404', replace: true});
                }
            }else{//如果是未登录状态，则跳转到登录页面
                //防止路由死循环
                //路由到显示调用路由到login后，又触发路由守卫，又会执行此处到login的逻辑，陷入死循环
                if(to.name !== 'login'){
                    //todo 做了判断，执行该段代码next({name: 'login'})后，不会再次触发路由守卫，非常奇怪？？？
                    //todo 猜测：当你事先已经执行过一遍next()到login,之后再次执行next({name: 'login'})就不会再次触发守卫
                    next({name: 'login'});
                }else{
                    next();
                }
                //todo 如果不作如上判断，会陷入死循环next({name: 'login'})会再次触发守卫
                // next({name: 'login'});
            }
        })
    }else{
        next();
    }
});

//300毫秒之后关闭加载动画
router.afterEach((to, from) => {
    setTimeout(() => {
        //跳转完,关闭加载动画
        router.app.$Spin.hide();
    }, 300);
});

//定义vue对象
//该段代码应该放在最下面，让路由先挂载守卫，否则vm先初始化，守卫还没来得及挂载，监控不到页面的刷新
const vm = new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});