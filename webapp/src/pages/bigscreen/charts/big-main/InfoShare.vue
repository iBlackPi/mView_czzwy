<template>
    <module-layout title="信息共享需求量TOP5">
        <ve-rect-coordinate
                id="rectTest3"
                style="height:100%"
                backgroundColor=""
                :yAxisData="yArray0"
                :showLegend=true
                rendererType="svg">
            <ve-bar
                    :data="data"
                    id="basic-equipment"
                    name="选项1"
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
                yArray0: ['01', '02', '03'],
                data: [30, 42, 47]
            }
        },
        components: {
            ModuleLayout
        }
    }
</script>

<style scoped>

</style>