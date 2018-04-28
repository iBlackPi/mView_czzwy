/**
 * 用户验证相关的中央仓库
 */
const state = {
    resourceList: [],
    userResourceList: []
};

const mutations = {
    // 该用户拥有的资源列表
    restoreUserResourceInfo(state, payload){
        state.userResourceList = payload;
        let temp = [];
        // 该用户拥有的资源列表权限名，用户判断用户是否能看见某个资源
        payload.forEach(item => {
            temp.push(item.location);
        });
        state.resourceList = temp;
    }
};

const actions = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};