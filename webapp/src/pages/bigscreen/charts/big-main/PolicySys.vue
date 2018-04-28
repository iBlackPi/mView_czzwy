<template>
    <module-layout title="政务信息系统统计">
        <ve-pie
                id="policy-sys"
                :rippleAnimation="true"
                style="width: 100%; height: 100%;"
                :center="['40%', '50%']"
                backgroundColor="transparent"
                :data="pieData"
        ></ve-pie>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                pieData:
                    [
                        {value:335, name:'aaaa'},
                        {value:310, name:'bbbb'},
                        {value:274, name:'cccc'}
                    ]
            }
        },
        components: {
            ModuleLayout
        }
    }
</script>

<style scoped>

</style>