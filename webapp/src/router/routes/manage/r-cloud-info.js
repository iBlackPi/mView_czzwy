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
        component: () => import('../../../pages/manage/app/cloud-info/info-maintain.vue'),
        meta: {
            breadcrumb: '云信息维护'
        }
    }]
};