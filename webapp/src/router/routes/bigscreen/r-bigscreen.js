// 大屏主页
import BigMain from '../../../pages/bigscreen/BigMain';
import BigBenefit from '../../../pages/bigscreen/BigBenefit';
import BigOther from '../../../pages/bigscreen/BigOther';

// 大屏首页
const rBigMain = {
    name: 'bigMain',
    path: '/bigMain',
    component: BigMain,
    meta: {
        title: '信息化统计大屏',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};
// 大屏附加信息页
const rBigOther = {
    name: 'bigOther',
    path: '/bigOther',
    component: BigOther,
    meta: {
        title: '信息化统计大屏',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};
// 大屏效益页
const rBigBenefit = {
    name: 'bigBenefit',
    path: '/bigBenefit',
    component: BigBenefit,
    meta: {
        title: '信息化统计大屏',
        //是否需要通过后台判断页面中的组件权限
        auth: false
    }
};

export  {
    rBigMain,
    rBigBenefit,
    rBigOther
}