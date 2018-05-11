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
                        title: '项目名称',
                        key: 'projectname',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: '年度',
                        key: 'year',
                        sortable: true,
                        width: 150
                    },
                    {
                        title: '硬件',
                        key: 'hardware',
                        sortable: true,
                        width: 150
                    },
                    {
                        title: '软件',
                        key: 'software',
                        sortable: true,
                        width: 150
                    },
                    {
                        title: '运行维护',
                        key: 'maintainfee',
                        sortable: true,
                        width: 150
                    },
                    {
                        title: '经费来源（请下拉选择，另预算内基建投资含国债项目资金）',
                        key: 'feesorce',
                        width: 250
                    },
                    {
                        title: '项目建设内容',
                        key: 'buildcontent',
                        width: 150
                    },
                    {
                        title: '使用效果（可另附页详细说明）',
                        key: 'useeffect',
                        width: 200
                    },
                    {
                        title: '存在问题',
                        key: 'problem',
                        width: 150
                    },
                    {
                        title: '提升建议',
                        key: 'upsuggest',
                        width: 150
                    },
                    {
                        title: '其它（需要补充说明的内容）',
                        key: 'other',
                        width: 200
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzItproject = this.$store.state.czCloudInfo.totalInfo.CzItproject;
                if(CzItproject){
                    this.totalCount = CzItproject.totalCount;
                    return CzItproject.list;
                }else{
                    this.totalCount = 0;
                    return [];
                }
            },
            // todo 如果想让计算属性响应其依赖的变化，必须得先绑定依赖，而绑定依赖的办法就是你要去有机会事先调用该计算属性的getter方法
            // todo 因为计算属性绑定的函数就是默认作为该属性的getter方法，你在某个地方只要访问该变量，即可完成绑定
            // todo 这里使用store非常不合适，因为我不需要被动的响应该变化，我只需要在用户搜索或者点击弹出对话框时调用即可，不需要store做中转站
            // currentDepartment(){
            //     let temp = this.$store.state.czCloudInfo.currentDepartment;
            //     this.where.department = temp;
            //     this.$store.dispatch('czCloudInfo/getInvestment', {vm: this, where: this.where});
            //     return temp;
            // }
        },
        methods: {
            changePage(destination){
                //http://localhost:8088/czportal/bigScreenController.do?getInvestmentDetails&start=1&pageSize=10&department=
                this.where.currentPage = destination;
                // 翻页的时候是带着查询参数去翻页的
                // todo 字符串中的换行会被保留，请求参数的时候浏览器会解析这些换行
                // todo 接口中需要传递后台的entity类名，确定该数据要调用哪一张表
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzItproject&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if(data.success){
                        // todo 这里直接对state进行修改，不合理，代码重构时更正
                        this.$store.state.czCloudInfo.totalInfo.CzItproject.list = data.data.list;
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