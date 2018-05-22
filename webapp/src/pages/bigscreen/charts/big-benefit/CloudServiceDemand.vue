<template>
    <module-layout :title="sum">
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
                    {name: '增值服务', max: 15},
                    {name: '安全', max: 15},
                    {name: '网络', max: 15},
                    {name: '灾备', max: 15},
                    {name: '云运维', max: 15}
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
        computed: {
            sum(){
                let sum = 0;
                this.data[0].value.forEach(item => {
                    sum += item;
                });
                return `云服务目录需求 总量：<span style="color: #217bcc;">${sum}</span>`;
            }
        },
        components: {
            ModuleLayout
        }
    }
</script>

<style scoped>

</style>