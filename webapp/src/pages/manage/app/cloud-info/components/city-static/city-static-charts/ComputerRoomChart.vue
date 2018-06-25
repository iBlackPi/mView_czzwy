<template>
    <Card class="card" style="width: 40%;">
        <p slot="title">机房信息统计</p>
        <span href="#" slot="extra" class="total-num">
                        拥有机房部门：{{hasComputerRoomCount}}&nbsp;&nbsp;&nbsp;机房总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <ve-rect-coordinate
                    id="computer-room"
                    style="width: 49%; height:100%; float: left;"
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
            <!--top5-->
            <ve-rect-coordinate
                    id="computer-room2"
                    style="width: 49%; height:100%; margin-left: 2%; float: left;"
                    backgroundColor=""
                    :xAxisData="xAxisData2"
                    :showLegend=true
                    :coverOption="coverOption2"
                    @click-series="goToComputorRoom">
                <ve-bar
                        :data="data2"
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
                xAxisData: ['自建机房', '托管机房', '租用云服务'],
                data: [64, 60, 66],
                xAxisData2: ['自建机房', '托管机房', '租用云服务'],
                data2: [64, 60, 66],
                totalCount: 0,
                hasComputerRoomCount: 0,
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
                this.$httpt.get(`machineRoomController.do?getCzMachineRooms&start=0&pageSize=10000&department=`).then(({data}) => {
                    if (data.success) {
                        this.data = [];
                        let selfBuiltNum = 0;
                        let hostingNum = 0;
                        let cloudServiceNum = 0;
                        let computerStaticArr = [];
                        data.data.list.forEach(computerRoom => {
                            selfBuiltNum += computerRoom.selfBuiltMachineRoomNum;
                            hostingNum += computerRoom.trusteeshipRoomNum;
                            cloudServiceNum += computerRoom.cloudServiceNum;
                            let count = computerRoom.selfBuiltMachineRoomNum + computerRoom.trusteeshipRoomNum + computerRoom.cloudServiceNum;
                            let topItem = {name: computerRoom.department, count: count};
                            computerStaticArr.push(topItem)
                            if(count !== 0) {
                                this.hasComputerRoomCount ++;
                            }
                        });
                        computerStaticArr.sort((a, b) => {return b.count - a.count;});
                        this.data = [selfBuiltNum, hostingNum, cloudServiceNum];
                        this.totalCount = selfBuiltNum + hostingNum + cloudServiceNum;
                        this.data2 = [computerStaticArr[0].count, computerStaticArr[1].count, computerStaticArr[2].count];
                        this.xAxisData2 = [computerStaticArr[0].name, computerStaticArr[1].name, computerStaticArr[2].name];
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
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>