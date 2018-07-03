<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="base-reource"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption"
                @click-series="goToManage">
            <ve-bar
                    :data="dataCPU"
                    name="CPU(核)"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataMemory"
                    name="内存(G)"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataRestore"
                    name="存储(T)"
                    barWidth="20"
            ></ve-bar>
        </ve-rect-coordinate>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';

    let myColor = ['#E6CD46', '#06B15B', '#05A2FA', '#13b5b1', '#06B15B'];
    let myBgColor = ['rgba(239,207,62,0.2)', 'rgba(6,177,89,0.2)', 'rgba(5,162,250,0.2)', 'rgba(19,181,177,0.2)', 'rgba(6,177,89,0.2)'];
    let gain = 0.9;
    export default {
        name: "computor-room",
        data() {
            return {
                xAxisData: ['第一批', '第二批', '第三批'],
                dataCPU: [1340, 282, 1064],
                dataMemory: [4113, 896, 7522],
                dataRestore: [113, 40, 60],
                coverOption: {
                    grid: {
                        top: '30%',
                        bottom: '25%',
                        left: '15%'
                    },
                    tooltip: {
                        show: false
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
                        data: ['第一批', '第二批', '第三批']
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
                        data: ['第一批', '第二批', '第三批']
                    }],
                    series: [{
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: 'rgba(5,162,250,0.2)',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                formatter: function (params) {
                                    var stuNum = 0;
                                    [1340, 282, 1064].forEach(function (value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
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
                        data: [7550, 7550, 7550]
                    }, {
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: 'rgba(239,207,62,0.2)',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                formatter: function (params) {
                                    var stuNum = 0;
                                    [4113, 896, 7522].forEach(function (value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
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
                        data: [7550, 7550, 7550]
                    }, {
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: 'rgba(6,177,89,0.2)',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                formatter: function (params) {
                                    var stuNum = 0;
                                    [113, 40, 60].forEach(function (value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
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
                        data: [7550, 7550, 7550]
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#01A2FC',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '20%',
                        data: [1340, 282, 1064]
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#DFCD55',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                                fontSize: '1rem',
                            }
                        },
                        barWidth: '20%',
                        data: [4113, 896, 7522]
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#01B344',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                                fontSize: '1rem',
                            }
                        },
                        barWidth: '20%',
                        data: [113, 40, 60]
                    }]
                }
            }
        },
        components: {
            ModuleLayout
        },
        computed: {
            sum() {
                let temp = [];
                for (let i = 0, len = this.dataCPU.length; i < len; i++) {
                    temp.push(this.dataCPU[i] + this.dataMemory[i] + this.dataRestore[i]);
                }
                return `基础资源需求 总量：<span style="color: #217bcc;">${temp[0]}、${temp[1]}、${temp[2]}</span>`;
            }
        },
        methods: {
            goToManage() {
                this.$router.push({name: 'move-info'});
            },
            getInfo() {
                this.$httpt.get('bigScreenController.do?getResources').then((res) => {
                    let temp = res.data;
                    if (temp) {
                        this.dataCPU = [];
                        this.dataMemory = [];
                        this.dataRestore = [];
                        temp.forEach((item) => {
                            this.dataCPU.push(item['cpu']);
                            this.dataMemory.push(item['memory']);
                            this.dataRestore.push(item['storage']);
                        });
                    } else {
                        throw new Error('获取2018-2020迁移数量信息失败！');
                    }
                })
            }
        },
        mounted() {
            let _this = this;
            this.$nextTick(() => {
                // _this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>