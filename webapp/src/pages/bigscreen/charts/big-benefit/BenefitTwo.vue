<template>
    <module-layout title="效益指标">
        <ve-rect-coordinate
                id="benefit-two"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :color="colors"
                :coverOption="coverOption">
            <ve-line
                    :data="data2"
                    name="提升资源利用率"
                    lineColor="#F9D135">
            </ve-line>
            <ve-line
                    :data="data3"
                    name="系统云化率"
                    lineColor="#01B344">
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
                colors: ['#01A2FC','#F9D135','#01B344','#01A2FC'],
                xAxisData: ['2018', '2019', '2020'],
                data2: [40, 65, 70],
                data3: [70, 90, 100],
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
                            showSymbol: true,
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
                        },
                        {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            showSymbol: true,
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