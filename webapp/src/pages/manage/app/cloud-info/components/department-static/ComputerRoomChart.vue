<template>
    <Card class="card">
        <p slot="title">机房信息统计</p>
        <span href="#" slot="extra" class="total-num">
                        机房总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <ve-rect-coordinate
                    id="computer-room"
                    style="width: 100%; height:100%; margin-left: 2%;"
                    backgroundColor=""
                    :xAxisData="xAxisData"
                    :showLegend=true
                    :coverOption="coverOption2"
                    @click-series="goToComputorRoom">
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
                xAxisData: ['自建机房', '托管机房', '租用云服务'],
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
            goToComputorRoom(params) {
                this.$router.push({name: 'computer-room', query: {computerRoomType: params.name}});
            },
            getComputerRoomInfo() {
                this.$httpt.get(`machineRoomController.do?getCzMachineRooms&start=0&pageSize=10000&department=${this.currentDepartment}`).then(({data}) => {
                    if (data.success) {
                        this.data = [];
                        let selfBuiltNum = 0;
                        let hostingNum = 0;
                        let cloudServiceNum = 0;
                        data.data.list.forEach(computerRoom => {
                            selfBuiltNum = computerRoom.selfBuiltMachineRoomNum;
                            hostingNum = computerRoom.trusteeshipRoomNum;
                            cloudServiceNum = computerRoom.cloudServiceNum;
                        });
                        this.data = [selfBuiltNum, hostingNum, cloudServiceNum];
                        this.totalCount = selfBuiltNum + hostingNum + cloudServiceNum;
                    } else {
                        this.$Notice.error({
                            title: '获取机房信息失败'
                        })
                    }
                })
            },
        },
        created() {
            this.getComputerRoomInfo();
            this.$bus.$on('update', department => {
                this.getComputerRoomInfo();
            })
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>