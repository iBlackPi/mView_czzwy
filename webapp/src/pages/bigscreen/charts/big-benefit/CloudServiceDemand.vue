<template>
    <module-layout title="云服务目录需求">
        <ve-radar
                id="cloud-service-demand"
                :data="data"
                :indicator="indicator"
                backgroundColor=""
                :showLegend=false
                radius="75%"
                :center="['50%', '55%']"
                :coverOption="coverOption">
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
                    value : [3, 5, 7, 9, 10],
                    name : '云服务目录需求'
                }],
                indicator: [
                    {name: '增值服务'}, {name: '安全'}, {name: '网络'}, {name: '灾备'}, {name: '云运维'}
                ],
                coverOption: {
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{c}`
                                },
                                emphasis: {
                                    show: false,

                                }
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