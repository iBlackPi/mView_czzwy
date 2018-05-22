<template>
    <module-layout title="效益指标">
        <ve-rect-coordinate
                id="benefit-two2"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :color="colors"
                :coverOption="coverOption">
            <ve-line
                    :data="data1"
                    name="节约成本"
                    lineColor="#01A2FC">
            </ve-line>
            <ve-line
                    :data="data4"
                    name="节约机房空间"
                    lineColor="#01A2FC">
            </ve-line>
        </ve-rect-coordinate>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                colors: ['#01A2FC','#F9D135'],
                xAxisData: ['2018', '2019', '2020'],
                data1: [20, 35, 40],
                data4: [10, 15, 30],
                coverOption: {
                    legend: {
                        top: 0,
                        right: -30
                    },
                    grid: {
                        top: '25%',
                        bottom: '20%'
                    },
                    series: [
                        {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0, 136, 212, 0.3)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(0, 136, 212, 0)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(0,136,212)',
                                    borderColor: 'rgba(0,136,212,0.2)',
                                    borderWidth: 12
                                }
                            }
                        },
                        {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(137, 189, 27, 0.3)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(137, 189, 27, 0)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(137,189,27)',
                                    borderColor: 'rgba(137,189,2,0.27)',
                                    borderWidth: 12
                                }
                            }
                        }
                    ]
                }
            }
        },
        components: {
            ModuleLayout
        }
    }
</script>

<style scoped>

</style>