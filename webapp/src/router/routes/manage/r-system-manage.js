import Main from '../../../pages/manage/main/Main.vue';
export default  {
    name: 'sys-manage',
    path: '/sys-manage',
    component: Main,
    children: [{
        name: 'resource-manage222',
        path: 'resource-manage222',
        //todo 配置后缀兼容 不写.vue后缀也行
        component: () => import('../../../pages/manage/app/system-manage/resource-manage/ResourceManage.vue'),
        meta: {
            title: '资源管理'
        }
    },{
        name: 'user-manage',
        path: 'user-manage',
        component: () => import('../../../pages/manage/app/system-manage/user-manage/UserManage.vue'),
        meta: {
            title: '用户管理'
        }
    },{
        name: 'apiManage',
        path: 'apiManage',
        //todo 配置后缀兼容 不写.vue后缀也行
        component: () => import('../../../pages/manage/app/system-manage/api-manage/ApiManage'),
        meta: {
            title: 'API管理'
        }
    }]
};