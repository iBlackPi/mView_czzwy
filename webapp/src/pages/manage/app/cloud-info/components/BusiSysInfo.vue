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
                        title: '信息系统名称',
                        key: 'infomationSystemName'
                    },
                    {
                        title: '是否可云化',
                        key: 'remove'
                    },
                    {
                        title: '部署位置',
                        key: 'deployMode'
                    },
                    {
                        title: '服务器类型',
                        key: 'serverType'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                return this.$store.state.czCloudInfo.busiSys;
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
        },
        mounted(){
            this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
        }
    }
</script>

<style scoped>

</style>