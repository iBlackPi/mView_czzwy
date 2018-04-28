<template>
    <module-layout title="云服务目录需求">
        <ve-radar
                id="cloud-service-demand"
                :data="data"
                :indicator="indicator"
                backgroundColor="">
        </ve-radar>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                data:  [{
                    value : [430, 100, 280, 350, 500],
                    name : '云服务目录需求'
                }],
                indicator: [
                    {name: '云安全'}, {name: 'IaaS'}, {name: 'PaaS'}, {name: '灾备'}, {name: '云运维'}
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