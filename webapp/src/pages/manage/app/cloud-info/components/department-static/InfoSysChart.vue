<template>
    <Card class="card">
        <p slot="title">信息系统统计</p>
        <span href="#" slot="extra" class="total-num">
                        信息系统总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <input type="hidden" :value="totalInfo">
            <ve-pie
                    :rippleAnimation="true"
                    style="width: 49%; height: 100%; float: left;"
                    :center="['40%', '50%']"
                    backgroundColor="transparent"
                    id="info-system5"
                    :data="pieSysData"
                    :radius="['40%','60%']"
                    :coverOption="coverOption"
                    :rippleSize=5
            ></ve-pie>
            <ve-rect-coordinate
                    id="connect-net"
                    style="width: 49%; height:100%; float: left; margin-left: 2%;"
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
</template>

<script>
    export default {
        name: "",
        props: {
            currentDepartment: {
                type: String,
                default: '财政局'
            }
        },
        data() {
            return {
                pieSysData: [
                    {value: 71, name: '可上云'},
                    {value: 19, name: '不可上云'}
                ],
                totalCount: 0,
                coverOption: {
                    legend: {
                        top: 80,
                        right: 30,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{d}%({c})`
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
                xAxisData: ['互联网', '政务外网', '专网'],
                data: [64, 60, 66],
                coverOption2: {
                    grid: {
                        top: '20%',
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
                }
            }
        },
        computed: {
            totalInfo() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.pieSysData = [];
                    let busiSysNum = czCloudInfo[this.currentDepartment].bussinessNum;
                    let removeNum = czCloudInfo[this.currentDepartment].removeNum;
                    this.totalCount = busiSysNum;
                    this.pieSysData.push({name: '不可上云', value: busiSysNum - removeNum});
                    this.pieSysData.push({name: '可上云', value: removeNum});
                }
            }
        },
        methods: {
            update(department) {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.pieSysData = [];
                    let busiSysNum = czCloudInfo[department].bussinessNum;
                    let removeNum = czCloudInfo[department].removeNum;
                    this.totalCount = busiSysNum;
                    this.pieSysData.push({name: '不可上云', value: busiSysNum - removeNum});
                    this.pieSysData.push({name: '可上云', value: removeNum});
                }
            },
            // 请求政务信息系统信息
            getInfo(department) {
                if(!department) {
                    department = this.currentDepartment;
                }
                this.$httpt.get(`bigScreenController.do?getInfoSysNetCount&department=${department}`).then(({data}) => {
                    if (data.success) {
                        this.data = [];
                        let internetNum = 0;
                        let govExtrantNetNum = 0;
                        let bussinessNetNum = 0;
                        let netInfo = data.data;
                        Object.keys(netInfo).forEach(department => {
                            internetNum += netInfo[department].internetNum;
                            govExtrantNetNum += netInfo[department].govExtrantNetNum;
                            bussinessNetNum += netInfo[department].bussinessNetNum;
                        });

                        this.data = [internetNum, govExtrantNetNum, bussinessNetNum];
                    } else {
                        throw new Error('获取政务统计信息失败！');
                    }
                })
            }
        },
        created() {
            if (JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) === '{}') {
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            }
            this.getInfo();
            this.$bus.$on('update', department => {
                this.update(department);
                this.getInfo(department);
            })
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>