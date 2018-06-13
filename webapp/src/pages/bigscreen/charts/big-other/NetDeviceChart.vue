<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="net-device"
                style="width: 100%; height:100%; margin-left: 2%;"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption"
                @click-series="goToManage">
            <ve-bar
                    :data="data"
                    name="数量（个）"
                    barWidth="20"
            ></ve-bar>
        </ve-rect-coordinate>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';

    let myColor = ['#E6CD46', '#06B15B', '#05A2FA', '#13b5b1'];
    let myBgColor = ['rgba(239,207,62,0.2)', 'rgba(6,177,89,0.2)', 'rgba(5,162,250,0.2)', 'rgba(19,181,177,0.2)'];
    let gain = 0.9;
    export default {
        name: "",
        data() {
            return {
                colors: ['#01A2FC', '#F9D135', '#01B344'],
                xAxisData: ['路由器', '交换机', '安全设备'],
                data: [64, 60, 66],
                totalCount: 0,
                coverOption: {}
            }
        },
        computed: {
            sum() {
                return `网络设备统计  总数：${this.totalCount}`
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            goToManage() {
                this.$router.push({name: 'info-maintain'})
            },
            getNetInfo() {
                this.$httpt.get(`networkController.do?getCzNetwork&department=&pageSize=10000`).then(({data}) => {
                    if (data.success) {
                        this.data = [];
                        let routers = 0;
                        let switchMachine = 0;
                        let safetyEquipment = 0;
                        data.data.list.forEach(netInfo => {
                            routers += Number(netInfo.router);
                            switchMachine += Number(netInfo.switchMachine);
                            safetyEquipment += Number(netInfo.safetyEquipment);
                        });
                        this.data = [routers, switchMachine, safetyEquipment];
                        this.totalCount = routers + switchMachine + safetyEquipment;
                        this.createOption();
                    } else {
                        this.$Notice.error({
                            title: '获取网络信息失败'
                        })
                    }
                })
            },
            createOption() {
                let _this = this;
                let option = {
                    grid: {
                        top: '30%',
                        bottom: '25%'
                    },
                    legend: {
                        top: 10,
                        right: -30
                    },
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(160,160,160,0.3)',
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13 * gain,
                            }
                        },
                        data: ['路由器', '交换机', '安全设备']
                    }, {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: []
                    }],
                    series: [{
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: function (params) {
                                    let num = myBgColor.length;
                                    return myBgColor[params.dataIndex % num]
                                },
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    let stuNum = 0;
                                    [64, 60, 66].forEach(function (value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    });
                                    return stuNum;
                                },
                                position: 'top',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '20%',
                        data: [300, 300, 300]
                    },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: function (params) {
                                        let num = myColor.length;
                                        return myColor[params.dataIndex % num]
                                    },
                                    barBorderRadius: 50,
                                    borderWidth: 0,
                                    borderColor: '#333',
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                }
                            },
                            barWidth: '20%',
                            data: [64, 60, 66]
                        }]
                };
                option.series[0].label.normal.formatter = function (params) {
                    let stuNum = 0;
                    _this.data.forEach(function (value, index, array) {
                        if (params.dataIndex == index) {
                            stuNum = value;
                        }
                    });
                    return stuNum;
                };
                option.series[1].data = this.data;
                this.coverOption = option;
            }
        },
        created() {
            this.getNetInfo();
            this.createOption();
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>