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
                //http://localhost:8088/czportal/bigScreenController.do?getInvestmentDetails&start=1&pageSize=10&department=
                this.where.currentPage = destination;
                // 翻页的时候是带着查询参数去翻页的
                // todo 字符串中的换行会被保留，请求参数的时候浏览器会解析这些换行
                // todo 接口中需要传递后台的entity类名，确定该数据要调用哪一张表
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzCertificate&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if(data.success){
                        // todo 这里直接对state进行修改，不合理，代码重构时更正
                        this.$store.state.czCloudInfo.totalInfo.CzCertificate.list = data.data.list;
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