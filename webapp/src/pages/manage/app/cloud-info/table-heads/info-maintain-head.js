export default function getInfoMaintainHead(vm) {
    return [
        {
            title: '单位名称',
            key: 'department',
            width: 200,
            fixed: 'left',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                // todo 此处this如果被放到一个单独的js文件中，怎么获取
                                // 点击单位的同时，弹出对话框并通知对话框中的组件都去更新自己的数据
                                vm.$bus.$emit('showDepartmentInfoModal', params.row.department);
                            }
                        }
                    }, params.row.department)
                ]);
            }
        },
        {
            title: '是否有信息科',
            key: 'temp1',
            sortable: true,
            width: 150
        },
        {
            title: '业务系统数量',
            key: 'bussinessNum',
            sortable: true,
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
                            vm.$bus.$emit('showInfoSysTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'cube'
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
                    }, params.row.bussinessNum)
                ]);
            }
        },
        {
            title: '可云化系统数',
            key: 'removeNum',
            sortable: true,
            width: 150,
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        click() {
                            // vm.$bus.$emit('showMoveToCloudTip', params.row.department);
                            vm.$router.push({name: 'move-info', query: {dName: params.row.department}});
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-cloud-upload-outline'
                        },
                        style: {
                            marginRight: '1rem',
                            color: '#01B344',
                            fontSize: '1rem'
                        }
                    }),
                    h('strong', {
                        style: {
                            color: '#01B344'
                        }
                    }, params.row.removeNum)
                ]);
            }
        },
        {
            title: '机房数量',
            key: 'machineroomNum',
            sortable: true,
            width: 150,
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        click() {
                            vm.$bus.$emit('showComputerRoomTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-home-outline'
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
                    }, params.row.machineroomNum)
                ]);
            }
        },
        {
            title: '服务器台数',
            key: 'serverNum',
            sortable: true,
            width: 150
        },
        {
            title: '资源目录数量',
            key: 'cataLogNum',
            sortable: true,
            width: 150
        },
        {
            title: '互联网线路数',
            key: 'internetNum',
            width: 200
        },
        {
            title: '政务外网线路数',
            key: 'zhengwuNum',
            width: 200
        },
        {
            title: '专网线路数',
            key: 'netNum',
            width: 150
        },
        {
            title: '网络设备数量',
            key: 'netDeviceNum',
            width: 150,
            fixed: 'right',
            render: (h, params) => {
                return h('div', {
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        click() {
                            vm.$bus.$emit('showNetDeviceTip', params.row.department);
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ios-world-outline'
                        },
                        style: {
                            marginRight: '1rem',
                            color: '#01B344',
                            fontSize: '1rem'
                        }
                    }),
                    h('strong', {
                        style: {
                            color: '#01B344'
                        }
                    }, params.row.netDeviceNum)
                ]);
            }
        }
    ];
}

