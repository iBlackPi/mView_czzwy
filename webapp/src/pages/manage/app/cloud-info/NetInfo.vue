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

        <Alert show-icon closable style="margin-top: -1rem;">
            现状说明
            <template slot="desc">
                目前沧州市政府大部分局委办均存在政务外网、互联网、业务专网、政务内网和公务内网；
                55家单位接入政务外网；
                54家单位共租用89个独立的运营商出口接入到互联网；
                37家单位共建设59张业务专网，其中横向专网19个，纵向专网40个；
                54家单位接入政务内网（办公信息网）；
                50家单位接入公务内网。
                租用运营商线路405条：互联网89条，政务外网46条，业务专线175条，政务内网45条，公务内网50条；
                移动线路181条，联通线路145条，电信线路44条，广电线路35条；
                收集到716台网络设备清单，其中路由器117台，交换机443台，安全设备119台，其他设备37台。
            </template>
        </Alert>

        <Alert type="warning" show-icon closable>
            存在的问题
            <template slot="desc">
                各市直部门独自租用运营商专线，成本较高，资源利用率低；
                局委办内部多张网络独立共存，线路资源利用率低；
                局委办互联网出口安全防御手段不足，有些局委办甚至处于裸奔状态；
            </template>
        </Alert>

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
                                    :rippleSize=5
                                    @click-series="searchNet"
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
                                    :coverOption="coverOption2"
                                    @click-series="searchDevice">
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
        <!--分页 show-total -->
        <Page :total="totalCount" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"
              style="margin: .5rem 0 .5rem 0;"></Page>
        <hengxiang-net-tip :allInfo="allInfo"></hengxiang-net-tip>
        <inter-net-tip :allInfo="allInfo"></inter-net-tip>
        <policy-outside-net-tip :allInfo="allInfo"></policy-outside-net-tip>
        <public-inside-net-tip :allInfo="allInfo"></public-inside-net-tip>
        <zongxiang-net-tip :allInfo="allInfo"></zongxiang-net-tip>
    </div>
</template>

<script>
    import columns from './table-heads/net-info-head';
    import HengxiangNetTip from './tips/HengxiangNetTip';
    import InterNetTip from './tips/InterNetTip';
    import PolicyOutsideNetTip from './tips/PolicyOutsideNetTip';
    import PublicInsideNetTip from './tips/PublicInsideNetTip';
    import ZongxiangNetTip from './tips/ZongxiangNetTip';

    export default {
        name: "",
        components: {
            HengxiangNetTip,
            InterNetTip,
            PolicyOutsideNetTip,
            PublicInsideNetTip,
            ZongxiangNetTip
        },
        data() {
            return {
                isOpen: '1',
                columns: columns(this),
                pieData: [
                    {value: 89, name: '互联网'},
                    {value: 55, name: '政务外网'},
                    {value: 59, name: '业务专网'},
                    {value: 54, name: '政务内网'},
                    {value: 50, name: '公务内网'},
                ],
                coverOption: {
                    legend: {
                        top: 0,
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
                data: [117, 443, 119],
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
                        type: 'category',
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
                // 不分页的所有数据
                allInfo: [],
                formInline: {
                    department: '',
                    pageSize: 10,
                    currentPage: 1
                },
                ruleInline: {
                    infoSysName: [
                        {required: false, message: '必填项', trigger: 'blur'}
                    ],
                    sysDeployNet: [
                        {required: false, message: '必填项', trigger: 'blur'}
                    ]
                },
                networkType: '',
                deviceType: '',
                selectOne: [],
                selectTwo: []
            }
        },
        methods: {
            changePage(destination = this.formInline.currentPage) {
                // 翻页的时候是带着查询参数去翻页的
                this.$httpt.get('networkController.do?getCzNetwork&' +
                    'department=' + this.formInline.department + '&' +
                    'networkType=' + this.networkType + '&' +
                    'deviceType=' + this.deviceType + '&' +
                    'currentPage=' + destination + '&' +
                    'pageSize=' + this.formInline.pageSize).then(({data}) => {
                    if (data.success) {
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                        // todo 统计搜索结果中网络分布和网络设备数量
                    } else {
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
                        // this.getNetInfo(this.formInline.department);
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            searchNet(params) {
                this.networkType = params.name;
                this.changePage();
            },
            searchDevice(params) {
                this.deviceType = params.name;
                this.changePage();
            },
            getNetInfo(department) {
                if (!department) {
                    department = '';
                }
                this.$httpt.get(`networkController.do?getCzNetwork&department=${department}&pageSize=10000`).then(({data}) => {
                    if (data.success) {
                        if (department === '') {
                            this.allInfo = data.data.list;
                        }
                        // this.data = [];
                        // this.pieData = [];
                        // let routers = 0;
                        // let switchMachine = 0;
                        // let safetyEquipment = 0;
                        // let internetNum = 0;
                        // let zhengwuNum = 0;
                        // let netNum = 0;
                        // data.data.list.forEach(netInfo => {
                        //     routers += Number(netInfo.router);
                        //     switchMachine += Number(netInfo.switchMachine);
                        //     safetyEquipment += Number(netInfo.safetyEquipment);
                        //     internetNum += Number(netInfo.internetNum);
                        //     zhengwuNum += Number(netInfo.zhengwuExtranetNum);
                        //     netNum += (Number(netInfo.hengxiangNetNum) + Number(netInfo.zongxiangNetNum));
                        // });
                        // this.data = [routers, switchMachine, safetyEquipment];
                        // this.pieData.push({name: '互联网', value: internetNum});
                        // this.pieData.push({name: '政务外网', value: zhengwuNum});
                        // this.pieData.push({name: '专网', value: netNum});
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
            if (this.$route.query.networkType) {
                this.networkType = this.$route.query.networkType;
                this.changePage();
            }
            if (this.$route.query.deviceType) {
                this.deviceType = this.$route.query.deviceType;
                this.changePage();
            }
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