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
                        title: '人员角色',
                        key: 'role'
                    },
                    {
                        title: '人员名称',
                        key: 'name'
                    },
                    {
                        title: '所属部门',
                        key: 'dept'
                    },
                    {
                        title: '职位/职称',
                        key: 'zhiwu'
                    },
                    {
                        title: '联系电话',
                        key: 'phone'
                    },
                    {
                        title: '电子邮件',
                        key: 'email'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzProgramPeople = this.$store.state.czCloudInfo.totalInfo.CzProgramPeople;
                if(CzProgramPeople){
                    this.totalCount = CzProgramPeople.totalCount;
                    return CzProgramPeople.list;
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