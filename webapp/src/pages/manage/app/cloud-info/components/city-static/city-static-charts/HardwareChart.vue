<template>
    <Card class="card">
        <p slot="title">硬件信息统计</p>
        <span href="#" slot="extra" class="total-num">
                        硬件总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <ve-rect-coordinate
                    id="hardware"
                    style="width: 100%; height:100%; margin-left: 2%;"
                    backgroundColor=""
                    :xAxisData="xAxisData"
                    :showLegend=true
                    :coverOption="coverOption2"
                    @click-series="goToInfoSys">
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
                xAxisData: ['小机', '虚机', 'X86服务器', '网络设备'],
                data: [12, 118, 495, 679],
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
            goToInfoSys(params) {
                this.$router.push({name: 'info-sys-maintain', query: {hardwareType: params.name}});
            },
            getNetInfo() {
                // this.$httpt.get(`networkController.do?getCzNetwork&department=&pageSize=10000`).then(({data}) => {
                //     if (data.success) {
                //         this.data = [];
                //         let routers = 0;
                //         let switchMachine = 0;
                //         let safetyEquipment = 0;
                //         data.data.list.forEach(netInfo => {
                //             routers += Number(netInfo.router);
                //             switchMachine += Number(netInfo.switchMachine);
                //             safetyEquipment += Number(netInfo.safetyEquipment);
                //         });
                //         this.data = [routers, switchMachine, safetyEquipment];
                //         this.totalCount = routers + switchMachine + safetyEquipment;
                //     } else {
                //         this.$Notice.error({
                //             title: '获取网络信息失败'
                //         })
                //     }
                // })
            }
        },
        created() {
            this.getNetInfo();
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>