/**
 * 登录
 */

const state = {
    needAskIsLogin: true,
    userName: ''
};

const mutations = {
    resetUserName(state) {
        state.userName = '';
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
