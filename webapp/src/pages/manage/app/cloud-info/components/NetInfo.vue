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
                        title: '单位',
                        key: 'org',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: '互联网有无接入',
                        key: 'intenet',
                        width: 130
                    },
                    {
                        title: '互联网接入方式',
                        key: 'intenetModel',
                        width: 130
                    },
                    {
                        title: '互联网接入运营商',
                        key: 'intenetOperator',
                        width: 130
                    },
                    {
                        title: '互联网线路带宽',
                        key: 'intenetBandwidth',
                        width: 130
                    },
                    {
                        title: '互联网IP地址',
                        key: 'intenetIp',
                        width: 130
                    },
                    {
                        title: '互联网业务系统名称',
                        key: 'intenetBussinessName',
                        width: 130
                    },
                    {
                        title: '互联网拓扑图',
                        key: 'intenetTuopu',
                        width: 130
                    },
                    {
                        title: '业务专网有无接入',
                        key: 'specialNetwork',
                        width: 130
                    },
                    {
                        title: '业务专网接入方式',
                        key: 'specialNetworkModel',
                        width: 130
                    },
                    {
                        title: '业务专网接入运营商',
                        key: 'specialNetworkOperator',
                        width: 130
                    },
                    {
                        title: '业务专网线路带宽',
                        key: 'specialNetworkBandwidth',
                        width: 150
                    },
                    {
                        title: '业务专网IP地址',
                        key: 'specialNetworkIp',
                        width: 150
                    },
                    {
                        title: '业务专网业务系统名称',
                        key: 'specialNetworkBussinessName',
                        width: 150
                    },
                    {
                        title: '业务专网拓扑图',
                        key: 'specialNetworkTuopu',
                        width: 150
                    },
                    {
                        title: '政务外网有无接入',
                        key: 'govExtranet',
                        width: 150
                    },
                    {
                        title: '政务外网接入方式',
                        key: 'govExtranetModel',
                        width: 150
                    },
                    {
                        title: '政务外网接入运营商',
                        key: 'govExtranetOperator',
                        width: 150
                    },
                    {
                        title: '政务外网线路带宽',
                        key: 'govExtranetBandwidth',
                        width: 150
                    },
                    {
                        title: '政务外网IP地址',
                        key: 'govExtranetIp',
                        width: 150
                    },
                    {
                        title: '政务外网业务系统名称',
                        key: 'govExtranetBussinessName',
                        width: 150
                    },
                    {
                        title: '政务外网拓扑图',
                        key: 'govExtranetTuopu',
                        width: 150
                    },
                    {
                        title: '政务内网有无接入',
                        key: 'govIntranet',
                        width: 150
                    },
                    {
                        title: '政务内网接入方式',
                        key: 'govIntranetModel',
                        width: 150
                    },
                    {
                        title: '政务内网接入运营商',
                        key: 'govIntranetOperator',
                        width: 150
                    },
                    {
                        title: '政务内网线路带宽',
                        key: 'govIntranetBandwidth',
                        width: 150
                    },
                    {
                        title: '政务内网IP地址',
                        key: 'govIntranetIp',
                        width: 150
                    },
                    {
                        title: '政务内网业务系统名称',
                        key: 'govIntranetBussinessName',
                        width: 150
                    },
                    {
                        title: '政务内网拓扑图',
                        key: 'govIntranetTuopu',
                        fixed: 'right',
                        width: 150
                    },
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzNetworkseclist = this.$store.state.czCloudInfo.totalInfo.CzNetworkseclist;
                if(CzNetworkseclist){
                    this.totalCount = CzNetworkseclist.totalCount;
                    return CzNetworkseclist.list;
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
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzNetworkseclist&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if(data.success){
                        // todo 这里直接对state进行修改，不合理，代码重构时更正
                        this.$store.state.czCloudInfo.totalInfo.CzNetworkseclist.list = data.data.list;
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