<template>
    <module-layout title="单位接入网络数量">
        <ve-rect-coordinate
                id="connect-net"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption">
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
    export default {
        name: "computor-room",
        data(){
            return {
                xAxisData: ['互联网', '政务外网', '业务专网'],
                data: [70, 80, 40],
                coverOption: {
                    grid: {
                        top: '12%',
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