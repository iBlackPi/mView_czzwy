<template>
    <module-layout title="2018-2020年迁移数量">
        <ve-rect-coordinate
                id="move-count"
                style="height:100%"
                backgroundColor=""
                :xAxisData="yArray0"
                :showLegend=true
                rendererType="svg">
            <ve-bar
                    :data="yArray1"
                    id="basic-equipment"
                    name="选项1"
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
                yArray0: ['01', '02', '03', '04', '05'],
                yArray1: [30, 42, 47, 30, 1]
            }
        },
        components: {
            ModuleLayout
        }
    }
</script>

<style scoped>

</style>