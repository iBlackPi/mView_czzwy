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
                        title: '信息资源名称',
                        key: 'infoResourceName'
                    },
                    {
                        title: '信息项名称',
                        key: 'infoName'
                    },
                    {
                        title: '信息项说明',
                        key: 'infoInstruction'
                    },
                    {
                        title: '信息项所属部门',
                        key: 'infoDepartment'
                    },
                    {
                        title: '需求部门',
                        key: 'infoRequireDepartment'
                    },
                    {
                        title: '用途',
                        key: 'infoUse'
                    },
                    {
                        title: '需求紧急程度',
                        key: 'infoLevel'
                    },
                    {
                        title: '是否已获取数据',
                        key: 'getInfo'
                    },
                    {
                        title: '备注',
                        key: 'beizhu'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzInfo = this.$store.state.czCloudInfo.totalInfo.CzInfo;
                if(CzInfo){
                    this.totalCount = CzInfo.totalCount;
                    return CzInfo.list;
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