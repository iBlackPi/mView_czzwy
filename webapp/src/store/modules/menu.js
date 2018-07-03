/**
 * 需求:点击同一个菜单(路由)时,重新加载组件内的数据
 * 问题:同一个菜单(路由)时,由于vue-router的设定,既不会调用vue-router的钩子函数,也不会调用组件的生命周期钩子
 * 此.js文件是当点击同一菜单(路由)时,对路由进行记数,组件中对该数进行监听,从而重新加载数据
 */
import {buildTree} from '../../assets/util/utils';

const sameRouteState = {
    route: '',
    routeCount: 0,
    menuData: [],
    menuList: []
};

const mutations = {
    changeRouteCount(state, currentRoute) {
        if (state.route === currentRoute) {
            state.routeCount++;
        } else {
            state.routeCount = 0;
            state.route = currentRoute;
        }
    },
    /*重置本文件中所有数据*/
    resetState(state) {
        state.route = '';
        state.routeCount = 0;
        state.menuData = [];
    },
    resetRouteState(state) {
        state.route = '';
        state.routeCount = 0;
    },
    restoreMenu(state, payload) {
        state.menuList = payload.data.filter(item => {
            return item.type === 'leaf'
        });
        // 这里需要判断获取的菜单数据有没有根节点
        // 如果不含有根节点则不需要去除根节点
        // 只允许有一个root节点
        let temp = buildTree(state.menuList, payload.order, (item) => {
            let obj = {
                name: item.location,
                title: item.title
            };
            return item.icon ? Object.assign(obj, {
                icon: item.icon
            }) : obj;
        });
        if (temp[0].name === 'root') {
            state.menuData = temp[0].children;
        } else {
            state.menuData = temp;
        }

    },
    restoreMenuList(state, payload) {
        state.menuList = payload;
    }
};

const actions = {
    getMenu({commit}, vm) {
        vm.$http.get('/menuController.do?m=findMenu').then(({data}) => {
            //todo 将菜单信息存入store中,并做相应处理
            commit('restoreMenu', {
                data: data.data,
                order: 'orderNo'
            });
        });
    }
}

/**
 * 面包屑中的文字需要从菜单中获取数据,而不是前端写好的路由中
 */

const menuDataState = {
    menuData: []
};

const state = Object.assign({}, sameRouteState, menuDataState);

export default {
    namespaced: true,
    state,
    mutations,
    actions
};