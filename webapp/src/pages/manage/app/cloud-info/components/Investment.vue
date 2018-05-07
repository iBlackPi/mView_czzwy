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
                        title: '项目名称',
                        key: 'projectname',
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
                        key: 'year',
                        sortable: true
                    },
                    {
                        title: '硬件',
                        key: 'hardware',
                        sortable: true
                    },
                    {
                        title: '软件',
                        key: 'software',
                        sortable: true
                    },
                    {
                        title: '运行维护',
                        key: 'maintainfee',
                        sortable: true
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                return this.$store.state.czCloudInfo.investment;
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
                this.where.currentPage = destination;
                //翻页的时候是带着查询参数去翻页的
                this.$store.dispatch('czCloudInfo/getInvestment', {vm: this, where: this.where});
            },
            changePageSize(pageSize){
                this.where.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.$store.dispatch('czCloudInfo/getInvestment', {vm: this, where: this.where});
            },
            searchDepartment(){
                this.$store.dispatch('czCloudInfo/getInvestment', {vm: this, where: this.where});
            }
        },
        mounted(){
            this.$store.dispatch('czCloudInfo/getInvestment', {vm: this, where: this.where});
        }
    }
</script>

<style scoped>

</style>