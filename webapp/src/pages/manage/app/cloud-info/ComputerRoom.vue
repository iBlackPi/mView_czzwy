<template>
    <div class="computer-room">
        <Card style="height: 100%;">
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
            <Table border :columns="columns" :data="computerRooms" style="margin-top: 1rem;"></Table>
            <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
        </Card>
        <computer-room-modal></computer-room-modal>
    </div>
</template>

<script>
    import ComputerRoomModal from './components/ComputerRoomModal';
    export default {
        name: "",
        data () {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '部门名称',
                        key: 'department'
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
                department: ''
            }
        },
        computed: {
            // 搜索框根据用户输入智能补全功能
            autoCompleteData(){
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                // vue实例化的时候该值为默认的空数组，所以排除初始化的情况
                if(czCloudInfo instanceof Array){

                }else{
                    return Object.keys(czCloudInfo);
                }
            }
        },
        watch: {
            // 当搜索框为空时，默认搜索财政局
            searchName(newValue, oldValue){
                if(newValue === ''){
                    this.department = '';
                    this.getComputerRoomInfo();
                }
            }
        },
        components: {
            ComputerRoomModal
        },
        methods: {
            changePage(destination){
                this.start = destination;
                this.getComputerRoomInfo();
            },
            changePageSize(pageSize){
                this.pageSize = pageSize;
                this.start = 1;
                //翻页的时候是带着查询参数去翻页的
                this.getComputerRoomInfo();
            },
            getComputerRoomInfo(){
                this.$httpt.get(`machineRoomController.do?getCzMachineRooms&start=${this.start}&pageSize=${this.pageSize}`).then(({data}) => {
                    if(data.success){
                        this.computerRooms = data.data.list;
                        this.totalCount = data.data.totalCount;
                    }else{
                        this.$Notice.error({
                            title: '获取机房信息失败'
                        })
                    }
                })
            },
            // 搜索框根据用户输入智能补全功能：匹配用户输入
            // option为autoCompleteData数组中的项，该方法会遍历所有项
            filterMethod(value, option){
                if(value !== ''){
                    return option.indexOf(value) !== -1;
                }
            },
            onSelect(department){
                this.department = department;
                this.getComputerRoomInfo();
            },
        },
        mounted(){
            this.$nextTick(() => {
                this.getComputerRoomInfo();
            });
            //监听对话框的更新通知
            this.$bus.$on('updateComputerRoomInfo', () => {
                this.getComputerRoomInfo();
            });
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