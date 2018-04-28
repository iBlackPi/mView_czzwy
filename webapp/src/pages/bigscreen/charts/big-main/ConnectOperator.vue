<template>
    <module-layout title="运营商接入数量">
        <ve-gauge
                id="connect-operator"
                backgroundColor=""
                style="height: 100%;"
                radius="100%"
                :coverOption="coverOption">
            <ve-sub-gauge :data="data1" :center="positionLeft"></ve-sub-gauge>
            <ve-sub-gauge :data="data2" :center="positionCenter"></ve-sub-gauge>
            <ve-sub-gauge :data="data3" :center="positionRight"></ve-sub-gauge>
        </ve-gauge>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                data1: [{value: 30, name: '联通'}],
                data2: [{value: 50, name: '电信'}],
                data3: [{value: 90, name: '移动'}],
                positionLeft: ['20%', '50%'],
                positionCenter: ['50%', '50%'],
                positionRight: ['80%', '50%'],
                coverOption: {

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