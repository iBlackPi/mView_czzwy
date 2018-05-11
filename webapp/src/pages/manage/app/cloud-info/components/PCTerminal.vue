BusiItem.vue<template>
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
                        title: '部门',
                        key: 'dept'
                    },
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '型号',
                        key: 'typee'
                    },
                    {
                        title: '数量',
                        key: 'pcNum'
                    },
                    {
                        title: 'CPU',
                        key: 'cpu'
                    },
                    {
                        title: '内存',
                        key: 'memory'
                    },
                    {
                        title: '硬盘',
                        key: 'disk'
                    },
                    {
                        title: '显卡',
                        key: 'videoCard'
                    },
                    {
                        title: '采购日期',
                        key: 'buyTime'
                    },
                    {
                        title: '操作系统',
                        key: 'os'
                    },
                    {
                        title: '软件',
                        key: 'soft'
                    },
                    {
                        title: '接入网络',
                        key: 'network'
                    },
                    {
                        title: '用途',
                        key: 'useage'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzPcTerminal = this.$store.state.czCloudInfo.totalInfo.CzPcTerminal;
                if(CzPcTerminal){
                    this.totalCount = CzPcTerminal.totalCount;
                    return CzPcTerminal.list;
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