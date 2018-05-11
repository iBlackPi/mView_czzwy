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
                    department: '住建局'
                },
                totalCount: 0,
                columns: [
                    {
                        title: '问题',
                        key: 'question',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: '填写提示',
                        key: 'insertHint',
                        width: 300
                    },
                    {
                        title: '备选答案',
                        key: 'optionAnswer',
                        width: 100
                    },
                    {
                        title: '填报单位',
                        key: 'insertDept',
                        width: 100
                    },
                    {
                        title: '分项问题',
                        key: 'otherQuestion',
                        width: 100
                    },
                    {
                        title: '问答题答案',
                        key: 'answer',
                        width: 100
                    },
                    {
                        title: 'A',
                        key: 'typeA',
                        width: 100
                    },
                    {
                        title: 'B',
                        key: 'typeB',
                        width: 100
                    },
                    {
                        title: 'C',
                        key: 'typeC',
                        width: 100
                    },
                    {
                        title: 'D',
                        key: 'typeD',
                        width: 100
                    },
                    {
                        title: 'E',
                        key: 'typeE',
                        width: 100
                    },
                    {
                        title: 'F',
                        key: 'typeF',
                        width: 100
                    },
                    {
                        title: 'G',
                        key: 'typeG',
                        width: 100
                    },
                    {
                        title: 'H',
                        key: 'typeH',
                        width: 100
                    },
                    {
                        title: 'I',
                        key: 'typeI',
                        width: 100
                    },
                    {
                        title: 'J',
                        key: 'typeJ',
                        width: 100
                    },
                    {
                        title: '其他',
                        key: 'other',
                        width: 100,
                        fixed: 'right'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzOperation = this.$store.state.czCloudInfo.totalInfo.CzOperation;
                if(CzOperation){
                    this.totalCount = CzOperation.totalCount;
                    return CzOperation.list;
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