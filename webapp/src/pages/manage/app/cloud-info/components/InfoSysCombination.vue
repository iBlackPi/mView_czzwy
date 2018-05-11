<template>
    <div class="investment">
        <Table width="100%" border :columns="columns" :data="totalInfo"></Table>
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
                    department: '财政局'
                },
                totalCount: 0,
                columns: [
                    {
                        title: '单位名称',
                        key: 'deptName',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: '信息系统名称',
                        key: 'sysInfoName',
                        width: 150
                    },
                    {
                        title: '子系统名称',
                        key: 'subSysInfoName',
                        width: 150
                    },
                    {
                        title: '使用与实际业务流程长期脱节',
                        key: 'cleanReasonA',
                        width: 200
                    },
                    {
                        title: '功能可被其他系统替代',
                        key: 'cleanReasonB',
                        width: 200
                    },
                    {
                        title: '所占资源长期处于空闲状态',
                        key: 'cleanReasonC',
                        width: 200
                    },
                    {
                        title: '运行维护停止更新服务',
                        key: 'cleanReasonD',
                        width: 200
                    },
                    {
                        title: '使用范围小',
                        key: 'cleanReasonE',
                        width: 150
                    },
                    {
                        title: '使用频度低',
                        key: 'cleanReasonF',
                        width: 150
                    },
                    {
                        title: '其他原因',
                        key: 'cleanReasonG',
                        width: 150
                    },
                    {
                        title: '计划完成清理时间',
                        key: 'cleanDoneTime',
                        width: 150
                    },
                    {
                        title: '备注',
                        key: 'beizhu',
                        width: 150,
                        fixed:'right'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzInfoZhenghe = this.$store.state.czCloudInfo.totalInfo.CzInfoZhenghe;
                if(CzInfoZhenghe){
                    this.totalCount = CzInfoZhenghe.totalCount;
                    return CzInfoZhenghe.list;
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