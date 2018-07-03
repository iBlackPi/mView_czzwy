<template>
    <collapse v-model="isOpen" accordion>
        <input type="hidden" :value="totalInfo">
        <panel name="1">
            全市信息概览
            <div slot="content" class="info-sys-important">

                <info-sys-chart></info-sys-chart>

                <info-department-chart></info-department-chart>

                <computer-room-chart></computer-room-chart>

                <!--<server-chart></server-chart>-->

                <resource-catalog-chart></resource-catalog-chart>

                <net-route-chart></net-route-chart>

                <net-device-chart></net-device-chart>

                <software-chart></software-chart>

                <hardware-chart></hardware-chart>
            </div>
        </panel>
    </collapse>
</template>

<script>
    import InfoSysChart from './city-static-charts/InfoSysChart';
    import InfoDepartmentChart from './city-static-charts/InfoDepartmentChart';
    import ComputerRoomChart from './city-static-charts/ComputerRoomChart';
    import ServerChart from './city-static-charts/ServerChart';
    import ResourceCatalogChart from './city-static-charts/ResourceCatalogChart';
    import NetRouteChart from './city-static-charts/NetRouteChart';
    import NetDeviceChart from './city-static-charts/NetDeviceChart';
    import SoftwareChart from './city-static-charts/SoftwareChart';
    import HardwareChart from './city-static-charts/HardwareChart';

    export default {
        name: "",
        data() {
            return {
                isOpen: '1',
                pieData: [
                    {value: 71, name: '互联网'},
                    {value: 19, name: '政务外网'},
                    {value: 90, name: '业务专网'}
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
                                    formatter: `{d}%({c})`
                                },
                                emphasis: {
                                    show: false,

                                }
                            }
                        }
                    ]
                },
                xAxisData: ['互联网', '政务外网', '业务专线', '政务内网'],
                data: [64, 60, 66, 10],
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
        components: {
            InfoSysChart,
            InfoDepartmentChart,
            ComputerRoomChart,
            ServerChart,
            ResourceCatalogChart,
            NetRouteChart,
            NetDeviceChart,
            SoftwareChart,
            HardwareChart
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
                    this.pieSysData.push({name: '不可上云', value: busiSysNum - removeNum});
                    this.pieSysData.push({name: '可上云', value: removeNum});
                }
            }
        },
        created() {
            if(JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) === '{}') {
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .info-sys-important {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }

    .card {
        flex-grow: 1;
        width: 30%;
        margin: .5rem;
        .chart-container {
            height: 12rem;
        }
        &:nth-child(1) {
            width: 40%;
        }
        & .total-num {
            color: #000;
        }
    }

</style>