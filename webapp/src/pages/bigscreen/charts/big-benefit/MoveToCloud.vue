<template>
    <module-layout title="具备上云条件的系统">
        <ve-pie
                :rippleAnimation="true"
                style="width: 100%; height: 100%;"
                :center="['40%', '50%']"
                backgroundColor="transparent"
                id="move-to-cloud"
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