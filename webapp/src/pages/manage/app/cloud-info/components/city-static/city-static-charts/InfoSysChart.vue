<template>
    <Card class="card">
        <p slot="title">业务系统概览</p>
        <span href="#" slot="extra" class="total-num">
                        业务系统总数：{{totalCount}}
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
                    let busiSysNum = 0;
                    let removeNum = 0;
                    Object.keys(czCloudInfo).forEach(key => {
                        busiSysNum += czCloudInfo[key].bussinessNum;
                        removeNum += czCloudInfo[key].removeNum;
                    });
                    this.totalCount = busiSysNum;
                    this.pieSysData.push({name: '不可上云', value: busiSysNum - removeNum});
                    this.pieSysData.push({name: '可上云', value: removeNum});
                }
            }
        },
        methods: {
            // 请求政务信息系统信息
            getInfo() {
                this.$httpt.get('bigScreenController.do?getCzInfomatinSystem').then(({data}) => {
                    if (data.success) {
                        this.data = [];
                        let temp = data.data;
                        this.data.push(temp.internetInfoNum);
                        this.data.push(temp.govExtrantInfoNum);
                        this.data.push(temp.specialNetInfoNum);
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
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>