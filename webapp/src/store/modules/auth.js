/**
 * 组件内容显示权限
 */

const state = {
    auths: []
};

const mutations = {
    /*重置本文件中所有的数据*/
    resetState(state) {
        state.auths = [];
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
