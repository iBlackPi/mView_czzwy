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
                        title: '单位名称',
                        key: 'deptName'
                    },
                    {
                        title: '单位简称',
                        key: 'deptAlias'
                    },
                    {
                        title: '上级单位',
                        key: 'heigherDept'
                    },
                    {
                        title: '组织机构代码',
                        key: 'orgCode'
                    },
                    {
                        title: '电子证照对接人姓名',
                        key: 'name'
                    },
                    {
                        title: '电子证照对接人职务',
                        key: 'job'
                    },
                    {
                        title: '联系方式',
                        key: 'phone'
                    },
                    {
                        title: '所属部门',
                        key: 'bumeng'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzCertificate = this.$store.state.czCloudInfo.totalInfo.CzCertificate;
                if(CzCertificate){
                    this.totalCount = CzCertificate.totalCount;
                    return CzCertificate.list;
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