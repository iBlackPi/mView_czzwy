export default function getMoveInfoHead(vm) {
    return [
        {
            title: '单位名称',
            key: 'department',
            width: 150,
            fixed: 'left'
        },
        {
            title: '信息系统名称',
            key: 'infoSystemName',
            width: 250,
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
                            vm.$router.push({name: 'info-sys-maintain', query: {infoSystemName: params.row.infoSystemName}});
                        }
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'ionic'
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
                    }, params.row.infoSystemName)
                ]);
            }
        },
        {
            title: '所属网络',
            key: 'network',
            width: 150
        },
        {
            title: '迁移时间',
            key: 'removeTime',
            width: 150
        },
        {
            title: 'CPU',
            key: 'cpu',
            width: 150
        },
        {
            title: '内存',
            key: 'memory',
            width: 150
        },
        {
            title: '存储G',
            key: 'userNumber',
            width: 150
        },
        {
            title: '备注',
            key: 'storage',
            width: 150
        }
    ]
}