<template>
    <Card class="card" style="width: 50%;">
        <p slot="title">网络设备信息统计</p>
        <span href="#" slot="extra" class="total-num">
                        网络设备总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <ve-rect-coordinate
                    id="net-device"
                    style="width: 100%; height:100%; margin-left: 2%;"
                    backgroundColor=""
                    :xAxisData="xAxisData"
                    :showLegend=true
                    :coverOption="coverOption2"
                    @click-series="goToNetDevice">
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
                xAxisData: ['路由器', '交换机', '安全设备'],
                data: [64, 60, 66],
                totalCount: 0,
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
        methods: {
            goToNetDevice(params) {
                this.$router.push({name: 'net-info', query: {group: params.name}});
            },
            getNetInfo(department) {
                if(!department) {
                    department = this.currentDepartment;
                }
                this.$httpt.get(`networkController.do?getCzNetwork&department=${department}&pageSize=10000`).then(({data}) => {
                    if (data.success) {
                        let temp = data.data.list[0];
                        this.data = [];
                        let routers = Number(temp.router);
                        let switchMachine = Number(temp.switchMachine);
                        let safetyEquipment = Number(temp.safetyEquipment);
                        this.data = [routers, switchMachine, safetyEquipment];
                        this.totalCount = routers + switchMachine + safetyEquipment;
                    } else {
                        this.$Notice.error({
                            title: '获取网络设备信息失败'
                        })
                    }
                })
            },
        },
        created() {
            this.getNetInfo();
            this.$bus.$on('update', (department) => {
                this.getNetInfo(department);
            })
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>