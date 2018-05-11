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
                //http://localhost:8088/czportal/bigScreenController.do?getInvestmentDetails&start=1&pageSize=10&department=
                this.where.currentPage = destination;
                // 翻页的时候是带着查询参数去翻页的
                // todo 字符串中的换行会被保留，请求参数的时候浏览器会解析这些换行
                // todo 接口中需要传递后台的entity类名，确定该数据要调用哪一张表
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzInfo&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if(data.success){
                        // todo 这里直接对state进行修改，不合理，代码重构时更正
                        this.$store.state.czCloudInfo.totalInfo.CzInfo.list = data.data.list;
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