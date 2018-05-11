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
                    department: '财政局'
                },
                totalCount: 0,
                columns: [
                    {
                        title: '问题',
                        key: 'question',
                        width: 100,
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
                        width: 150
                    },
                    {
                        title: '填报单位',
                        key: 'insertDept',
                        width: 150
                    },
                    {
                        title: '分项问题',
                        key: 'otherQuestion',
                        width: 250
                    },
                    {
                        title: '问答题答案',
                        key: 'answer',
                        width: 150
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
                        title: '其他',
                        key: 'other',
                        width: 100
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzInformationInfrastructure = this.$store.state.czCloudInfo.totalInfo.CzInformationInfrastructure;
                if(CzInformationInfrastructure){
                    this.totalCount = CzInformationInfrastructure.totalCount;
                    return CzInformationInfrastructure.list;
                }else{
                    this.totalCount = 0;
                    return [];
                }
            }
        },
        methods: {
            changePage(destination){
                //http://localhost:8088/czportal/bigScreenController.do?getInvestmentDetails&start=1&pageSize=10&department=
                this.where.currentPage = destination;
                // 翻页的时候是带着查询参数去翻页的
                // todo 字符串中的换行会被保留，请求参数的时候浏览器会解析这些换行
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzInformationInfrastructure&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if(data.success){
                        this.$store.state.czCloudInfo.totalInfo.CzInformationInfrastructure.list = data.data.list;
                    }else{
                        console.error('分页获取表4 信息化基础设施信息失败')
                    }
                }).catch(err => {
                    throw Error(err);
                })
            },
            changePageSize(pageSize){
                this.where.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.changePage(this.where.currentPage);
            }
        }
    }
</script>

<style scoped>

</style>