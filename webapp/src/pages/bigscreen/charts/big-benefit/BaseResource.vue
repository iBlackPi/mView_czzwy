<template>
    <module-layout title="2018-2020年基础资源需求量">
        <ve-rect-coordinate
                id="base-reource"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="data1"
                    name="CPU"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="data2"
                    name="内存"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="data3"
                    name="存储"
                    barWidth="20"
            ></ve-bar>
        </ve-rect-coordinate>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                xAxisData: ['2018', '2019', '2020'],
                data1: [90, 250, 150],
                data2: [100, 170, 190],
                data3: [70, 140, 160],
                coverOption: {
                    grid: {
                        top: '18%',
                        bottom: '15%'
                    },
                    legend: {
                        top: -10,
                        right: -30
                    },
                    series: [
                        {
                            label: {
                                show: true
                            }
                        },
                        {
                            label: {
                                show: true
                            }
                        },
                        {
                            label: {
                                show: true
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