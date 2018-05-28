/**
 * 登录
 */

const state = {
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
