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
    },{
        name: 'computer-room',
        path: 'computer-room',
        component: () => import('../../../pages/manage/app/cloud-info/ComputerRoom'),
        meta: {
            breadcrumb: '机房维护',
            title: '机房维护'
        }
    },{
        name: 'info-sys-maintain',
        path: 'info-sys-maintain',
        component: () => import('../../../pages/manage/app/cloud-info/InfoSysMaintain'),
        meta: {
            breadcrumb: '信息化系统维护',
            title: '信息化系统维护'
        }
    },{
        name: 'resource-catalog-manage',
        path: 'resource-catalog-manage',
        component: () => import('../../../pages/manage/app/cloud-info/ResourceCatalogManage'),
        meta: {
            breadcrumb: '资源目录管理',
            title: '资源目录管理'
        }
    }]
};