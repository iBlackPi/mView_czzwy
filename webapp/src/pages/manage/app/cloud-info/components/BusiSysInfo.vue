<template>
    <div class="investment">
        <Table border :columns="columns" :data="totalInfo"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize"
              style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                columns: [
                    {
                        title: '信息系统名称',
                        key: 'infomationSystemName',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: '功能介绍',
                        key: 'functiona',
                        width: 250
                    },
                    {
                        title: '系统分类',
                        key: 'systemType',
                        width: 150
                    },
                    {
                        title: '业务系统架构',
                        key: 'bussinessArchitecture',
                        width: 250
                    },
                    {
                        title: '部署架构',
                        key: 'deployArchitecture',
                        width: 150
                    },
                    {
                        title: '使用对象',
                        key: 'useObject',
                        width: 150
                    },
                    {
                        title: '所属网络',
                        key: 'network',
                        width: 150
                    },
                    {
                        title: '用户数',
                        key: 'userNumber',
                        width: 150
                    },
                    {
                        title: '并发数',
                        key: 'bingfaNumber',
                        width: 150
                    },
                    {
                        title: '架构',
                        key: 'architecture',
                        width: 150
                    },
                    {
                        title: '状态',
                        key: 'statuss',
                        width: 150
                    },
                    {
                        title: '系统涉及的信息安全情况',
                        key: 'safety',
                        width: 200
                    },
                    {
                        title: '信息安全等级',
                        key: 'safeLevel',
                        width: 150
                    },
                    {
                        title: '可用性要求',
                        key: 'useful',
                        width: 150
                    },
                    {
                        title: '域名和共享IP',
                        key: 'ip',
                        width: 150
                    },
                    {
                        title: '数据产生的方式',
                        key: 'produceType',
                        width: 200
                    },
                    {
                        title: '数据来源',
                        key: 'dataSource',
                        width: 150
                    },
                    {
                        title: '数据共享范围',
                        key: 'dataShareRange',
                        width: 150
                    },
                    {
                        title: '厂商名称',
                        key: 'factoryName',
                        width: 150
                    },
                    {
                        title: '建设时间',
                        key: 'buildTime',
                        width: 150
                    },
                    {
                        title: '软件支持时间',
                        key: 'softSupportTime',
                        width: 150
                    },
                    {
                        title: '软件支持截止日期',
                        key: 'softSupportDeadline',
                        width: 150
                    },
                    {
                        title: '是否厂商运维',
                        key: 'factorySupport',
                        width: 100
                    },
                    {
                        title: '操作系统类型',
                        key: 'osType',
                        width: 150
                    },
                    {
                        title: '操作系统版本',
                        key: 'osVision',
                        width: 150
                    },
                    {
                        title: '数据库类型和版本',
                        key: 'databasee',
                        width: 150
                    },
                    {
                        title: '部署模式',
                        key: 'deployType',
                        width: 150
                    },
                    {
                        title: '数据量',
                        key: 'dataSize',
                        width: 150
                    },
                    {
                        title: '年增长量',
                        key: 'increaseSize',
                        width: 150
                    },
                    {
                        title: '中间件类型版本',
                        key: 'middlewareVision',
                        width: 150
                    },
                    {
                        title: '部署模式',
                        key: 'deployMode',
                        width: 150
                    },
                    {
                        title: '其它软件（杀毒、运维、安全工具等）',
                        key: 'otherSoft',
                        width: 250
                    },
                    {
                        title: '服务器类型',
                        key: 'serverType',
                        width: 150
                    },
                    {
                        title: '服务器品牌',
                        key: 'serverBrand',
                        width: 150
                    },
                    {
                        title: '服务器型号',
                        key: 'serverModel',
                        width: 150
                    },
                    {
                        title: '虚拟化产品类型和版本',
                        key: 'vmInfo',
                        width: 250
                    },
                    {
                        title: '采购时间',
                        key: 'buyTime',
                        width: 150
                    },
                    {
                        title: '是否在保',
                        key: 'safeguard',
                        width: 150
                    },
                    {
                        title: '维保截至时间',
                        key: 'safeguardDeadline',
                        width: 250
                    },
                    {
                        title: '维保单位',
                        key: 'safeguardDept',
                        width: 150
                    },
                    {
                        title: '部署位置',
                        key: 'machineRoom',
                        width: 150
                    },
                    {
                        title: '用途',
                        key: 'useage',
                        width: 150
                    },
                    {
                        title: 'CPU型号',
                        key: 'cpuModel',
                        width: 150
                    },
                    {
                        title: 'CPU主频',
                        key: 'cpuFrequency',
                        width: 150
                    },
                    {
                        title: 'CPU个数',
                        key: 'cpuNum',
                        width: 150
                    },
                    {
                        title: 'CPU核数',
                        key: 'cpuCore',
                        width: 150
                    },
                    {
                        title: 'CPU使用均值',
                        key: 'cpuAvgUse',
                        width: 150
                    },
                    {
                        title: 'CPU使用峰值',
                        key: 'cpuTopUse',
                        width: 150
                    },
                    {
                        title: '内存大小',
                        key: 'memory',
                        width: 150
                    },
                    {
                        title: '内存使用率均值',
                        key: 'memoryAvgUse',
                        width: 150
                    },
                    {
                        title: '本地存储容量',
                        key: 'localStorge',
                        width: 150
                    },
                    {
                        title: '本地磁盘使用率',
                        key: 'localStorgeRate',
                        width: 200
                    },
                    {
                        title: '共享存储类型',
                        key: 'shareStorgeType',
                        width: 150
                    },
                    {
                        title: '共享存储容量',
                        key: 'shareStorge',
                        width: 150
                    },
                    {
                        title: '共享存储使用率',
                        key: 'shareStorgeRate',
                        width: 200
                    },
                    {
                        title: 'IP地址',
                        key: 'serverIp',
                        width: 150
                    },
                    {
                        title: '灾备情况介绍',
                        key: 'disasterRecovery',
                        width: 150
                    },
                    {
                        title: '备份方式',
                        key: 'recoveryType',
                        width: 150
                    },
                    {
                        title: '备份周期（天）',
                        key: 'recoveryPeriod',
                        width: 150
                    },
                    {
                        title: '备份数据保存期（月）',
                        key: 'recoveryDataTime',
                        width: 150
                    },
                    {
                        title: '建设模式',
                        key: 'buildMode',
                        width: 150
                    }
                ],
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