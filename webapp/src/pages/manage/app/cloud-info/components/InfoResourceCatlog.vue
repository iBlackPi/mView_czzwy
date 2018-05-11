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
                        title: '信息系统名称（必填项）',
                        key: 'infoSysName',
                        width: 200,
                        fixed: 'left'
                    },
                    {
                        title: '系统架构类型',
                        key: 'architectureType',
                        width: 150
                    },
                    {
                        title: '系统部署网络（必填项）',
                        key: 'sysDeployNet',
                        width: 200
                    },
                    {
                        title: '是否垂直管理系统',
                        key: 'verticalManage',
                        width: 200
                    },
                    {
                        title: '系统维护情况',
                        key: 'sysMaintenance',
                        width: 150
                    },
                    {
                        title: '数据类型',
                        key: 'dataType',
                        width: 100
                    },
                    {
                        title: '数据存储格式',
                        key: 'dataSaveMode',
                        width: 150
                    },
                    {
                        title: '信息资源代码',
                        key: 'infoCode',
                        width: 150
                    },
                    {
                        title: '信息资源名称（必填项）',
                        key: 'infoResourceName',
                        width: 150
                    },
                    {
                        title: '信息资源摘要（必填项）',
                        key: 'infoResourceDigest',
                        width: 150
                    },
                    {
                        title: '部门名称（必填项）',
                        key: 'deptName',
                        width: 150
                    },
                    {
                        title: '部门内设科室或内部部门（选填项）',
                        key: 'deptKeshi',
                        width: 250
                    },
                    {
                        title: '部门地址',
                        key: 'deptAddress',
                        width: 150
                    },
                    {
                        title: '部门代码（选填项）',
                        key: 'deptCode',
                        width: 150
                    },
                    {
                        title: '信息资源格式分类（必填项）',
                        key: 'infoFormatClassify',
                        width: 250
                    },
                    {
                        title: '信息资源格式类型（必填项）',
                        key: 'infoFormatType',
                        width: 250
                    },
                    {
                        title: '其他类型资源格式描述（选填项）',
                        key: 'otherInfoDescs',
                        width: 250
                    },
                    {
                        title: '信息资源形态分类（必填项）',
                        key: 'infoPatternClassify',
                        width: 250
                    },
                    {
                        title: '数据结构',
                        key: 'dataMode',
                        width: 150
                    },
                    {
                        title: '服务分类',
                        key: 'serviceType',
                        width: 150
                    },
                    {
                        title: '管理方式',
                        key: 'manageType',
                        width: 150
                    },
                    {
                        title: '所属业务系统名称',
                        key: 'bussinessName',
                        width: 150
                    },
                    {
                        title: '管理主题',
                        key: 'themew',
                        width: 150
                    },
                    {
                        title: '资源所属目录等级',
                        key: 'catalogLevela',
                        width: 150
                    },
                    {
                        title: '信息资源分类编码',
                        key: 'infoTypeCode',
                        width: 150
                    },
                    {
                        title: '业务事项名称（必填项）',
                        key: 'bussinessShixiangName',
                        width: 250
                    },
                    {
                        title: '数据质量',
                        key: 'dataQualityq',
                        width: 150
                    },
                    {
                        title: '使用权限',
                        key: 'useAuthoritys',
                        width: 150
                    },
                    {
                        title: '口径范围',
                        key: 'caliberRange',
                        width: 150
                    },
                    {
                        title: '关联及类目名称',
                        key: 'relevanceCatalogName',
                        width: 150
                    },
                    {
                        title: '备注',
                        key: 'beizhu',
                        width: 150
                    },
                    {
                        title: '数据存储总量/G',
                        key: 'dataStoragesa',
                        width: 150
                    },
                    {
                        title: '结构化信息记录总数/条',
                        key: 'structuringCount',
                        width: 250
                    },
                    {
                        title: '已共享的数据存储量/G',
                        key: 'shareStorage',
                        width: 250
                    },
                    {
                        title: '已共享结构化记录数/条',
                        key: 'shareStructuringCount',
                        width: 250
                    },
                    {
                        title: '已开放的数据存储量/G',
                        key: 'openDataStorage',
                        width: 250
                    },
                    {
                        title: '已开放结构化记录数/条',
                        key: 'openStructuringCount',
                        width: 250
                    },
                    {
                        title: '序号',
                        key: 'serNumber',
                        width: 150
                    },
                    {
                        title: '信息项名称（必填项）',
                        key: 'infomationName',
                        width: 150
                    },
                    {
                        title: '数据类型（必填项）',
                        key: 'dataModel',
                        width: 150
                    },
                    {
                        title: '数据长度（必填项）',
                        key: 'dataLength',
                        width: 150
                    },
                    {
                        title: '共享类型（必填项）',
                        key: 'shareMode',
                        width: 150
                    },
                    {
                        title: '共享条件（必填项）',
                        key: 'shareCondition',
                        width: 150
                    },
                    {
                        title: '共享方式分类（必填项）',
                        key: 'shareModeType',
                        width: 150
                    },
                    {
                        title: '共享方式类型（必填项）',
                        key: 'shareMethod',
                        width: 150
                    },
                    {
                        title: '是否向社会开放（必填项）',
                        key: 'openn',
                        width: 150
                    },
                    {
                        title: '开放条件（对外开放时必填项）',
                        key: 'openCondition',
                        width: 150
                    },
                    {
                        title: '发布日期',
                        key: 'deployTimes',
                        width: 150
                    },
                    {
                        title: '"更新周期（必填项）',
                        key: 'updateCycles',
                        width: 150
                    },
                    {
                        title: '服务地址',
                        key: 'serviceAddress',
                        width: 150
                    },
                    {
                        title: '服务类型',
                        key: 'serviceMode',
                        width: 150
                    },
                    {
                        title: '在线资源链接地址',
                        key: 'resourceOnlineAddress',
                        width: 150
                    },
                    {
                        title: '分类方式',
                        key: 'classificationa',
                        width: 150
                    },
                    {
                        title: '类目名称',
                        key: 'catalogName',
                        width: 150
                    },
                    {
                        title: '类目编码',
                        key: 'catalogCode',
                        width: 150
                    },
                    {
                        title: '分类标准名称',
                        key: 'catalogStandardName',
                        width: 150
                    },
                    {
                        title: '信息资源格式',
                        key: 'infoResTypea',
                        width: 150
                    },
                    {
                        title: '元数据标识符',
                        key: 'metadataa',
                        width: 150
                    },
                    {
                        title: '元数据联系单位',
                        key: 'metadataOrg',
                        width: 150
                    },
                    {
                        title: '元数据维护方地址',
                        key: 'metadataAddress',
                        width: 200,
                        fixed: 'right'
                    }
                ]
            }
        },
        computed: {
            totalInfo(){
                let CzResourceCatalog = this.$store.state.czCloudInfo.totalInfo.CzResourceCatalog;
                if(CzResourceCatalog){
                    this.totalCount = CzResourceCatalog.totalCount;
                    return CzResourceCatalog.list;
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
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${this.$store.state.czCloudInfo.currentDepartment}&tableName=CzResourceCatalog&currentPage=${destination}&pageSize=${this.where.countPerPage}`).then(({data}) => {
                    if(data.success){
                        // todo 这里直接对state进行修改，不合理，代码重构时更正
                        this.$store.state.czCloudInfo.totalInfo.CzResourceCatalog.list = data.data.list;
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