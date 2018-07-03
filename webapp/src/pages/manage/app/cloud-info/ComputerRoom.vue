<template>
    <div class="computer-room">
        <Card>
            <p slot="title" style="font-weight: normal;">机房信息维护</p>
            <AutoComplete
                    v-model="searchName"
                    :data="autoCompleteData"
                    :filter-method="filterMethod"
                    :transfer="true"
                    @on-select="onSelect"
                    placeholder="搜索部门名，若存在会智能提示"
                    clearable
                    icon="ios-search"
                    style="width: 300px;">
            </AutoComplete>
            <Button type="primary" icon="ios-search" @click="search">搜索</Button>

            <Alert show-icon style="margin-top: 1rem;" closable>
                现状说明
                <template slot="desc">
                    45个局委办自建了72个机房（总面积约3800平米），其中交通局8个；其次是住建局有6个；公安5个，供电公司4个；另有14个托管机房，30家单位租用了云服务；
                </template>
            </Alert>

            <Alert type="warning" show-icon closable>
                存在问题
                <template slot="desc">
                    基础设施缺乏统筹规划，部分单位存在为1个应用建设1个机房的情况，投资分散，建设不规范，存在极大的安全生产隐患；
                    90%以上机房建设不规范，设计与运营管理比较落后，系统性、可用性、可扩展性不足，且与IT设备机架化的趋势脱节，存在较大的安全隐患，严重影响了功能的发挥；
                </template>
            </Alert>

            <Table border :columns="columns" :data="computerRooms" style="margin-top: 1rem;"></Table>
            <!-- show-total-->
            <Page :total="totalCount" show-sizer @on-change="changePage"
                  @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
        </Card>
        <computer-room-modal></computer-room-modal>
        <computer-room-other-tip :computerRooms="computerRooms"></computer-room-other-tip>
    </div>
</template>

<script>
    import ComputerRoomModal from './components/ComputerRoomModal';
    import ComputerRoomOtherTip from './tips/ComputerRoomOtherTip';
    export default {
        name: "",
        data() {
            return {
                allInfo: [],
                allComputerRoomInfo: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '部门名称',
                        key: 'department',
                        width: '200',
                        render: (h, params) => {
                            return h('div', {
                                style: {
                                    cursor: 'pointer'
                                },
                                props: {
                                    title: 'hello'
                                },
                                on: {
                                    click: () => {
                                        this.$bus.$emit('ComputerRoomOtherTip', params.row.department);
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
                                }, params.row.department)
                            ]);
                        }
                    },
                    {
                        title: '自建机房',
                        key: 'selfBuiltMachineRoomNum'
                    },
                    {
                        title: '托管机房',
                        key: 'trusteeshipRoomNum'
                    },
                    {
                        title: '租用云主机',
                        key: 'cloudServiceNum'
                    },
                    {
                        title: '是否有信息科',
                        key: 'temp1'
                    },
                    {
                        title: '机房面积（平米）',
                        key: 'temp3'
                    },
                    {
                        title: '托管机房说明',
                        key: 'temp4'
                    },
                    {
                        title: '租云服务',
                        key: 'temp5'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
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
                                            this.$bus.$emit('showUpdateComputerRoom', params.row);
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                computerRooms: [],
                pageSize: 10,
                start: 1,
                totalCount: 0,
                searchName: '',
                department: '',
                type: ''
            }
        },
        computed: {
            // 搜索框根据用户输入智能补全功能
            autoCompleteData() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                // vue实例化的时候该值为默认的空数组，所以排除初始化的情况
                if (czCloudInfo instanceof Array) {

                } else {
                    return Object.keys(czCloudInfo);
                }
            }
        },
        watch: {
            // 当搜索框为空时，默认搜索全部
            searchName(newValue, oldValue) {
                if (newValue === '') {
                    this.department = '';
                    this.getComputerRoomInfo();
                }
            }
        },
        components: {
            ComputerRoomModal,
            ComputerRoomOtherTip
        },
        methods: {
            search() {
                this.start = 1;
                this.department = this.searchName;
                this.getComputerRoomInfo();
            },
            changePage(destination) {
                this.start = destination;
                this.getComputerRoomInfo();
            },
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                this.start = 1;
                //翻页的时候是带着查询参数去翻页的
                this.getComputerRoomInfo();
            },
            getComputerRoomInfo() {
                this.$httpt.get(`machineRoomController.do?getCzMachineRooms&start=${this.start}&pageSize=${this.pageSize}&department=${this.department}&type=${this.type}`).then(({data}) => {
                    if (data.success) {
                        this.computerRooms = data.data.list;
                        this.totalCount = data.data.totalCount;
                    } else {
                        this.$Notice.error({
                            title: '获取机房信息失败'
                        })
                    }
                })
            },
            // 搜索框根据用户输入智能补全功能：匹配用户输入
            // option为autoCompleteData数组中的项，该方法会遍历所有项
            filterMethod(value, option) {
                if (value !== '') {
                    return option.indexOf(value) !== -1;
                }
            },
            onSelect(department) {
                this.department = department;
                this.getComputerRoomInfo();
            },
        },
        mounted() {
            if (this.$route.query.computerRoomType) {
                this.type = this.$route.query.computerRoomType;
                this.getComputerRoomInfo();
            }
            this.$nextTick(() => {
                this.getComputerRoomInfo();
                this.$httpt.get(`machineRoomController.do?getCzMachineRooms&start=&pageSize=10000&department=&type=`).then(({data}) => {
                    if (data.success) {
                        this.allInfo = data.data.list;
                        //筛选出是否有信息科的数据
                        if (this.$route.query.hasInfoDepartment) {
                            this.computerRooms = this.allInfo.filter(item => {
                                return item.temp1 === this.$route.query.hasInfoDepartment;
                            });
                            this.totalCount = this.computerRooms.length;
                        }
                    } else {
                        this.$Notice.error({
                            title: '获取机房信息失败'
                        })
                    }
                })
            });
            //监听对话框的更新通知，修改成功通知父组件表格及时更新
            this.$bus.$on('updateComputerRoomInfo', () => {
                this.getComputerRoomInfo();
            });
        },
        //todo 尽快的获取数据
        //todo 如果用户直接进入后台页面，那总信息就无法获取到
        //todo 所以这里尽快的去获取下总览信息，供对话框中的搜索框自动提示功能使用
        created() {
            this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});

        }
    }
</script>

<style scoped type="text/less" lang="less">
    .computer-room {
        height: 100%;
    }

    .button-container {
        position: absolute;
        right: 17px;
        top: 8px;
    }
</style>