<template>
    <div class="investment">
        <Table border :columns="columns" :data="totalInfo"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize"
              style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    import columns from '../table-heads/info-sys-maintain-head';
    export default {
        name: "",
        data() {
            return {
                columns: columns,
                where: {
                    countPerPage: 10,
                    currentPage: 1,
                    department: '财政局'
                },
                totalCount: 0
            }
        },
        computed: {
            // todo 计算属性的值从store中获取，而在组件中又需要修改该值，但是又不能去出发store更新，那怎么更改该值
            // todo 比较好的办法就是去更改store中的值，采用mutation去改，这里为了方便，我直接用赋值更改
            totalInfo: {
                get() {
                    let CzInfomatinSystem = this.$store.state.czCloudInfo.totalInfo.CzInfomatinSystem;
                    if (CzInfomatinSystem) {
                        this.totalCount = CzInfomatinSystem.totalCount;
                        this.$emit('closeLoading');
                        return CzInfomatinSystem.list;
                    } else {
                        this.totalCount = 0;
                        return [];
                    }
                },
                // todo 这里是改不了totalInfo的值的
                set(info) {
                    return info;
                }
            },
            currentDepartment() {
                return this.$store.state.czCloudInfo.currentDepartment;
            }
        },
        methods: {
            changePage(destination) {
                //http://localhost:8088/czportal/bigScreenController.do?getInvestmentDetails&start=1&pageSize=10&department=
                this.where.currentPage = destination;
                // 翻页的时候是带着查询参数去翻页的
                // todo 字符串中的换行会被保留，请求参数的时候浏览器会解析这些换行
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzInfomatinSystem&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if (data.success) {
                        this.$store.state.czCloudInfo.totalInfo.CzInfomatinSystem.list = data.data.list;
                    } else {
                        console.error('分页获取表3 信息化系统调研表信息失败')
                    }
                }).catch(err => {
                    throw Error(err);
                })
            },
            changePageSize(pageSize) {
                this.where.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.changePage(this.where.currentPage);
            }
        }
    }
</script>

<style scoped>

</style>