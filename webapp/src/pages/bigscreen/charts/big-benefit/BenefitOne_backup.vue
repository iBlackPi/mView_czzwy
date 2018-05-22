<template>
    <module-layout title="效益指标1">
        <ve-rect-coordinate
                id="benefit-one"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :color="colors" :coverOption="coverOption">
            <ve-line
                    :data="data1"
                    name="节约成本"
                    lineColor="#01A2FC">
            </ve-line>
            <ve-line
                    :data="data2"
                    name="提升效率"
                    lineColor="#F9D135">
            </ve-line>
            <ve-line
                    :data="data3"
                    name="缩短建设周期"
                    lineColor="#01B344">
            </ve-line>
            <ve-line
                    :data="data4"
                    name="提升资源利用率"
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
                colors: ['#01A2FC','#F9D135','#01B344','#01A2FC'],
                xAxisData: ['2018', '2019', '2020'],
                data1: [30, 35, 42],
                data2: [20, 38, 40],
                data3: [15, 20, 30],
                data4: [25, 40, 50],
                coverOption: {
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        {
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
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