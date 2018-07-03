export default function getInfoMaintainHead(vm) {
    return [
        {
            title: '单位',
            key: 'department',
            width: 150,
            fixed: 'left'
        },
        {
            title: '横向专网数量',
            key: 'hengxiangNetNum',
            width: 150,
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    props: {
                        title: 'hello'
                    },
                    on: {
                        click() {
                            vm.$bus.$emit('HengxiangNetTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-world'
                        },
                        style: {
                            marginRight: '1rem',
                            color: '#2D8CF0',
                            fontSize: '1rem'
                        }
                    }),
                    h('strong', {
                        style: {
                            color: '#2D8CF0'
                        }
                    }, params.row.hengxiangNetNum)
                ]);
            }
        },

        {
            title: '纵向专网数量',
            key: 'zongxiangNetNum',
            width: 150,
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    props: {
                        title: 'hello'
                    },
                    on: {
                        click() {
                            vm.$bus.$emit('ZongxiangNetTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-world'
                        },
                        style: {
                            marginRight: '1rem',
                            color: '#2D8CF0',
                            fontSize: '1rem'
                        }
                    }),
                    h('strong', {
                        style: {
                            color: '#2D8CF0'
                        }
                    }, params.row.zongxiangNetNum)
                ]);
            }
        },
        {
            title: '互联网数量',
            key: 'internetNum',
            width: 150,
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    props: {
                        title: 'hello'
                    },
                    on: {
                        click() {
                            vm.$bus.$emit('InterNetTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-world'
                        },
                        style: {
                            marginRight: '1rem',
                            color: '#2D8CF0',
                            fontSize: '1rem'
                        }
                    }),
                    h('strong', {
                        style: {
                            color: '#2D8CF0'
                        }
                    }, params.row.internetNum)
                ]);
            }
        },
        {
            title: '政务外网数量',
            key: 'zhengwuExtranetNum',
            width: 150,
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    props: {
                        title: 'hello'
                    },
                    on: {
                        click() {
                            vm.$bus.$emit('PolicyOutsideNetTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-world'
                        },
                        style: {
                            marginRight: '1rem',
                            color: '#2D8CF0',
                            fontSize: '1rem'
                        }
                    }),
                    h('strong', {
                        style: {
                            color: '#2D8CF0'
                        }
                    }, params.row.zhengwuExtranetNum)
                ]);
            }
        },
        {
            title: '公务内网数量',
            key: 'gongwuIntranetNum',
            width: 150,
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    props: {
                        title: 'hello'
                    },
                    on: {
                        click() {
                            vm.$bus.$emit('PublicInsideNetTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-world'
                        },
                        style: {
                            marginRight: '1rem',
                            color: '#2D8CF0',
                            fontSize: '1rem'
                        }
                    }),
                    h('strong', {
                        style: {
                            color: '#2D8CF0'
                        }
                    }, params.row.gongwuIntranetNum)
                ]);
            }
        },
        {
            title: '纵向专网备注',
            key: 'zongxiangNetBeizhu',
            width: 150,
        },
        {
            title: '互联网运营商',
            key: 'internetOffer',
            width: 250
        },
        {
            title: '互联网带宽',
            key: 'internetWidth',
            width: 250
        },
        {
            title: '横向专网备注',
            key: 'hengxiangNetBeizhu',
            width: 150,
        },
        {
            title: '政务外网运营商',
            key: 'zhengwuExtranetOffer',
            width: 250
        },
        {
            title: '政务外网带宽',
            key: 'zhengwuExtranetWidth',
            width: 200
        },
        {
            title: '政务内网运营商',
            key: 'zhengwuIntranetOffer',
            width: 250
        },
        {
            title: '政务内网带宽',
            key: 'zhengwuIntranetWidth',
            width: 150
        },
        {
            title: '公务内网供应商',
            key: 'gongwuIntranetOffer',
            width: 200,
        },
        {
            title: '公务内网带宽',
            key: 'gongwuIntranetWidth',
            width: 150
        },
        {
            title: '专线联通带宽',
            key: 'liantongWidth',
            width: 150
        },
        {
            title: '专线联通数量',
            key: 'liantongNum',
            width: 150
        },
        {
            title: '专线电信带宽',
            key: 'dianxingWidth',
            width: 150
        },
        {
            title: '专线电信数量',
            key: 'dianxingNum',
            width: 150
        },
        {
            title: '专线移动带宽',
            key: 'yidongWidth',
            width: 150
        },
        {
            title: '专线移动数量',
            key: 'yidongNum',
            width: 100
        },
        {
            title: '专线广电带宽',
            key: 'guangdianWidth',
            width: 150
        },
        {
            title: '专线广电数量',
            key: 'guangdianNum',
            width: 150
        },
        {
            title: '路由器',
            key: 'router',
            width: 150
        },
        {
            title: '交换机',
            key: 'switchMachine',
            width: 150
        },
        {
            title: '安全设备',
            key: 'safetyEquipment',
            width: 150
        },
        {
            title: '其他',
            key: 'other',
            width: 150
        }
    ]
}