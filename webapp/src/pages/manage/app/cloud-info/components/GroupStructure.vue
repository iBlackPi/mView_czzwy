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
                        title: '问题',
                        key: 'question'
                    },
                    {
                        title: '填写提示',
                        key: 'insertHint'
                    },
                    {
                        title: '备选答案',
                        key: 'optionAnswer'
                    },
                    {
                        title: '分项问题',
                        key: 'otherQuestion'
                    },
                    {
                        title: '问答题答案',
                        key: 'answer'
                    },
                    {
                        title: '其他',
                        key: 'other'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzOrgDiaoyan = this.$store.state.czCloudInfo.totalInfo.CzOrgDiaoyan;
                if(CzOrgDiaoyan){
                    this.totalCount = CzOrgDiaoyan.totalCount;
                    return CzOrgDiaoyan.list;
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