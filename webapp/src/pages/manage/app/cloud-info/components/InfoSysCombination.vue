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
                //http://localhost:8088/czportal/bigScreenController.do?getInvestmentDetails&start=1&pageSize=10&department=
                this.where.currentPage = destination;
                // 翻页的时候是带着查询参数去翻页的
                // todo 字符串中的换行会被保留，请求参数的时候浏览器会解析这些换行
                // todo 接口中需要传递后台的entity类名，确定该数据要调用哪一张表
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzInfoZhenghe&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if(data.success){
                        // todo 这里直接对state进行修改，不合理，代码重构时更正
                        this.$store.state.czCloudInfo.totalInfo.CzInfoZhenghe.list = data.data.list;
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