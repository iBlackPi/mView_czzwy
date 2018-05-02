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
                        title: '项目名称',
                        key: 'projectName',
                        filters: [
                            {
                                label: '项目名称',
                                value: 1
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age > 25;
                            } else if (value === 2) {
                                return row.age < 25;
                            }
                        }
                    },
                    {
                        title: '年度',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '硬件',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '软件',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '运行维护',
                        key: 'password',
                        sortable: true
                    }
                ],
                totalInfo: [{
                    projectName: '一体化业务平台',
                    password:'xxx'
                },{
                    projectName: '一体化业务平台',
                    password:'xxx'
                },{
                    projectName: '一体化业务平台',
                    password:'xxx'
                },{
                    projectName: '一体化业务平台',
                    password:'xxx'
                },{
                    projectName: '一体化业务平台',
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