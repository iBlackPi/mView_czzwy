<template>
    <module-layout title="运营商接入数量">
        <ve-gauge id="connect-operator" style="height: 100%;">
            <ve-sub-gauge :data="data" :center="positionLeft"></ve-sub-gauge>
            <ve-sub-gauge :data="data" :center="positionCenter"></ve-sub-gauge>
            <ve-sub-gauge :data="data" :center="positionRight"></ve-sub-gauge>
        </ve-gauge>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                data: [{value: 0.5, name: 'gas'}],
                positionLeft: ['20%', '50%'],
                positionCenter: ['50%', '50%'],
                positionRight: ['80%', '50%']
            }
        },
        components: {
            ModuleLayout
        }
    }
</script>

<style scoped>

</style>