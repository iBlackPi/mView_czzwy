import {buildTree} from '../../assets/util/utils';

const state = {
    empowerTree: [],
    initEmpowerData: []
};
const mutations = {
    restoreEmpowerTree(state, payload) {
        state.empowerTree = payload.empowerTree;
        state.initEmpowerData = payload.initEmpowerData;
    }
};
const actions = {
    getEmpowerTree({commit}, {vm, empowerList}) {
        vm.$http.get('/resourceController.do?m=findResource').then((res) => {
            if (res.data.success) {
                // 将该用户所有的授权资源与全部的资源信息比对，如果匹配成功，则将资源树上的匹配项设置为选中
                let data = buildTree(res.data.data, "type", item => {
                    let menuItem = {
                        id: item.id,
                        title: item.title, //显示的资源名称
                        icon: item.icon,
                        parentId: item.parentId,
                        location: item.location,
                        type: item.type,
                        // expand: true //打开所有资源目录
                    };
                    //遍历当前用户所有的授权资源菜单，如果与获取到的所有菜单某一个匹配，该菜单被置为选中状态
                    empowerList.forEach((empowerData) => {
                        if (empowerData.resourceid === item.id) {
                            menuItem.checked = true;
                        }
                    });
                    // menuGuard为菜单守卫
                    if (item.type === 'menuGuard') {
                        menuItem.disabled = true;
                        //让菜单守卫置灰并且无响应，尽量提升用户体验
                        //不能随意添加属性，按照开发规范编码
                        //todo 置灰，显示效果更好点
                        menuItem.render = (h) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    color: '#ddd',
                                }
                            }, [
                                h('span', {
                                    style: {
                                        'padding-left': '4px'
                                    }
                                }, '菜单守卫')
                            ]);
                        }
                    }
                    return menuItem;
                });
                //打开根资源目录
                data[0].expand = true;
                data[0].selected = true;
                commit('restoreEmpowerTree', {
                    empowerTree: data,
                    initEmpowerData: res.data.data
                })
            } else {
                throw new Error('未获取到授权资源菜单');
            }
        }).catch(err => {
            throw new Error('查看后台日志信息:' + err);
        })
    },
    getUserEmpowerIds(context, {vm, userId}) {
        vm.$http.get('/empowerController.do?m=getUserEmpowerIds&userId=' + userId).then((res) => {
            if (res.data.success) {
                vm.$store.dispatch('empowerTree/getEmpowerTree', {vm: vm, empowerList: res.data.data})
            } else {
                throw new Error(res.data.message);
            }
        }).catch(err => {
            throw new Error('查看后台日志信息:' + err);
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}