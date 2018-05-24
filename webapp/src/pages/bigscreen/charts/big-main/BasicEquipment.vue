<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="rectTest2"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption"
                :color="colors"
        >
            <ve-bar
                    :data="data"
                    id="basic-equipment"
                    name="数量(台)"
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
        name: "computor-room",
        data() {
            return {
                colors: ['#01A2FC', '#F9D135', '#01B344', '#01A2FC'],
                xAxisData: ['小机', 'X86服务器', '虚机', '网络设备'],
                data: [12, 495, 118, 679],
                coverOption: {
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
                        data: ['小机', 'X86服务器', '虚机', '网络设备']
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
                        }
                    ],
                    series: [{
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: function(params) {
                                    let num=myBgColor.length;
                                    return myBgColor[params.dataIndex%num]
                                },
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                formatter: function(params) {
                                    var stuNum = 0;
                                    [12, 495, 118, 679].forEach(function(value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
                                    return stuNum ;
                                },
                                position: 'top',
                                textStyle:{
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '25%',
                        data: [700, 700, 700, 700]
                    },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: function(params) {
                                        var num=myColor.length;
                                        return myColor[params.dataIndex%num]
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
                            barWidth: '25%',
                            data: [12, 495, 118, 679]
                        }
                    ]
                }
            }
        },
        computed: {
            sum() {
                let sum = 0;
                this.data.forEach(item => {
                    sum += item;
                });
                return `基础设备数量统计 总量：<span style="color: #217bcc;">${sum}</span>`;
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            getInfo() {
                this.$httpt.get('bigScreenController.do?getBasicDevice').then(({data}) => {
                    if (data.success) {
                        let temp = data.data;
                        this.data = [];
                        Object.keys(temp).forEach((key) => {
                            this.data.push(temp[key]);
                        });
                    } else {
                        throw Error('获取基础设备信息失败！');
                    }
                })
            }
        },
        mounted() {
            this.$nextTick(() => {
                // this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>