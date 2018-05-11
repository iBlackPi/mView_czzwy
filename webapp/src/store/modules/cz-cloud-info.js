const state = {
    // 总的概览统计信息
    czCloudInfo: [],
    // 网络接入情况
    isConnectNet: {
        intenet: 0,
        govExtranet: 0,
        specialNetwork: 0
    },
    // 投资情况
    investment: [],
    // 业务系统
    busiSys: [],
    // 当前所展示的部门。点击概览页面表格中部门名称和搜索部门时更新该值
    currentDepartment: '',
    totalInfo: {}
};
const mutations = {
    restoreCloudInfo(state, payload){
        state.czCloudInfo = payload.czCloudInfo
    },
    restoreIsConnectNet(state, payload){
        state.isConnectNet = payload.isConnectNet;
    },
    restoreInvestment(state, payload){
        state.investment = payload.investment;
    },
    restoreBusiSys(state, payload){
        state.busiSys = payload.busiSys;
    },
    restoreCurrentDepartment(state, payload){
        state.currentDepartment = payload.department;
    },
    restoreTotalInfo(state, payload){
        state.totalInfo = payload.totalInfo;
    }
};
const actions = {
    // 获取总的统计信息
    getCloudInfo({commit}, {vm}){
        vm.$httpt.get('bigScreenController.do?getInfo').then((res) => {
            let temp = res.data;
            if(temp){
                commit('restoreCloudInfo', {
                    czCloudInfo: temp
                })
            }else{
                throw new Error('获取信息化数据概览失败！');
            }
        }).catch(err => {
            throw new Error('获取信息化数据概览失败:' + err);
        })
    },
    // 获取网络接入情况
    getIsConnectNet({commit}, {vm, department}){
        vm.$httpt.post(`bigScreenController.do?getNetDetails&department=${department}`).then((res) => {
            if(res.data){
                commit('restoreIsConnectNet', {
                    isConnectNet: res.data
                });
                // 当前部门
                commit('restoreCurrentDepartment', {
                    department: department
                });
            }else{
                console.error(res.data.msg);
            }
        }).catch(err => {
            throw new Error('获取网络接入情况失败:' + err);
        })
    },
    // 获取投资情况
    getInvestment({commit}, {vm, where}){
        vm.$httpt.post(`bigScreenController.do?getInvestmentDetails&start=${where.currentPage}&pageSize=${where.countPerPage}&department=${where.department}`).then(({data}) => {
            let temp = data.data.list;
            if(data.success){
                commit('restoreInvestment', {
                    investment: temp
                })
            }else{
                console.error('获取投资情况失败！');
            }
        }).catch(err => {
            throw new Error('获取投资情况失败:' + err);
        })
    },
    // 获取业务系统状况
    getBusiSys({commit}, {vm, where}){
        vm.$httpt.get(`bigScreenController.do?getBussinessSystemDetails&start=${where.currentPage}&pageSize=${where.countPerPage}&department=${where.department}`).then(({data}) => {
            let temp = data.data.list;
            if(data.success){
                commit('restoreBusiSys', {
                    busiSys: temp
                })
            }else{
                console.error('获取业务系统状况失败！');
            }
        }).catch(err => {
            throw new Error('获取业务系统状况失败:' + err);
        })
    },
    // 获取数据库中全部表全部字段信息
    getTotalInfo({commit}, {vm, department}){
        vm.$httpt.get(`bigScreenController.do?getInfoDetail&department=${department}`).then(res => {
            if(res.data){
                commit('restoreTotalInfo', {
                    totalInfo: res.data
                });
                // 当前部门
                commit('restoreCurrentDepartment', {
                    department: department
                });
            }else{
                console.error('获取总信息失败！');
            }
        }).catch(err => {
            throw new Error('获取总信息失败:' + err);
        })
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}