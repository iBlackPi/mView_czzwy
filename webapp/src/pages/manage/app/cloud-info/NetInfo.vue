<template>
    <div class="investment">
        <!--搜索表单-->
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="department">
                <Input type="text" v-model="formInline.department" clearable placeholder="部门名称">
                <Icon type="cube" slot="prepend" style="color: #28f;"></Icon>
                </Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
            </FormItem>
        </Form>

        <!--图表展示重要信息-->
        <collapse v-model="isOpen" accordion>
            <panel name="1">
                <!--信息化系统数据可视化-->
                <div slot="content" class="info-sys-important">
                    <Card class="card">
                        <p slot="title">接入网络分布</p>
                        <div style="height: 10rem;">
                            <ve-pie
                                    :rippleAnimation="true"
                                    style="width: 100%; height: 100%;"
                                    :center="['40%', '50%']"
                                    backgroundColor="transparent"
                                    id="resource-catalog"
                                    :data="pieData"
                                    :radius="['55%','75%']"
                                    :coverOption="coverOption"
                                    :rippleSize = 5
                            ></ve-pie>
                        </div>
                    </Card>
                    <Card class="card">
                        <p slot="title">网络设备统计</p>
                        <div style="height: 10rem;">
                            <ve-rect-coordinate
                                    id="connect-net"
                                    style="height:100%"
                                    backgroundColor=""
                                    :xAxisData="xAxisData"
                                    :showLegend=true
                                    :coverOption="coverOption2">
                                <ve-bar
                                        :data="data"
                                        name="数量（个）"
                                        barWidth="20"
                                ></ve-bar>
                            </ve-rect-coordinate>
                        </div>
                    </Card>
                </div>
            </panel>
        </collapse>

        <Table border :columns="columns" :data="totalInfo" style="margin-top: 1rem;"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    import columns from './table-heads/net-info-head';
    export default {
        name: "",
        data(){
            return {
                isOpen: '1',
                columns: columns,
                pieData: [
                    {value: 71, name:'互联网'},
                    {value: 19, name:'政务外网'},
                    {value: 90, name:'业务专网'}
                ],
                coverOption: {
                    legend: {
                        top: 60,
                        right: 0,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{b}:{d}({c})`
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        }
                    ]
                },
                xAxisData: ['路由器', '交换机', '安全设备'],
                data: [64, 60, 66],
                coverOption2: {
                    grid: {
                        top: '12%',
                        bottom: '15%'
                    },
                    legend: {
                        top: -10,
                        right: -30,
                        textStyle: {
                            color: '#217bcc'
                        }
                    },
                    xAxis: {
                        type : 'category',
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        /*分隔线*/
                        splitLine: {
                            show: false,
                        },
                        /*刻度标签*/
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    series: [
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#333'
                            }
                        }
                    ]
                },
                totalCount: 0,
                totalInfo: [],
                formInline: {
                    department: '',
                    pageSize: 10,
                    currentPage: 1
                },
                ruleInline: {
                    infoSysName: [
                        { required: false, message: '必填项', trigger: 'blur' }
                    ],
                    sysDeployNet: [
                        { required: false, message: '必填项', trigger: 'blur' }
                    ]
                },
                selectOne: [],
                selectTwo: []
            }
        },
        methods: {
            changePage(destination = this.formInline.currentPage){
                // 翻页的时候是带着查询参数去翻页的
                this.$httpt.get('networkController.do?getCzNetwork&' +
                    'department=' + this.formInline.department+ '&' +
                    'currentPage='+ destination +'&' +
                    'pageSize=' + this.formInline.pageSize).then(({data}) => {
                    if(data.success) {
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                        // todo 统计搜索结果中网络分布和网络设备数量

                    }else {
                        console.error('分页获取网络情况表信息失败')
                    }
                }).catch(err => {
                    throw Error(err);
                })
            },
            changePageSize(pageSize) {
                this.where.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.changePage();
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.changePage();
                        this.getNetInfo(this.formInline.department);
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            getNetInfo(department) {
                if(!department) {
                    department = '';
                }
                this.$httpt.get(`networkController.do?getCzNetwork&department=${department}&pageSize=10000`).then(({data}) => {
                    if (data.success) {
                        this.data = [];
                        this.pieData = [];
                        let routers = 0;
                        let switchMachine = 0;
                        let safetyEquipment = 0;
                        let internetNum = 0;
                        let zhengwuNum = 0;
                        let netNum = 0;
                        data.data.list.forEach(netInfo => {
                            routers += Number(netInfo.router);
                            switchMachine += Number(netInfo.switchMachine);
                            safetyEquipment += Number(netInfo.safetyEquipment);
                            internetNum += Number(netInfo.internetNum);
                            zhengwuNum += Number(netInfo.zhengwuExtranetNum);
                            netNum += (Number(netInfo.hengxiangNetNum) + Number(netInfo.zongxiangNetNum));
                        });
                        this.data = [routers, switchMachine, safetyEquipment];
                        this.totalCount = routers + switchMachine + safetyEquipment;
                        this.pieData.push({name: '互联网', value: internetNum});
                        this.pieData.push({name: '政务外网', value: zhengwuNum});
                        this.pieData.push({name: '专网', value: netNum});
                    } else {
                        this.$Notice.error({
                            title: '获取网络设备信息失败'
                        })
                    }
                })
            }
        },
        created() {
            if (JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) === '{}') {
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            }
        },
        mounted() {
            this.changePage();
            this.getNetInfo();
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .info-sys-important {
        display: flex;
        flex-flow: row nowrap;
    }
    .card {
        flex: 1;
        &:first-child {
            margin-right: .5rem;
        }
        &:nth-child(2) {
            margin-left: .5rem;
        }
    }
</style>