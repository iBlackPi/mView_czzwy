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
                        title: '职责/职能域',
                        key: 'responsibility',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: '业务事项名称',
                        key: 'bussinessName',
                        width: 130
                    },
                    {
                        title: '业务事项标识符',
                        key: 'bussinessSymbol',
                        width: 130
                    },
                    {
                        title: '业务事项描述',
                        key: 'bussinessDesc',
                        width: 130
                    },
                    {
                        title: '业务事项类别',
                        key: 'bussinessType',
                        width: 130
                    },
                    {
                        title: '责任处室',
                        key: 'responsibilityRoom',
                        width: 100
                    },
                    {
                        title: '所用信息系统名称',
                        key: 'sysName',
                        width: 130
                    },
                    {
                        title: '发布日期',
                        key: 'deployTime',
                        width: 100
                    },
                    {
                        title: '是否涉密',
                        key: 'secret',
                        width: 100
                    },
                    {
                        title: '业务办理处室',
                        key: 'bussinessRoom',
                        width: 130
                    },
                    {
                        title: '业务办理方式',
                        key: 'bussinessMode',
                        width: 130
                    },
                    {
                        title: '业务办理依据',
                        key: 'bussinessReason',
                        width: 130
                    },
                    {
                        title: '业务办理地点',
                        key: 'bussinessAddress',
                        width: 130
                    },
                    {
                        title: '业务办理联系电话',
                        key: 'businessPhone',
                        width: 140
                    },
                    {
                        title: '业务年均办理量',
                        key: 'bussinessSize',
                        width: 100
                    },
                    {
                        title: '业务办理所需材料',
                        key: 'bussinessMaterial',
                        width: 140
                    },
                    {
                        title: '业务办理后存档的材料',
                        key: 'bussinessSaveMaterial',
                        width: 150
                    },
                    {
                        title: '业务办理后对外提供材料',
                        key: 'bussinessOutMaterial',
                        width: 150
                    },
                    {
                        title: '备注',
                        key: 'beizhu',
                        fixed: 'right',
                        width: 100
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzBussiness = this.$store.state.czCloudInfo.totalInfo.CzBussiness;
                if(CzBussiness){
                    this.totalCount = CzBussiness.totalCount;
                    return CzBussiness.list;
                }else{
                    this.totalCount = 0;
                    return [];
                }
            }
        },
        methods: {
            changePage(destination){
                this.where.currentPage = destination;
                //翻页的时候是带着查询参数去翻页的
                this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
            },
            changePageSize(pageSize){
                this.where.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
            },
            searchDepartment(){
                this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
            }
        }
    }
</script>

<style scoped>

</style>