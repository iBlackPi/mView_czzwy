<template>
    <module-layout title="信息共享需求量TOP5">
        <ve-rect-coordinate
                id="info-share"
                style="height:100%"
                backgroundColor=""
                :yAxisData="yAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="data"
                    id="basic-equipment"
                    name="数量(台)"
                    barWidth="10"
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
                yAxisData: ['教育局', '质监局', '住建局', '法院', '财政局'],
                data: [150, 200, 250, 334, 390],
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