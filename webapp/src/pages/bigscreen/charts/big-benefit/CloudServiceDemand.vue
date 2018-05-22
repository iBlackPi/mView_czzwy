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
                    value : [3, 5, 6, 8, 9],
                    name : '云服务目录需求'
                }],
                indicator: [
                    {name: '增值服务', max: 10},
                    {name: '安全', max: 10},
                    {name: '网络', max: 10},
                    {name: '灾备', max: 10},
                    {name: '云运维', max: 10}
                ],
                coverOption: {
                    radar: {
                        shape: 'square',
                        splitNumber: 5,
                        name: {
                            textStyle: {
                                // color: 'rgb(1, 162, 252)'
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: [
                                    'rgba(1, 162, 252, 0.3)', 'rgba(1, 162, 252, 0.5)',
                                    'rgba(1, 162, 252, 0.7)', 'rgba(1, 162, 252, 0.8)',
                                    'rgba(1, 162, 252, 0.9)', 'rgba(1, 162, 252, 1)'
                                ].reverse()
                            }
                        },
                        splitArea: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(1, 162, 252, 0.5)'
                            }
                        }
                    },
                    series: [
                        {
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    opacity: 0.5
                                }
                            },
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#F9D135'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    opacity: 0.2
                                }
                            },
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