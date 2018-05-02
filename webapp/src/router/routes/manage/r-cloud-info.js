import Main from '../../../pages/manage/main/Main.vue';
export default {
    name: 'cloud-manage',
    path: '/cloud-manage',
    component: Main,
    redirect: {
        name: 'info-maintain'
    },
    children: [{
        name: 'info-maintain',
        path: 'info-maintain',
        component: () => import('../../../pages/manage/app/cloud-info/InfoMaintain'),
        meta: {
            breadcrumb: '云信息维护',
            title: '信息化资源维护'
        }
    },{
        name: 'department-info',
        path: 'department-info',
        component: () => import('../../../pages/manage/app/cloud-info/InfoDepartment'),
        meta: {
            breadcrumb: '信息详情',
            title: '单位信息化资源详情'
        }
    }]
};