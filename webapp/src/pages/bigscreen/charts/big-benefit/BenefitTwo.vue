<template>
    <module-layout title="效益指标2">
        <ve-rect-coordinate
                id="benefit-two"
                style="height:100%"
                backgroundColor=""
                :xAxisData="yArray0"
                :showLegend=true
                rendererType="svg">
            <ve-line
                    :data="yArray1"
                    name="选项1"
            ></ve-line>
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