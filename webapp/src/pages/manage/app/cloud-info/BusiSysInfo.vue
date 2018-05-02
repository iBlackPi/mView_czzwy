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
                countPerPage: 10,
                currentPage: 1,
                totalCount: 0,
                columns: [
                    {
                        title: '信息系统名称',
                        key: 'busiSysName'
                    },
                    {
                        title: '是否可云化',
                        key: 'password'
                    },
                    {
                        title: '部署位置',
                        key: 'password'
                    },
                    {
                        title: '服务器类型',
                        key: 'password'
                    }
                ],
                totalInfo: [{
                    busiSysName: '沧州市行政事业单位资产管理信息系统',
                    password:'xxx'
                },{
                    busiSysName: '沧州市行政事业单位资产管理信息系统',
                    password:'xxx'
                },{
                    busiSysName: '沧州市行政事业单位资产管理信息系统',
                    password:'xxx'
                },{
                    busiSysName: '沧州市行政事业单位资产管理信息系统',
                    password:'xxx'
                },{
                    busiSysName: '沧州市行政事业单位资产管理信息系统',
                    password:'xxx'
                }]
            }
        },
        methods: {
            changePage(destination){
                this.currentPage = destination;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage(this.currentPage, this.countPerPage, this.searchName);
            },
            changePageSize(pageSize){
                this.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage(this.currentPage, this.countPerPage, this.searchName);
            },
            findByPage(currentPage, countPerPage, searchName){
                this.$http.post(`upLoadExcelController.do?query&
                start=${this.currentPage}&
                pageSize=${this.countPerPage}&
                department=${this.searchName}`, page).then(({data}) => {
                    if(data.success){
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                    }else{
                        this.$Notice.error({
                            title: '获取投资信息失败！'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>