<template>
    <module-layout title="信息共享被需求单位TOP5">
        <ve-rect-coordinate
                id="info-share-needed"
                style="height:100%"
                backgroundColor=""
                :yAxisData="yAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="data"
                    name="数量(个)"
                    barWidth="10"
            ></ve-bar>
        </ve-rect-coordinate>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    let myColor = ['#05A2FA'];
    let myBgColor = ['rgba(5,162,250,0.2)'];
    let gain = 0.9;
    export default {
        name: "computor-room",
        data(){
            return {
                yAxisData: ['国土局', '人社局', '公安局', '教育局', '市场监管局'],
                data: [9, 9, 13, 14, 19],
                coverOption: {
                    grid: {
                        top: '25%',
                        bottom: '20%',
                        left: '15%'
                    },
                    legend: {
                        top: 10,
                        right: -30
                    },
                    yAxis: [{
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
                            textStyle: {
                                // color: function (param, index) {
                                //     return myColor[index]
                                // },
                                color: '#fff',
                                fontSize: 13 * gain,
                            }
                        },
                        data: ['国土局', '人社局', '公安局', '教育局', '市场监管局']
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
                        yAxisIndex: 1,
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
                                    [9, 9, 13, 14, 19].forEach(function (value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
                                    return stuNum;
                                },
                                position: 'right',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '25%',
                        data: [20, 20, 20, 20, 20]
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
                            barWidth: '25%',
                            data: [7, 8, 8, 11, 13]
                        }
                    ]
                }
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            getInfo(){
                this.$httpt.get('bigScreenController.do?getTop5Org').then(res => {
                    if(res.data){
                        let temp = res.data;
                        this.data = [];
                        Object.keys(temp).forEach((key) => {
                            this.data.unshift(temp[key]);
                        });
                    }else{
                        throw new Error('获取信息共享需求量失败！');
                    }
                })
            }
        },
        mounted(){
            let _this = this;
            this.$nextTick(() => {
                // _this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>