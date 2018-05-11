<template>
    <div class="investment">
        <Table border :columns="columns" :data="totalInfo"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
            return {
                where: {
                    countPerPage: 10,
                    currentPage: 1,
                    department: '住建局'
                },
                totalCount: 0,
                columns: [
                    {
                        title: '设备名称',
                        key: 'deviceName',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: '网络类型',
                        key: 'network',
                        width: 100
                    },
                    {
                        title: '型号',
                        key: 'sysType',
                        width: 100
                    },
                    {
                        title: '物理位置',
                        key: 'address',
                        width: 100
                    },
                    {
                        title: '所属网络区域',
                        key: 'netAddress',
                        width: 150
                    },
                    {
                        title: 'IP地址/掩码/网关',
                        key: 'ip',
                        width: 200
                    },
                    {
                        title: '系统软件及版本',
                        key: 'softVersion',
                        width: 150
                    },
                    {
                        title: '端口类型及数量',
                        key: 'portAndNumber',
                        width: 150
                    },
                    {
                        title: '主要用途',
                        key: 'useage',
                        width: 100
                    },
                    {
                        title: '是否热备',
                        key: 'rebei',
                        width: 100
                    },
                    {
                        title: '重要程度',
                        key: 'levela',
                        width: 100
                    },
                    {
                        title: '备注',
                        key: 'beizhu',
                        width: 100,
                        fixed: 'right'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzDevice = this.$store.state.czCloudInfo.totalInfo.CzDevice;
                if(CzDevice){
                    this.totalCount = CzDevice.totalCount;
                    return CzDevice.list;
                }else{
                    this.totalCount = 0;
                    return [];
                }
            }
        },
        methods: {
            changePage(destination){
                this.where.currentPage = destination;
                //翻页的时候是带着查询参数去翻页的
                this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
            },
            changePageSize(pageSize){
                this.where.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
            },
            searchDepartment(){
                this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
            }
        }
    }
</script>

<style scoped>

</style>