<template>
    <module-layout :title="sum">
        <ve-pie
                :rippleAnimation="true"
                style="width: 100%; height: 100%;"
                :center="['40%', '50%']"
                backgroundColor="transparent"
                id="pie"
                :data="pieData"
                :radius="['45%','65%']"
                :coverOption="coverOption"
                :rippleSize = 5
                @click-series="goToManage"
        ></ve-pie>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                pieData: [
                    {value: 71, name:'自建机房'},
                    {value: 14, name:'托管机房'},
                    {value: 30, name:'租用云服务'}
                ],
                coverOption: {
                    legend: {
                        top: 90,
                        right: 20
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{c}`
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            // 请求机房信息
            getInfo(){
                this.$httpt.get('bigScreenController.do?getCzMachineRoom').then(({data}) => {
                    if(data.success){
                        let temp = data.data;
                        let pieData = [
                            {value: 64, name:'自建机房'},
                            {value: 14, name:'托管机房'},
                            {value: 11, name:'租用云服务'}
                        ];
                        pieData[0].value = temp.selfBuiltMachineRoomNum;
                        pieData[1].value = temp.trusteeshipRoomNum;
                        pieData[2].value = temp.cloudServiceNum;
                        this.pieData = pieData;
                    }else{
                        throw new Error('获取机房信息失败！');
                    }
                })
            },
            // 从大屏进入机房信息管理界面
            goToManage(params) {
                this.$router.push({name: 'computer-room'});
            }
        },
        computed: {
            sum() {
                let sum = 0;
                this.pieData.forEach(item => {
                    sum += item.value;
                });
                return `机房信息 总量：<span style="color: #217bcc;">${sum}</span>`;
            }
        },
        mounted(){
            this.$nextTick(() => {
                // this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>